class Human {
    constructor(name){
        this.name = name;
    }

    sayName(what){
        console.log(what, this.name);
    }
}

class Man extends Human {
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    sayInfo(){
        console.log(`full info is `, this.name, this.age, this.gender)
    }
}


let  ivan = new Man('Iva', 89, 'man');
ivan.sayName('hello');
ivan.sayInfo();