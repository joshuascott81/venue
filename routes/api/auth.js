const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Tests Root Route for Auth
// @access Public
router.get('/', (req, res) => {
  res.json({ route: 'auth route home page' });
});

module.exports = router;
