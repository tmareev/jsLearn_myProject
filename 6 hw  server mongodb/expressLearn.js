/* // САМЫЙ ПРОСТОЙ СЕРВЕР. Нужно запустить этот файл в терминале и 
// в браузере ввести localhost:порт, здесь localhost:3000
// const http = require('http');
// const port = 3500;
// let server = http.createServer(requestHandler);

// function requestHandler(request, response){
//     console.log(request.url);
    
//     response.end('hello');
// }
// // если не указать host то обращаться можно через localhost:3500
// server.listen(port, '127.0.0.1'); */



// ***********************************************************************************************************
/* Устанавливаем сам express и дополнительные библиотеки:
npm install express twig (или pug) cookie-parser cookie-session
Можно также уставновить express-generate. Тогда появится express.exe в node_modules..
с помощью которого можно генерировать костяк сайта с какими-то настройками.
Cookie-parser - для того чтобы понять что такое куки
cooke-session - базируется на Cookie-parser и в реальной жизни чаще 
юзают именно его, хотя бывает что и то и то */

const express = require('express');
const app = express();
app.listen(3000);

// отключим кеширование в twig, для того чтобы не перезагружать сервер, 
// чтоб увидеть изменения внесенные в файле.twig
const twig = require('twig');
twig.cache(false);

/* если написать это, то шаблонизатором будет только twig.
все файлы которые будут рендериться должны иметь расширение .twig .
и это расширение можно не указывать в методе render */
app.set('view engine', 'twig');

/* подключаем mongo */
const mongo = require('mongodb');
/* нужно помнить что подключение(ниже client) 
возможно будет происходить не сразу, поэтому нужно будет использовать
простые колбеки, либо промисы */
const client = mongo.connect('mongodb://127.0.0.1:27017')


/* express не умеет обрабатывать данные переданные POST запросом 
 (напрмиер в GET мы могли бы их взять с помощью query).
 Фиксим подключением плагинов express.urlencoded() (или express.json() )
 через use . Два этих плагина уже установлены с express. */
 app.use(express.urlencoded()); 
//  app.use(express.json());


/* Самое большое различие, которое вы можете здесь заметить, 
заключается в том, что Express по умолчанию даёт вам роутер. 
Вам не нужно вручную разбирать URL, чтобы решить, что делать, 
вместо этого вы определяете маршрутизацию приложения 
с помощью app.get, app.post, app.put и так далее, 
а они уже транслируются в соответствующие HTTP-запросы.
*/
app.get('/cars', function(req, resp){
    resp.send('CARS page has been loaded!');
}); /*в простейшем сервере нам бы надо было писать
http.createServer(function(req, resp){
    if(req === '/cars'){
        resp.end('CARS page loaded')
    }
});
'/cars, function(req, resp){ ...}  - называют роутом'    
*/


// app.get('/', function(req, resp){
//     /* // в express используется send вместо end 
//     // но и второе тоже будет работать
//     resp.send('HOME page has been loaded!');  */
    

//    /*  если мы хотим в качестве респонса отрисовать страничку
//     мы должны выбрать ту страничку которую хотим отобразить (типа home.html),
//     но расширение должно быть twig (или pug в зависимости от выбранной библиотеки)
//     У меня установлены обе библиотеки */
//     /* Также этот файлик должен находится в папочке views относительно папки 
//     из которой запускается сервер*/
//     // resp.render('home.twig');
// });

/* // можно открыть users.pug и посмотреть как формируется страничка в pug
app.get('/users', function(req, resp){
    resp.render('users.pug');
}); */





/* чтобы сделать фрагмент адреса ДИНАМИЧЕСКИМ юзаем "/:". 
В JS коде мы используем req.params.
здесь если мы напишем в браузере 
http://127.0.0.3:3000/hello/and
если мы юзаем потом эти переменные в twig файле 
(например{{ greeting }}, {{ name }}), то выведется -  hello, and
или http://127.0.0.3:3000/goodluck/baby
выдаст - goodluck, baby */
app.get('/:greeting/:name', function(req, resp){
    let vars = {
        greeting: req.params.greeting,
        name: req.params.name,
    }
    
    resp.render('home', vars);
}) /* теперь любой запрос который будет иметь два слеша от корня сайта
будет совпадать с ним. Например http://127.0.0.3:3000/first/second .
Но если будет еще и 3 слеш с каким-то словом,
например http://127.0.0.3:3000/first/second/third 
то даст Cannot GET /first/second/third */



/* если мы пишем СТАТИЧЕСКИЙ фрагмент адреса, типа ('/test/hello'), 
то он должен совпадать полностью. Но можно сделать немного гибкости:
1) поставим "?" после любого из символов - значит, 
что этот символ необязательный
('/test?/hello') - совпадет и с ('/test/hello') и с ('/tes/hello')
2) поствим "+" после символа - этот символ можно дублировать 
сколько угодно раз (минимум одна, максимум неограничено)
('/test+/hello') - совпадет и с ('/test/hello') и с ('/testttt/hello')*/
// 3) поствим "*" после символа - комбинация "?" и "+"
/* 4) все это применяется к группе символов используя скобки
('/te(st)?/hello') - совпадет и с ('/te/hello') и с ('/test/hello')*/
// ('/test*/hello') - совпадет и с ('/tes/hello') и с ('/testttt/hello') 
// app.get('/greeting*/name?', function(req, resp){
//     let vars = {
//         greeting: req.params.greeting,
//         name: req.params.name,
//     }
//     resp.render('home', vars);
// })


/* "ЦВЕТ" . Смотри "ЦВЕТ" в home.twig
app.get('/', function(req, resp){
    let vars = {
        greeting: 'Hello ',
        req: req,

        colo: req.query.colorrry,
    }
    
    resp.render('home', vars);
}) */



/* // добавляем конкретно метод POST для нашей корневой страницы
// тогда и в form тоже нужно писать method="POST"
app.post("/", function(req, resp){
    
    resp.render('home');
})
// здесь 
*/

// работа в связке с монгодб
app.post("/posts", function(req, resp){
    client.then(function(connection){
        const col = connection.db('check').collection('posts');
 /* express не умеет обрабатывать данные переданные POST запросом 
 (напрмиер в get мы могли их взять с помощью query).
 Фиксим подключением плагинов express.urlencoded() (или express.json() )
 через use, смотри вверху app.use(express.urlcoded), app.use(express.json).
 Теперь внутри request появляется свойство body, внутри которого есть
 вся инфа пришедшая от пользователя  */
        let data = {content: req.body.content, title: req.body.title};
        col.insertOne(data);
        // resp.redirect('/posts');
    })    

});
app.get("/posts", function(req, resp){
    client.then(function(connection){
        const col = connection.db('check').collection('posts');
        col.find({}).toArray().then(function(posts){
                resp.render('home', {posts: posts});
        })
    })    
    resp.render('home'); 
});

