const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateShowInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  console.log(data.text);
  if (Validator.isEmpty(data.text)) {
    errors.title = 'Title is required';
  } else if (!Validator.isLength(data.text, { min: 2, max: 30 })) {
    errors.title = 'Title must be between 2 and 30 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
