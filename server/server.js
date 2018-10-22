const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./passport');
const MongoStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 3001;

const routes = require('./routes');

// Configure Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessions
app.use(session({
  secret: 'surg-time',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false
}))

// Logging session
app.use((req, res, next) => {
  console.log('req.session', req.session);
  next()
})

// Passport
app.use(passport.initialize())
app.use(passport.session())  // calls serializedUser and deserializeUser


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/st_db', { useNewUrlParser: true });

// Routes
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
