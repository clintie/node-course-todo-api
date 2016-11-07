//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');

console.log(ObjectID());

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  } 
  console.log('Connected to MongoDB server');

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
  //   console.log(res)
  //   db.close();
  // })

  db.collection('users').findOneAndDelete({_id:new ObjectID('581f1511b33bce06d47f70a3')}).then((r) => {
    console.log(r);
    db.close();
  })

  // deleteOne
  // deleteMany
  // findOneAndDelete

});