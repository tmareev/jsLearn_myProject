const read = require('readline-sync');
const fs = require('fs');

// //sinon test scenarios
// const sinon = require('sinon');
// const question = sinon.stub(read, 'question');
// const s1 = ['List all', 'Add', 'Author', 'A1', 'L1', 'G1', 'Back', 'List all', 'Exit'];
// const s2 = ['List all', 'Add', 'Author', 'A1', '', 'A2', '', 'L2', '', 'G1', 'Back', 'List all', 'Exit'];
// const s3 = ['List all', 'Add', 'Book', '', 'Title1', '', 'invalidAuthor', 'A1', 'Back', 'List all', 'Exit'];
// const s4 = ['List all', 'Add', 'Book', '', 'Title2', '', 'invalidAuthor', 'A2', 'Back', 'List all', 'Exit'];
// const s5 = ['List all', 'Rate', '', 'invalidId', '1', 'Rate', '1', 'Rate', '2', 'List all', 'Exit'];
// const s6 = ['List all', 'Search', 'By title', '', 'By title', 'ivalidTitle', 'By title', 'Title1', 'Back', 'Exit'];
// const s7 = ['List all', 'Search', 'By author', '', 'By author', 'ivalidAuthor', 'By author', 'A1', 'Back', 'Exit'];
// const s8 = ['List all', 'Search', 'By genre', '', 'By genre', 'ivalidGenre', 'By genre', 'G1', 'Back', 'Exit'];
// const s9 = ['List all', 'Search', 'By rating', '', 'Less', '', 'Less', '5', 'Less', '2', 'Less', '1', 'Back', 'Back', 'Exit'];
// const s10 = ['List all', 'Search', 'By rating', '', 'Greater', '', 'Greater', '0', 'Greater', '1', 'Greater', '2', 'Back', 'Back', 'Exit'];
// const s11 = ['List all', 'Clear', 'Reload', 'List all', 'Exit'];

// let scenario = s1;
// for(let i = 0; i < scenario.length; i++){
//     question.onCall(i).returns(scenario[i]);
// }



let db = {
    books: readFile('books.json'),
    authors: readFile('authors.json')
};

//Saving data into JSON file
function saveData (data, filePath) {
    let str = JSON.stringify(data);
    fs.writeFileSync(filePath, str);
}

//Reading data from JSON file
function readFile (filePath) {
    let str = fs.readFileSync(filePath).toString();
    return JSON.parse(str);
}


let tempBookGenre = '';

let menus = {
    main: {
        label: 'Main menu',
        options: [ 
            {optionLabel: 'List all', action: inListAll},
            {optionLabel: 'Search', action: inSearch},
            {optionLabel: 'Add', action: inAdd},
            {optionLabel: 'Rate', action: inRate},
            {optionLabel: 'Clear', action: inClear},
            {optionLabel: 'Reload', action: inReload},
            {optionLabel: 'Exit', action: endInteract}
        ]
    },
    addMenu: {
        label: 'Create entity',
        options: [
            {optionLabel: 'Author', action: addAuthor},
            {optionLabel: 'Book', action: addBook},
            {optionLabel: 'Back', action: endInteract}
        ]
    }, 
    search:{
        label: 'Search menu',
        options: [
            {optionLabel: 'By title', action: srcByTitle},
            {optionLabel: 'By author', action: srcByAuthor},
            {optionLabel: 'By genre', action: srcByGenre},
            {optionLabel: 'By rating', action: inSrcByRating},
            {optionLabel: 'Back', action: endInteract}
        ]
    },
    searchByRatingMenu:{
        label: 'Rating search',
        options: [
            {optionLabel: 'Less', action: srcByRatingLess},
            {optionLabel: 'Greater', action: srcByRatingGreater},
            {optionLabel: 'Back', action: endInteract}
        ]
	}
}

