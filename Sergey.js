const readline = require('readline-sync');
const sinon = require('sinon');
const fs = require('fs');
const chai = require('chai');

const expect = chai.expect;
let print = console.log;


function ask(question) {
  print(question);
  return readline.question();
};


function askValueForField(field) {
  let value;
  while (true) {
    value = ask(field.name);
    const error = validate(value, field.rules);
    if (!error) {
      return value;
    }
    print(`Error[${field.name}]: ${error}`);
  }
}

function getDbFilepath() {
  return 'db.json';
}
function readDatabase() {
  return JSON.parse(fs.readFileSync(getDbFilepath()));
};
function saveDatabase() {
  fs.writeFileSync(getDbFilepath(), JSON.stringify(DB));
};
function resetDatabase() {
  for (let key in DB) {
    DB[key].length = 0;
  }
}

function validate(value, checks) {
  for (let i = 0; i < checks.length; i++) {
    let validator_info = checks[i];
    let validator = validators[validator_info.name];
    let error = validator(value, validator_info.options);
    // Предыдущие три строки можно записать в одну:
    //         let error = validators[checks[i].name](value, checks[i].options);
    if (error) {
      return error;
    }
  }
};

function makeField(name, rules, def=null, internal=false) {
  return {name: name, rules: rules, default: def, internal: internal};
};
function makeRule(name, options={}) {
  return {name: name, options: options};
};
function makeOption(label, action) {
  return {label: label, action: action};
}
function makeAddAction(type) {
  return function() {
    return actionAddSomething(type);
  };
}

function generateLibrarySchemas() {
  /**
   * схема -  тип: список полей
   * список полей - [поле]
   * поле - {имя, internal, default, rules}
   * internal - true -> пользователь не указывает значение в момент создания;
   *            false -> пользователь контролирует значение в момент создания
   * default - значение по-умолчанию. Сработает только если не включен валидатор required
   * rules - список валидаторов
   */
  return {
    authors: [
      makeField('name', [
          makeRule('required'),
          makeRule('unique', {list: DB.authors, prop: 'name'})
      ]),
      makeField('language', [makeRule('required'), makeRule('language'),]),
      makeField('genre', [makeRule('required'),]),
    ],
    books: [
      makeField('title', [
          makeRule('required'),
          makeRule('unique', {list: DB.books, prop: 'title'}),
      ]),
      makeField('author', [
          makeRule('required'),
          makeRule('exists', {list: DB.authors, prop: 'name'}),
      ]),
      makeField('rating', [], 0, true)
    ],
  };
};


function generateValidators() {
  /**
   * Ключ: название валидатора
   * Значение: функция, принимающая значение и объект опций.
   *          Возвращает строку с ошибкой или ничего.
   */
  return {
    required: function(value){
      if (!value) {
	      return 'Must be provided';
      }
    },
    unique: function(value, options) {
      // options - настройки валидатора
      // list - содержит список объектов, используемый для поиска
      // map - метод списков. Принимает функцию, вызываемую для каждого
      // элемента списка. Функция, в свою очередь, принимает каждый отдельный
      // элемент и преобразовывает его, после чего возвращает. Результатом
      // будет список, собранный из преобразованных элементов. В нашем случае,
      // из каждого элемента извлекается его свойство(какое именно - определяют опции),
      // и мы получаем в результате массив имен авторов, или массив названий книг,
      // или т.д.
      // includes - метод массива. Проверяет наличие элемента в массиве.
      const doesExist = options.list.map(function(item) {
	      return options.prop ? item[options.prop] : item;
      }).includes(value);

      if (doesExist) {
	      return `Must be unique(${value})`;
      }
    },
    exists: function(value, options) {
      // валидатор возвращает строку с ошибкой. Если валидатор ничего не вернул
      // - значение корректое. Если значение корректо для валидатора unique -
      // значит оно не существует в списке. В общем, unique и exists -
      // взаимоисключающие валидаторы, чем мы и воспользуемся
      if (!validators.unique(value, options)) {
	      return 'Does not exist';
      }
    },
    language: function(value) {
      return validators.exists(value, {list: ['ru', 'en', 'ua', 'fr', 'it']});
    }
  };
};
function generateMenu() {
  return {
    main: [
      makeOption('List', actionList),
      makeOption('Add', actionAdd),
      makeOption('Rate', actionRate),
      makeOption('Exit', actionSaveAndExit),
    ],
    add: [
      makeOption('Author', makeAddAction('authors')),
      makeOption('Book', makeAddAction('books')),
      makeOption('Back', actionBack),
    ]
  };
}

