// Model
var Todo = require('./db');

// express 웹프레임워크 모듈 사용
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// __dirname은 프로그램이 실행중인 파일의 위치를 표시
app.use(express.static(__dirname + '/public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;
app.listen(port, function() {
    console.log(`server on! http://localhost:${port}`);
});

// Delete by name and id
app.delete('/api/todo/:name/:id', (req, res) => {
    Todo.remove({ name: req.params.name, id: req.params.id })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

// Find All
app.use('/api/todo/:name', (req, res) => {
    Todo.find({ name: req.params.name })
        .then((todos) => {
            if (!todos.length)
                return res.status(404).send([]);
            res.send(todos);
        })
        .catch((err) => res.status(500).send(err));
});

// Create new todo document
app.post('/api/todo', (req, res) => {
    const todo = new Todo(req.body);
    // return Promise
    return todo.save();
});