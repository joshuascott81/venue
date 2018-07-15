const express = require('express');
const router = express.Router();

// @route GET api/menu
// @desc Tests Root Route for Menu
// @access Public

router.get('/', (req, res) => {
  res.json({ route: 'menu route home page' });
});

module.exports = router;
