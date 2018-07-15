const express = require('express');
const mongoose = require('mongoose');

const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const menu = require('./routes/api/menu');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('landing page');
});

// Use Routes
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/menu', menu);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
