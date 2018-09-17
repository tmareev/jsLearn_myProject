const express = require('express');
const app = express();
app.listen(3000);

const twig = require('twig');
twig.cache(false);
app.set('view engine', 'twig');

const mongo = require('mongodb');
const client = mongo.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true},)

app.use(express.static("public")); 
app.use(express.urlencoded()); 

// app.get('/login', function(req, resp){
//     if(req.query.login && req.query.password){
//         client.then(function(connection){
//             let col = connection.db('simpleSite').collection('users');
//             let allFound = col.find();
//             let toArr = allFound.toArray();
//             toArr.then(function(users){
//                 console.log(users);
//                 if(users.length){
//                     for(let i = 0; i < users.length; i++){
//                         if(users[i].login == req.query.login &&
//                             users[i].password == req.query.password){
//                                 resp.render('userPage');
//                         } else {
//                             console.log('no sucvh user');
//                             resp.render('login');
//                         }
//                     } 
//                 } 
//                 console.log('the collections is empty');
//                 resp.render('login');
//             })
//         })        
//         return;
//     }
//     resp.render('login');
// });

// // app.post('/register', function(req, resp){
// //     client.then(function(connection){
// //         const col = connection.db('check').collection('posts');

// //         console.log(req.body.login, req.body.password);
// //         // let data = {login: req.body.login, password: req.body.password};
// //         // if(data.login && data.password){
// //         //     col.insertOne(data);
// //         //     alert('yoh have been registered')
// //         // }
        
// //         resp.redirect('/login');
// //     });
// // });

app.get('/', function(req, resp){
    
    resp.render('login');
});

