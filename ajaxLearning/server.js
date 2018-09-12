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


app.get('/', function(req, resp){
    resp.render('login');
});

app.post("/posts", function(req, resp){
        client.then(function(connection){
            const col = connection.db('check').collection('posts');
 
            let data = {title: req.body.title, text: req.body.content};
            if(data.title && data.text){
                col.insertOne(data);
            }

            if(req.body.clearBtn){
                col.drop();
            }
            
            resp.redirect('/posts');
        });
});