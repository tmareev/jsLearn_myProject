// // простейший сервер на node.js
// const http = require('http');
// const port = 3500;
// let server = http.createServer(requestHandler);

// function requestHandler(request, response){
//     console.log(request.url);
    
//     response.end('hello');
// }
// // если не указать host то обращаться можно через localhost:3500
// server.listen(port, '127.0.0.1');



const express = require('express');
const app = express();
app.listen(3000, '127.0.0.3');

/* Самое большое различие, которое вы можете здесь заметить, 
заключается в том, что Express по умолчанию даёт вам роутер. 
Вам не нужно вручную разбирать URL, чтобы решить, что делать, 
вместо этого вы определяете маршрутизацию приложения 
с помощью app.get, app.post, app.put и так далее, 
а они уже транслируются в соответствующие HTTP-запросы.*/

app.get('/cars', function(req, resp){
    resp.send('CARS page has been loaded!');
}); /*в простейшем сервере нам бы надо было писать
http.createServer(function(req, resp){
    if(req === '/cars'){
        resp.end('CARS page loaded')
    }
})*/

app.get('/', function(req, resp){
    /* // в express используется send вместо end 
    // но и второе тоже будет работать
    resp.send('HOME page has been loaded!');  */
    

   /*  если мы хотим в качестве респонса отрисовать страничку
    мы должны выбрать ту страничку которую хотим отобразить (типа home.html),
    но расширение должно быть twig (или pug в зависимости от выбранной библиотеки)
    У меня установлены обе библиотеки */
    /* Также этот файлик должен находится в папочке views относительно папки 
    из которой запускается сервер*/
    
    resp.render('home.twig');
    
});

app.get('/users', function(req, resp){
    resp.render('users.pug');
});



