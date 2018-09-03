const mongo = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const connection = mongo.connect(url, 
    {useNewUrlParser: true}, 
    onConnect,
);

// если мы передаем коллбек в другую ф-ю, то монго, в качестве первого аргумента 
// подставит эррор. И если эррор === null то будет выполнять дальше. 
// здесь мы явно написали первый аргумент. 
// client - это некий объект для работы с монгой.Что-то типа document когда мы писали сайтик 
// с добавлениями тегов. 
// client.db('check') - выбираем базу данных, аналог use check.

function onConnect(err, client){
    const db = client.db('check');
    const col = db.collection('users');

    // // добавляем запись (document). Обязательно это должен быть объект
    // let data1 = {name: 'Taras', age: 26};
    // let data2 = {name: 'Dasha', age: 23};
    // col.insertOne(data1, onInsert);
    // // добавляем несколько записей (documents) в коллекцию. Передавать нужно массив объектов
    // col.insertMany([data1, data2]);


    // // поиск всех элементов в бд
    // col.find(onFound);
    // // или можно написать поиск по точному значению но ничего не вписывать 
    // col.find({}, onFound);

    // поиск по точному значению 
    col.find({name: 'Taras'}, onFound);


};

// здесь cursor это ссылка на то что мы ищем. Т.к. данных может быть очень много.
// пытаемся вывести данные в виде массива. И в качестве параметра снова делаем колбек,
// чтобы данные успели сформирроваться и вывестись
function onFound(err, cursor){
    cursor.toArray(onArrayConverted);
}
function onArrayConverted(err, data){
    console.log(data);
}



function onInsert(err, result){
    
}