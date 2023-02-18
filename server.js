const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bee = require('bcrypt');


app.use(cors());
app.use(bodyParser());
app.all("*", function(res, req, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

const students = [];

app.post('/insert', function(req, res){
    let input = req.body;
    students.push(input.name);
    console.log(students);
});

app.post('/update', function(req, res){
    let input = req.body;
    students.splice(input.index, 1, input.newName);
    console.log(students);
});

app.delete('/delete', function(req,res){
    let input = req.body;
    students.splice(input.index, 1);
    console.log(students);
});

app.get('/showall', function(req, res){
    res.send(students);
});

app.get('/showspecific', function(req, res){
    let input = req.body;
    res.send(students[input.index]);
});

app.post('/register', function(req, res){//Does not work :( / Experimental
    let input = req.body;
    bee.hash(input.pass, 10, async function(err, hash){
        let user = [];
        user.push(input);
        user.splice(0, 1, hash);
        students.push(user);
        console.log(students);
    });
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`App is up on port ${port}`)
});