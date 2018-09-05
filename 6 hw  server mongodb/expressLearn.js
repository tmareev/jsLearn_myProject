// Устанавливаем сам express и дополнительные библиотеки:
// npm install express twig (или pug) cookie-parser cookie-session
// Можно также уставновить express-generate. Тогда появится express.exe в node_modules..
// с помощью которого можно генерировать костяк сайта с какими-то настройками.
// Cookie-parser - для того чтобы понять что такое куки
// cooke-session - базируется на Cookie-parser и в реальной жизни чаще 
// юзают именно его, хотя бывает что и то и то

// САМЫЙ ПРОСТОЙ СЕРВЕР. Нужно запустить этот файл в терминале и 
// в браузере ввести localhost:порт, здесь localhost:3333
const http = require('http');
const port = 3000;
const server = http.createServer((req, resp) => {
    console.log(req.url);
    resp.end('hello');
});

server.listen(port, (err)=> {
    if(err){
        console.log('not good', err);
        return;
    }
    console.log('server is listening on ', port);
});