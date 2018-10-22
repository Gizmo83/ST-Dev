const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    unique: false,
    trim: true,
    require: true
  },
  lastName: {
    type: String,
    unique: false,
    trim: true,
    require: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/],
    require: true
  },
  password: {
    type: String,
    unique: false,
    trim: true,
    required: true,
    validate: [
      function(input) {
        return input.length >= 6;
      }
    ]
  },
  userCreated: {
    type: Date,
    default: Date.now
  }
});

// Schema Methods
UserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// Define hooks for pre-saving
UserSchema.pre('save', function(next) {
  if(!this.password) {
    console.log('models/User.js ====NO PASSWORD PROVIDED====');
    next()
  } else {
    console.log('models/User.js hashPassword in pre save');

    this.password = this.hashPassword(this.password)
    next()
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
