const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({   // placed inside Schema() allows us to create methods
  email: {
    type      : String,
    required  : true,
    trim      : true,
    minlength : 1,
    unique    : true,         // can't be the same as another email
    validate: {
      // validator: (value) => { // see http://mongoosejs.com/docs/validation.html
      //   return validator.isEmail(value);
      // }, 
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },     
                   
    password: {
      type:String,
      required:true,
      minlength:6
    },
    tokens: [{
      access: {
        type:String,
        required: true
      },
      token: {
        type:String,
        required:true
      }
    }]
})

// arrow functions DO NOT bind a this keyword
// this adds methods to the schema


UserSchema.methods.generateAuthToken = function() {
  var user=this;
  var access='auth';
  var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();
            // jsw.sign(the user id and the access variable )
           // jwt.sign(the_data_we_want_to_sign, a_secret_value)
  
  // user.tokens: empty array by default
  user.tokens.push({
    access, token    //es6 def, else access:access, token:token....
  })

  return user.save().then(() => {       // return the value of the successful promise
    return token;
  });
};

UserSchema.methods.toJSON = function() { //what is returned when mongoose model converted to JSON
  var user=this;
  var userObject=user.toObject();

  return _.pick(userObject, ['_id', 'email'])
}

var User=mongoose.model('user', UserSchema)



module.exports = {User}