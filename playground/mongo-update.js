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

  db.collection('users').findOneAndUpdate({
    _id:new ObjectID('581f0f8cda120006a3d57d0d')
  }, {
    $set: {
      name:'jim jones'
    }, 
    $inc: {
      age:1
    }
  }, {
    returnOriginal:false  // we wanna see the orig returned - pre change?
  }).then((r)=> {
    console.log(r);
    db.close();
  });

  // deleteOne
  // deleteMany
  // findOneAndDelete

});