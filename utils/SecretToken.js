const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, 'BURAYA_SECRET_KEY_YAZILACAK', {
    expiresIn: 3 * 24 * 60 * 60,
  });
};