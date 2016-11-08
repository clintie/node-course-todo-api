var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}  = require('mongodb');

var {mongoose} = require('./db/mongoose');  //destructured calling format
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app=express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res)=> {
  console.log(req.body)
  var todo = new Todo({
    text: req.body.text     // if no body parser, we can't access .text as a property, thout
  });
  todo.save().then((doc)=> {
    res.send(doc);          
  }, (e)=> {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos,
    })
  }, (e) => {
    res.status(400).send(e);
    console.log('problemo')
  })
})

app.get('/todos/:id', (req, res)=> {
  if (!ObjectID.isValid(req.params.id)) { return res.status(404).send();}
 
  Todo.findById(req.params.id).then((todo) => {
    if (todo) {
      res.send({todo});
    } else {
      res.status(404).send('None found');
    }
  }, (e) => {
    res.status(400).send();
    console.log('problemo')
  })
  
})

app.listen(port, () => {
  console.log(`started listening on port ${port}`)
});


module.exports = {app};