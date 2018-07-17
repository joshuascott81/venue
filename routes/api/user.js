const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route GET api/user
// @desc Tests Root Route for User
// @access Public
router.get('/', (req, res) => {
  res.json({ route: 'user route home page' });
});

// @route GET api/user/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Validate Inputs
  const { errors, isValid } = validateRegisterInput(req.body);

  // If invalid inputs return errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // If valid inputs then save user to database and return user
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/user/login
// @desc Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  // Validate Inputs
  const { errors, isValid } = validateLoginInput(req.body);

  // If invalid inputs return errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email and return token
  User.findOne({ email: email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User email not found';
      res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/user/current
// @desc Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
