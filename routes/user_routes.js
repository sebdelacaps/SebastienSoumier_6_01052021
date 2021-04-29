const express = require('express');
const router = express.Router();

// associe les fonctions aux différentes routes 
const userCtrl = require('../controllers/user_controllers')


router.post('/login', userCtrl.login);

 router.post('/signup', userCtrl.signup);

 module.exports = router;