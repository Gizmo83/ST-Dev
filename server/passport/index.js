const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/User');


// called on login, saves the id to sesseion req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log('*** serializeUser called, user: ')
  console.log(user)
  console.log('----------')
  done(null, { _id: user._id })
})

// user object attached to the request as req.user
passport.deserializeUser((id, done) => {
  console.log('DeserializeUser called')
  User.findOne(
    { _id: id },
    {'email':'email','firstName':'firstName', 'lastName':'lastName'},
    (err, user) => {
      console.log('*** Deserialize user, user:')
      console.log(user)
      console.log('-------')
      done(null, user)
    }
  )
})

// Use Strategies
passport.use(LocalStrategy)

module.exports = passport;