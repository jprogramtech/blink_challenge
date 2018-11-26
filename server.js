// Starndard imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Router Handlers
const spotify = require('./routes/api/spotify');
const users = require('./routes/api/auth');
const favorite = require('./routes/api/favorite');

//  validation middleware
const validateToken = require('./utils/middleware/validateToken');

// Models
var User = require('./models/User');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config you will use a strategy
require('./config/passport')(passport);

app.use('/api/spotify', validateToken, spotify);
app.use('/api/favorite', favorite);
app.use('/api/users', users);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('blink_client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'blink_client', 'build', 'index.html')
    );
  });
}

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server running on port ${port}`));
