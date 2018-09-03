// let userProto = {
//     showName: function(){
//         console.log(this.name);
//     },
//     showAge: function(){
//         console.log(this.age);
//     },
//     constructor: User,
// }

// function User(name, age){
//     this.name = name;
//     this.age = age;
// }

// User.prototype = userProto;

// let taras = new User('Taras', '26');
// taras.showAge();
// taras.showName();

class User {
    constructor(named, ages) {
        this.named = named;
        this.ages = ages;
    }
    showInfo(){
        console.log(`My name is ${this.named}, and im ${this.ages} years old`);
    }
    static Ivan(){
        return new User('Ivan', 33);
    }
}


function test(times){
    console.log(`test function was called by you ${this.named}, ${times} times`);
}


let taras = new User('Taras', '26');
console.log(taras);

test.call(taras, 90);
