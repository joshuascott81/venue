const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Import Show Model
const Show = require('../../models/Show');

// Import Profile Model
const Profile = require('../../models/Profile');

// Validation
const validateShowInput = require('../../validation/show');

// @route Get api/show
// @desc Get show
// @access Public
router.get('/', (req, res) => {
  const errors = {};

  Show.find()
    .sort({ date: -1 })
    .then(shows => {
      res.json(shows);
    })
    .catch(err => {
      errors.findAllShows = 'Something went wrong when retrieving all shows';
      res.status(404).json(err);
    });
});

// @route Get api/show/:id
// @desc Get show by :id
// @access Public
router.get('/:id', (req, res) => {
  const errors = {};

  Show.findById({ _id: req.params.id })
    .then(show => {
      if (show === null) {
        errors.getShowById = 'No show found with that ID';
        res.status(404).json(errors);
      } else {
        res.json(show);
      }
    })
    .catch(err => {
      errors.getShowById = 'Invalid ID Sent';
      res.status(404).json({ errors, err });
    });
});

// @route Show api/show
// @desc Create show
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateShowInput(req.body);

    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newShow = new Show({
      'title.text': req.body.text,
      elements: req.body.elemnts,
      backgroundImageUrl: req.body.backgroundImageUrl,
      user: req.user.id
    });

    newShow
      .save()
      .then(show => res.json(show))
      .catch(err => res.json(err));
  }
);

// // @route DELETE api/shows/:id
// // @desc Delete show
// // @access Private
// router.delete('/:id', passport.authenticate('jwt', { session: false }) {
//   if(post.user.toString() !== req.user.id)
//   Show.findOneAndRemove(req.params.id);
// })

module.exports = router;