function actionAddSomething(type) {
  const temp = {};
  const schema = schemas[type];
  schema.forEach(function(field) {
    temp[field.name] = field.internal ? field.default : askValueForField(field);
  });
  DB[type].push(temp);
}

function actionAdd() {
  interact(menu.add);
}

function actionRate() {
  const id = ask('Book ID:');
  const book = DB.books[id - 1];
  if (book) {
    ++book.rating;
  }
}

function actionList() {
  print('Authors:');
  for (let i = 0; i < DB.authors.length; i++) {
    let author = DB.authors[i];
    print(`\t${author.name}(${author.language}) - ${author.genre}`);
  }
  print('Books:');
  for (let i = 0; i < DB.books.length; i++) {
    let book = DB.books[i];
    print(`\t[${i + 1}] ${book.title}(${book.author}) - ${book.rating}`);
  }
}

function actionBack() {
  return 'break';
}


function actionSaveAndExit() {
  saveDatabase();
  return actionBack();
}

function interact(menu) {
  while (true) {

    print('-'.repeat(40));

    menu.forEach(function(option, idx){
      print(`${idx + 1}. ${option.label}`);
    });

    const choice = ask('Your choice:');
    let option = menu[choice - 1];
    
    if (!option) {
      option = menu.find(function(option) {
	      return option.label === choice;
      });
    }

    if (!option) {
      print('Incorrect choice:', choice);
      continue;
    }

    let result = option.action();
    if (result === 'break') {
      break;
    }
  }
}

const DB = readDatabase();
const validators = generateValidators();
const schemas = generateLibrarySchemas();
const menu = generateMenu();


if (typeof describe === 'undefined') {
  interact(menu.main);
  process.exit();
};


