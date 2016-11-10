const mongoose=require('mongoose');
const validator=require('validator');

var User=mongoose.model('user', {
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



module.exports = {User}