let schemas = {
    author: {
        name: {validators: [
            {name: 'unique', props: {field: 'name', among: db['authors']}},
            {name: 'required', props: {value: true}}
        ]},
        language: {validators: [
            {name: 'required', props: {value: true}}
        ]},
        genre: {validators: [
            {name: 'required', props: {value: true}}
        ]}
    },
    book: {
        title: {validators:[
            {name: 'required', props: {value: true}}
        ]},
        author: {validators: [
            {name: 'required', props: {value: true}},
            {name: 'exists', props: {field: 'name', among: db['authors']}}
        ]}
    }
}

let srcSchemas = {
    srcTitle: {    
        title: { validators:[
            {name: 'required', props: {value: true}},
            {name: 'isPresent', props: {field: 'title', among: db['books']}}
        ]}
    },
    srcAuthor: {
        author: { validators:[
            {name: 'required', props: {value: true}},
            {name: 'isPresent', props: {field: 'author', among: db['books']}}
        ]}
    },
    srcGenre: {
        genre: { validators:[
            {name: 'required', props: {value: true}},
            {name: 'isPresent', props: {field: 'genre', among: db['books']}}
        ]}
    },
    srcRatingLess:{
        rating: { validators: [
            {name: 'required', props: {value: true}},
            {name: 'less', props: {field: 'rating', among: db['books']}},
        ]}
    },
    srcRatingGreater:{
        rating: { validators: [
            {name: 'required', props: {value: true}},
            {name: 'greater', props: {field: 'rating', among: db['books']}},
        ]}
    },
}




function interact(menu){
    while(true){
        printMenu(menu);
        let choice = askForChoiceMenu(menu.options);
        let result = performMenuChoice(choice);
        if(result === 'break'){
            break;
        }
    }
}

function printMenu(menu){
    console.log(menu.label +'\n');
    for(let i = 0; i < menu.options.length; i++){
        console.log(i + 1 + '.', menu.options[i].optionLabel);
    }
    console.log('_'.repeat(20));
}

function askForChoiceMenu(menu){
    while(true){
        let choice = read.question('Make a choice: ');
        let option = menu[choice - 1];

        if(option){
            return option;
        }
        
        for(let i = 0; i < menu.length; i++){
            if (menu[i].optionLabel === choice){
                return menu[i];
            }
        }
        console.log(`incorrect choice: "${choice}"`);
    }
}

function performMenuChoice(choice){
    return choice.action();
}

function inListAll(){
    console.log('\nAuthors:');
    for(let i = 0, order = 1; i < db['authors'].length; i++, order++){
        console.log('\t' + order + '. ' + db['authors'][i].name + '(' + 
        db['authors'][i].language + '). ' + db['authors'][i].genre);
       
    }
    console.log('\nBooks:');
    for(let i = 0, order = 1; i < db['books'].length; i++, order++){
        console.log('\t' + order + '. ' + db['books'][i].title + '(' + 
        db['books'][i].author + '). Rating: ' + db['books'][i].rating);
    }
    console.log();
}

function inSearch(){
    interact(menus.search);
}

function srcByTitle(){
    let schema = srcSchemas.srcTitle;
    showSearchResult(schema);
}

function srcByAuthor(){
    let schema = srcSchemas.srcAuthor;
    showSearchResult(schema);
}

function srcByGenre(){
    let schema = srcSchemas.srcGenre;
    showSearchResult(schema);
}

function inSrcByRating(){
    interact(menus.searchByRatingMenu);
}

function srcByRatingLess(){
    let schema = srcSchemas.srcRatingLess;
    showSearchResult(schema);
}
function srcByRatingGreater(){
    let schema = srcSchemas.srcRatingGreater;
    showSearchResult(schema);
}

function showSearchResult(schema){
    for(let key in schema){
        console.log(key[0].toUpperCase() + key.slice(1) + ': ');
        while(true){ 
            let value = read.question();
            let allMatches = findMatches(value, schema[key].validators);
            console.log('\nResults:');
            for(let i in allMatches){
                let order = +i + 1;
                console.log('\t'+ order++ +'. '+allMatches[i].title+'('+allMatches[i].author+
                '). Genre:'+allMatches[i].genre+'. Rating: '+allMatches[i].rating);
            }
            console.log();
            break;
        }
    }
}

