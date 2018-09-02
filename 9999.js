'use strict'

// function toCount(){
//     let perem = 1;
    
//     function count(){
//         return perem++;
//     }

//     count.set = function(param){
//         perem = param;
//     }

//     count.reset = function(){
//         perem = 1;
//     }


//     return count;
// }


// let check = toCount();
// console.log(check());
// console.log(check());
// console.log(check());

// check.set(33);
// console.log(check());
// console.log(check());
// console.log(check());
// check.reset();
// console.log(check());
// console.log(check());


// **********1111************
// function sum(first){
//     return function(second){
//         return second + first;
//     }
// }

// console.log(sum(1)(4));



// **********2***********
// function buffer(){
//     let temp = '';
//     return function toConcat(value){
//         if(value === undefined){
//             return temp; 
//         }
//         temp += value;  
//     }
// }

// let buf = buffer();
// buf(2);
// console.log(buf());
// buf('test');
// buf(9);
// console.log(buf(true));
// console.log(buf());

// 2-3
// function buffer(){
//     let tempValue = '';
//     function aa(value){
//         if(value === undefined){
//             return tempValue;
//         }
//         tempValue += value;
//     }
//     aa.clear = function(){
//         tempValue = '5';
//     }
//     return aa;
// }

// let ff = buffer();
// ff(1);
// ff('test');
// ff(true);
// ff(NaN);
// console.log(ff());
// ff.clear();
// console.log(ff());


// let array1 = [2, 4, 1, 5, 3, 8]; 
// function filter(arr, func){
//     let res = [];
//     for(let i = 0; i < arr.length; i++){
//         let val = arr[i];
//         if(func(val)){
//             res.push(val);
//         }
//     }
//     return res;
// }

// function func(value){
//     return value % 2 == 0;
// }


// function inBetween(a, b){
//     return function (x){
//         if(x >= a && x <= b){
//             return true;
//         }
//     }
// }

// function inArray(arr){
//     return function(x){
//         for(let i = 0; i < arr.length; i++){
//             if(x === arr[i]){
//                 return true;
//             }
//         }
//     } 
// }

// console.log(filter(array1, func));
// console.log(filter(array1, inBetween(1, 4)));
// console.log(filter(array1, inArray([1, 3])));




// function makeArmy() {
//     var shooters = [];
//     for (var i = 0; i < 10; i++) {
//         let yy = i;
//         var shooter = function() { // функция-стрелок
//         console.log( yy ); // выводит свой номер
//       };
//       shooters.push(shooter);
//     }
  
//     return shooters;
//   }
  
//   var army = makeArmy();
  
//   army[0](); // стрелок выводит 10, а должен 0
//   army[5]();



// function Human(age, size){
//     this.age = age;
//     this.size = size;
// }

// Human.prototype.toCount = function(){
//     return this.age + this.size;
// };

// let man = new Human(13, 33);
 
// // console.log(man.constructor);
// console.log(Human.prototype.constructo
// r);


// let arr = [2, 5, 6, 8,];

// console.log(arr);

// console.log(...arr)



class Human {
    constructor(age){
        this.age = age + 11;
    }
}

class Woman extends Human{
    constructor(tt){
        super(tt);
        this.tt = tt;
    }
} 

let aa = new Woman(4);
console.log(aa.age, aa.tt);










