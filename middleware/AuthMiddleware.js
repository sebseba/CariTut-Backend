const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.json({ status: false, message: 'TOKENİ GÖNDERMEDİN' });
  }

  const clean1token = req.header('Authorization').split(" ")[1];

  const clean2Token = clean1token.replace(/^"(.+(?="$))"$/, '$1');

  jwt.verify(clean2Token, 'BURAYA_SECRET_KEY_YAZILACAK', async (err, data) => {
    if (err) {
     throw new Error({ status: false, message: 'TOKEN GEÇERLİ DEĞİL' });
    }
    
    // JWT doğrulama başarılı ise, bir sonraki adıma geç
    next();
  });
};