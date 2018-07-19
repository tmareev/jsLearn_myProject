

// ****************  PROMPT из которого берутся числа и *************
// ***************   суммируются до тех пор,  *****************
// *****************   пока не напишешь STOP ******************


// var summ = 0;

// testTag: 
// while ('test'){
// 	var enter = prompt('number?');
// 	var spl = enter.split(' ');


// 	for(var i = 0; i < spl.length; i++){
		
// 		if (spl[i] == 'stop'){

// 			// вариант без меток testTag
// 			// var finish = spl[i];

// 			break testTag;
// 		}

// 		var toNumber = Number(spl[i]);

// 		if(toNumber){
// 			summ += toNumber;
// 		} 
// 	}

// 	// вариант без меток 
// 	// if(finish) {
// 	// 	break
// 	// }
// }

// alert(summ);




// *****************   Объекты, цикл, массив и условные операторы if + ?   ********************
// var day1,
// 	month1,
// 	year1;

// var name1 = prompt('enter your name');
// 	surname1 = prompt('enter your surname'),
// 	age1 =  prompt('how old are you?')

// var	birthday = prompt('your birthday');
// var birth = birthday.split(' ');


// for (var i = 0; i < birth.length; i++) {

// 	var aaa = Number(birth[i]);

// 	if(aaa) {
// 		 (birth[i].length <= 2) ? day1 = birth[i] : year1 = birth[i];

// 	} else if (isNaN(aaa)){
// 		month1 = birth[i];
// 	} else {
// 		console.log('not correct date');
// 	}
// }

// var human = {
// 	name: name1,
// 	surname: surname1,
// 	age: age1,
	
// 	dateOfBirth: {
// 		day: day1,
// 		month: month1,
// 		year: year1
// 	},
	
// 	info: function(){
// 		console.log('your name - ' + this.name + ' ' + this.surname + '! You r ' + this.age + ' ' +
// 		 ' years old!' + ' Your date of bith - ' + this.dateOfBirth.day + ' ' + this.dateOfBirth.month + ' ' +
// 		  this.dateOfBirth.year);
// 	},

// 	textOutput: function(){
// 		console.log(this.name)
// 	}
// }

// console.log(human.dateOfBirth.day);
// console.log(human.dateOfBirth.month);
// console.log(human.dateOfBirth.year);






















// ***************   СОЗДАНИЕ КОНСТРУКТОРА   *****************
// function Review (мастерство,  отношение, уют) { 
//   	this.мастерство = мастерство;
//   	this.отношение = отношение;
//   	this.уют = уют;
//   	this.моиОценки = function() {
//   		console.log('Мастерство - ' + this.мастерство + '; отношение и подход - ' + this.отношение + '; создание уютной обстановки - ' + this.уют);
//   	}	
// }

// var myReview = new Review(5, 5, 5);

// myReview.моиОценки();
































// *************    PROMPT, ALERT, CONFIRM    ****************
// var name = prompt('Name?', 'enter a name here');
// if(name != 'null'){
// 	alert('entered name - ' + name);
// 	var confirmation = confirm('Is your name ' + name + '?');

// 	if (confirmation == true) {
// 		console.log('confirmation is correct')
// 	} else {
// 		console.log('please enter and confirm your name')
// 	}
// } else {
// 	alert('Please reload the page and enter your name!')
// }





















let ord = letter => String.prototype.codePointAt.call(letter, 0);
let chr = String.fromCharCode;


let num = '-gy22gyu.ds33da-d as.jknj6';
let result = '';
let temp = 0;
let i = 0;

let isNegative = false;
let isDigital = false;
let isExp = false;
let charPosition = 0; //is needed for negative exponential value counting

while(i < num.length) {
    
    let char = num[i];
    let x = ord(char) - ord('0');

    if (x >= 0 && x <= 9 ) {
        result = result * 10 + x;
    }

    //Save values before dot to have possibility make concatenation
    if (char === '.' && isDigital === false) {
        temp = result + '.'
        isDigital = true;
        result = '';
    }
    
    //Decrypt exponencial value 
    //(supposed that correct exponential value had been inputted f.e. '1e3', '1e-3', '-1e-3', '-1e3')
    if (char === 'e' && isExp === false) {
        charPosition = i;
        temp = result;
        isExp = true;
        result = '';
    }

    if (num[0] === '-' && isNegative === false) {
        isNegative = true;
    }

    ++i;
}

//Making value digital by concatenation of 'temp' and 'result' values
if (isDigital === true) {
    result = temp + result;
}

//Counting exponential value
if (isExp === true && num[charPosition + 1] !== '-') {
    result = temp * (10 ** result);
} else if (isExp === true){
    result = temp * (10 ** -result);
}

//Make all number negative if the first value of the original value is "-"
if (isNegative === true) {
    result *= -1;
}

console.log(result);