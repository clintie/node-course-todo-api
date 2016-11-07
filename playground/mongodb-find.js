//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');

console.log(ObjectID());

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  } 
  console.log('Connected to MongoDB server');

  db.collection('users').find({name:'andy'}).toArray().then((res) => {
    console.log('results: ' + JSON.stringify(res, undefined, 2));
    db.close();
  }, (err) => {
    console.log('problem!', err)
    db.close();
  });
});