//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');

console.log(ObjectID());

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  } 
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text:'something to do',
  //   completed:false
  // },(err, res) => {
  //   if (err) {return console.log('unable to insert')}
  //   console.log(JSON.stringify(res.ops, undefined, 2))
  // })

  var frank= {
    name:'frank smith',
    age:60,
    location:'UK'
  }

  var{name} = frank;
 console.log(name)


  // db.collection('users').insertOne(frank,(err, res) => {
  //   if (err) {return console.log('unable to insert user:', err)}
  //   console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2))
  // })

  setTimeout(() => { 
    db.close();
  },4000);

});