// function AAA (name = 'defaultUser', sec = '7777'){
//     this.name = name;
//     this.sec= sec;
//     this.fun = function(){
//         console.log(this)
//     }
// }

// let gg = new AAA('taras', 13);
// gg.__proto__.newFun = function(){
//     console.log(`your name is ${this.name} and your time is ${this.sec}`);
// } 
// gg.newFun();
// let newGg = new AAA;
// newGg.newFun();

// class Human {
//     constructor(gender){
//         this.gender = gender;
//     }
//     sayName(){
//         console.log(this.gender);
//     }
//     static Man(beard){
//         let ff = new Human('man');
//         ff.beardHeight = beard;
//         ff.sayHeight = function(){
//             console.log(`My beard is about ${this.beardHeight} cm`);
//         }
//         return ff;
//     }
//     static Woman(boobs){
//         this.boobsSize = boobs;
//         return new Human('woman');
//     }
// } 

// let Katya = Human.Woman(3);
// let Oleg = Human.Man(15);
// Oleg.sayHeight();


// console.log('hi');

// setTimeout(()=>{console.log('there')}, 3000);
// console.log('taras');

let fruit = {
    say: function(){
        console.log('hiiii');
    }
}

let appleProto = Object.create(fruit);
appleProto.create = function(name){
    return Object.create(this, {
        name: {value: name}
    });
}

let apple = appleProto.create('greenapple')

apple.say();



