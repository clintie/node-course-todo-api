const {mongoose}  = require('../server/db/mongoose');
const {Todo}      = require('../server/models/todo');
const {User}      = require('../server/models/user');

const {ObjectID}  = require('mongodb');

// Todo.remove({}).then((res) => {
//   console.log(res.result);  //we don't get docs back
// })

// Todo.findOneAndRemove({}).then((doc) => {
//   console.log(res);
// })

Todo.findByIdAndRemove('5821b67408c2b9e91a3f52aa').then((res) => {
  if (res) {console.log(res);}
}, (err) => {
  console.log('nothing removed');
})