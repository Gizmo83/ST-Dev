const router = require('express').Router();
const User = require('../../models/User');
const passport = require('../../passport');

router.post('/signup', (req, res) => {
  console.log('user signup');

  const { firstName, lastName, email, password } = req.body;
  // Validation
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log('user.js post error ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the email: ${email}`
      })
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password
      })

      newUser.save((err, savedUser) => {
        if(err) return res.json(err)
        res.json(savedUser)
      })
    }
  })
})

router.post('/login', function (req, res, next) {
  console.log('routes/User.js, login, req.body: ', req.body)
  next();
},
passport.authenticate('local'),
(req, res) => {
  console.log('logged in', req.user);
  let userInfo = {
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName
  };
  res.send(userInfo)
})

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out'})
  } else {
    res.send({ msg: 'no user to log out'})
  }
})

router.get('/user', (req, res, next) => {
  console.log('==== user !! ====')
  console.log(req.user)
  if (req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user : null})
  }
})

module.exports = router;