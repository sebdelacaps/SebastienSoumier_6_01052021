const User = require('../models/sauce_models');
const bcrypt = require('bcrypt')

// creation of a new sauce
exports.newSauce = (req, res, next) => {
delete req.body._id;
  const sauce = new Sauce({
  ...req.body
  });
sauce.save()
.then(() => res.status(201).json({message: 'Objet enregistré!'}))
.catch(error => res.status(400).json({error}));
     };

     // display all sauce
     exports.displaySauce = (req, res, next) => {
        Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
             };