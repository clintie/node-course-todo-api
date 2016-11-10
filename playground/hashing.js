const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 69
};

var token=jwt.sign(data, '123abc');
console.log(token);

var decoded=jwt.verify(token, '123abc');
console.log(decoded);







// var message = 'secret message'
// var salt = 'JF&UDJE(JKJD(EMKLFO(E+))';
// var hash=SHA256(salt+message).toString();
// console.log(`Orig: ${message}\nHash: ${hash}`)

// var data = {
//   id: 4
// };


// var token = {   // looks like legit user and server have to agree a salt
//   data, 
//   hash: SHA256(JSON.stringify(data)+'secretXX').toString()
// }


// //--------------- Bad guy in the middle
// token.data.id=5;
// token.hash=SHA256(JSON.stringify(token.data)).toString();
// //-----------------------

// var resHash = SHA256(JSON.stringify(token.data) + 'secretXX').toString();

// if (resHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was changed don\'t trust');
// }