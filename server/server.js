var express=require('express');
var bodyParser=require('body-parser');

var {mongoose} = require('./db/mongoose');  //destructured calling format
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app=express();

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

app.listen(3000, () => {
  console.log('started listening on port 3000')
});
