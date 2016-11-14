const _ = require('lodash');

const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}  = require('mongodb');

const {mongoose} = require('./db/mongoose');  //destructured calling format
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

app.patch('/todos/:id', (req, res) => {
  var id= req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);   // a subset of what user sent us
    
  if (!ObjectID.isValid(req.params.id)) { return res.status(404).send();}
  //check completed value and set completedAt

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();    // rtn javascript timestamp.  ms since 1970
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo)=> { //return the new update
    if (!todo) {
      return res.status(404).send();
    }
    // so we're cool if we reach here....
    res.send(todo);

  }).catch((e) => {
    res.status(400).send();
  });

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

app.delete('/todos/:id', (req, res) => {
  var id=req.params.id

  if (!ObjectID.isValid(id)) { return res.status(404).send('not a valid id');}

  Todo.findByIdAndRemove(id).then((del) => {
    if (del) {
      res.status(200).send({todo:del});
    } 
    res.status(404).send();
    
  }, (err) => {
    res.status(404).send();
  }).catch((e) => {
    res.status(400).send();  //any other executional problem
  });
});

app.post('/users', (req, res)=> {
  var body = _.pick(req.body, ['email','password'])

  var user= new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`started listening on port ${port}`)
});

module.exports = {app};