function findMatches(val, validators){
    let tempSrcData = [];

    for(let i in validators){

        let validator = validators[i];
        let name = validator.name;
        let props = validator.props;

        switch(name){
            case 'required':
                if(props.value && !val){ 
                    console.log(`This field can't be blank.`);                   
                    return;
                }
                break;

            case 'isPresent':
                for(let i in props.among){
                    let item = props.among[i];
                    if(val === item[props.field]){
                        let ff = defineMatchString(item);
                        tempSrcData.push(ff);
                    }
                }
                break;
            case 'less':
                for(let i in props.among){
                    let item = props.among[i];
                    if(item[props.field] < val){
                        let ff = defineMatchString(item);
                        tempSrcData.push(ff);
                    }
                }
                break; 
            
            case 'greater':
                for(let i in props.among){
                    let item = props.among[i];
                    if(item[props.field] > val){
                        let ff = defineMatchString(item);
                        tempSrcData.push(ff);
                    }
                } 
                break;
        }
    }
    return tempSrcData;
}

function defineMatchString(iitem){
    let temp = {};
    temp.author = iitem.author;
    temp.genre = iitem.genre;
    temp.rating = iitem.rating;
    temp.title = iitem.title;
    return temp;
}

function inAdd(){
    interact(menus.addMenu);
}

function addAuthor(){
    console.log('Adding new author.');
    let schema = schemas.author;
    let tempAuthor = getTempData(schema);
    db['authors'].push(tempAuthor);
    saveData(db['authors'], 'authors.json');
} 

function addBook(){
    if(!db['authors'][0]){
        return console.log('Add an author first');    
    } 
    console.log('Adding new book.');
    let schema = schemas.book;
    let tempBook = getTempData(schema);
    tempBook.genre = tempBookGenre;
    tempBook.rating = 0;
    db['books'].push(tempBook);
    saveData(db['books'], 'books.json'); 
}

function getTempData(schema){
    let temp = {};

    for(let field in schema){
        console.log(field[0].toUpperCase() + field.slice(1) + ': ');
        while(true){ 
            let value = read.question();
            if(isValid(value, schema[field].validators)){
                temp[field] = value;
                break;
            } 
            console.log(`Try once more:`);
        }
    }
    return temp;
}

function isValid(val, validators){
    for(let i in validators){
        let validator = validators[i];
        let name = validator.name;
        let props = validator.props;

        switch(name){
            case 'unique':
                for(let i in props.among){
                    let item = props.among[i];
                    if(val === item[props.field]){
                        console.log(`"${val}" already exists.`);
                        return false;
                    }
                }
                break;
            
            case 'required':
                if(props.value && !val){ 
                    console.log(`This field can't be blank.`);                   
                    return false;
                }
                break;

            case 'exists':
                for(let i in props.among){
                    let item = props.among[i];
                    if(val === item[props.field]){
                        tempBookGenre = item.genre;
                        return true;
                    } 
                }
                console.log('No such author');
                return false;
        }
    }
    return true;
}

function inRate(){
    if (db['books'].length === 0) {        
        return console.log('There is no book. Please add at least one!');
    }    
    while(true){
        console.log('Book ID:');
        let enterBookId = read.question();
        for(let key in db['books']){
            if (enterBookId - 1 == key){
                db['books'][key].rating += 1;
                saveData(db['books'], 'books.json');
                console.log(`The book with id = ${enterBookId} has been rated!`);
                return;
            }
        }
        console.log(`There's no book with id: ` + enterBookId);
    }
}

function inClear(){
    db['authors'].length = 0;
    db['books'].length = 0;
    saveData(db['authors'], 'authors.json');
    saveData(db['books'], 'books.json'); 
    console.log('Library is empty now');
}

function inReload(){
    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
}

function endInteract(){
    return 'break';
}


// interact(menus.main);




const assert = require('assert');
const chai = require('chai');


describe('Default behaviour', function(){
    it('should add something', function(){
        let x = 5 + 5; 
        let expected_result = 10;
        assert.equal(x, expected_result);
    })
})










































































   









