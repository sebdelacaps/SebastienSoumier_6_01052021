const User = require("../models/user_models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

exports.signup = (req, res, next) => {
  var hash_mail = CryptoJS.HmacSHA256(
    req.body.email,
    process.env.CRYPTOJS_SECRET_KEY
  ).toString();

  //   bcrypt est une fonction asynchrone
  bcrypt
    .hash(req.body.password, 10)

    .then((hash) => {
      const user = new User({
        email: hash_mail,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  var hash_mail = CryptoJS.HmacSHA256(
    req.body.email,
    process.env.CRYPTOJS_SECRET_KEY
  ).toString();

  User.findOne({ email: hash_mail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
