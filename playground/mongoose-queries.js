const {mongoose}  = require('../server/db/mongoose');
const {Todo}      = require('../server/models/todo');
const {User}      = require('../server/models/user');

const {ObjectID}  = require('mongodb');

var id='5820685cff766f172aec1d1bx';

if (!ObjectID.isValid(id)) {
  return console.log('not valid');

}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   if(todos.length===0) {return console.log('Problem!')}
//   console.log('Todos', todos)
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if(!todo) {return console.log('Problem!')}
//   console.log('\nTodo', todo)
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {return console.log('Problem!')}
//   console.log('\nTodo by id', todo)
  
// }).catch((e) => {
//   console.log(e)
// });


User.findOne({
  _id: id
}).then((user) => {
  if(!user) {return console.log('user not found!')}
  console.log('\User:', JSON.stringify(user, undefined, 2));
});