describe('Interactive library', function() {
  function applyScenario(scenario, stub) {
    // сбросить в базовое состояние. Вметос этого можно просто
    // создавать новый стаб:
    //     stub = sinon.stub(readline, 'question');
    // но в таком случае стаб уже не должен быть константой. В общем
    // это вопрос стиля и экономии ресурсов.
    stub.resetBehavior();
    resetDatabase();
    for (let i = 0; i < scenario.length; i++) {
      stub.onCall(i).returns(scenario[i]);
    }
  };

  // просто попробуйте убрать эту строку перед запуском тестов и сами все поймете
  print = function(){};


  let questionStub;
  // mocha будет вызывать эту функцию перед каждым тестом(подробности в документации)
  // создаем новый стаб, потому что тесты запускаются одновременно и попытка ограничиться
  // одним единственным стабом приведет к конфликтам.
  beforeEach(function(){
    questionStub = sinon.stub(readline, 'question');
  });
  // mocha будет вызывать эту функцию после каждого теста(подробности в документации)
  // тут мы вызываем метод стаба(и снова лезем в документацию за подробностями),
  // который восстановит оригинальный метод. Это нам нужно для того чтобы мы случайно
  // не создали стаб для стаба в beforeEach
  afterEach(function(){
    questionStub.restore();
  });

  describe('actions itself, without interaction', function(){

    describe('AddSomething', function() {

      it('shoud add authors', function(){
    	applyScenario(['Nikita', 'ru', 'drama'], questionStub);
    	expect(DB.authors).to.have.lengthOf(0);
    	actionAddSomething('authors');
    	expect(DB.authors).to.have.lengthOf(1);
      });
      it('shoud add author even after thousands of incorrect attempts', function(){

    	const scenario = [];
    	for (let i = 0; i < 1000; i++) {
    	  scenario.push('');
    	}
    	scenario.push('Nikita', 'ru', 'drama');
    	applyScenario(scenario, questionStub);
    	expect(DB.authors).to.have.lengthOf(0);
    	actionAddSomething('authors');
    	expect(DB.authors).to.have.lengthOf(1);
      });
    });

    describe('Add', function() {
      it('shoud call interact', function() {
    	let old_interact = interact;
    	let called = false;
    	interact = function() { called = true; };

    	expect(called).to.be.false;
    	actionAdd();
    	interact = old_interact;
    	expect(called).to.be.true;
      });
    });

    describe('Rate', function() {

      it('shoud increase rating', function() {
        let scenario = ['1', '1', '2', '3', '4', '4', '4'];
        applyScenario(scenario, questionStub);
        DB.books = [
          {title: 'Hello 1', rating: 0, author: 'Gena'},
          {title: 'Hello 2', rating: 10, author: 'Gena'},
          {title: 'Hello 3', rating: 0, author: 'Gena'},
          {title: 'Hello 4', rating: 20, author: 'Gena'},
        ];

        expect(DB.books[0].rating).to.be.equal(0);
        expect(DB.books[1].rating).to.be.equal(10);
        expect(DB.books[2].rating).to.be.equal(0);
        expect(DB.books[3].rating).to.be.equal(20);

        scenario.forEach(actionRate);

        expect(DB.books[0].rating).to.be.equal(2);
        expect(DB.books[1].rating).to.be.equal(11);
        expect(DB.books[2].rating).to.be.equal(1);
        expect(DB.books[3].rating).to.be.equal(23);
      });
    });
    
    describe('List', function() {
      it('shoud add something');
    });
    
    describe('Back', function() {
      it('shoud add something');
    });
    
    describe('SaveAndExit', function() {
      it('shoud add something');
    });
  });


  
  describe('database', function(){
    describe('Read', function() {
      it('shoud add something');
    });
    describe('Save', function() {
      it('shoud add something');
    });
    describe('Reset', function() {
      it('shoud add something');
    });
  });
  describe('validation', function(){
    describe('required', function() {
      it('shoud add something');
    });
    describe('unique', function() {
      it('shoud add something');
    });
    describe('exists', function() {
      it('shoud add something');
    });
    describe('language', function() {
      it('shoud add something');
    });
  });

  describe('scenarios', function(){
    it('shoud exit after two incorrect attempts', function() {
      const scenario = ['wrong', '9999', 'Exit'];
      applyScenario(scenario, questionStub);
      interact(menu.main);
      expect(DB.authors).to.have.lengthOf(0);
      expect(DB.books).to.have.lengthOf(0);
    });

    it('should call two lists and exit', function() {
      const scenario = ['List', '1', 'Exit'];
      applyScenario(scenario, questionStub);
      interact(menu.main);
      expect(DB.authors).to.have.lengthOf(0);
      expect(DB.books).to.have.lengthOf(0);
    });
    it('should perform list, add author, then list again', function() {
      const scenario = ['List', 'Add', 'Author', 'Gena', 'en', 'drama', 'Back', 'List', 'Exit'];
      applyScenario(scenario, questionStub);
      interact(menu.main);
      expect(DB.authors).to.have.lengthOf(1);
      expect(DB.books).to.have.lengthOf(0);

    });
    it('should perform trigger validation during add', function() {
      const scenario = ['List', 'Add', 'Author', '', 'Gena', 'jp', '', 'en', '', 'drama', 'Back', 'List', 'Exit'];
      applyScenario(scenario, questionStub);
      interact(menu.main);
      expect(DB.authors).to.have.lengthOf(1);
      expect(DB.books).to.have.lengthOf(0);

    });
    it('should perform add few authors with some validation errors', function() {
      const scenario = [
        'List', 'Add', 'Author', '', 'Gena', 'jp', '', 'en', '', 'drama',
        'Author', '', 'Gena', 'Arthur', 'jp', '', 'ua', '', 'comedy',
        'Back', 'List', 'Exit'
      ];
      applyScenario(scenario, questionStub);
      interact(menu.main);
      expect(DB.authors).to.have.lengthOf(2);
      expect(DB.authors[0]).to.have.property('genre').which.is.equal('drama');
      expect(DB.authors[0]).to.have.property('language').that.is.equal('en');

      expect(DB.authors[1]).to.have.property('name').equal('Arthur');


      expect(DB.books).to.have.lengthOf(0);

    });

  });

});