const express = require('express');
const router = express.Router();

// @route GET api/profile
// @desc Tests Root Route for Profile
// @access Public
router.get('/', (req, res) => {
  res.json({ route: 'profile route home page' });
});

module.exports = router;
