const express = require('express');
const router = express.Router();
const {userValidationResult, userValidator} = require('../validators/userValidator')


// associe les fonctions aux différentes routes 
const userCtrl = require('../controllers/user_controllers')


router.post('/login', userCtrl.login);

 router.post('/signup', userValidator, userValidationResult, userCtrl.signup);

 module.exports = router;