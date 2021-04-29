const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// associe les fonctions aux différentes routes 

const sauceCtrl = require('../controllers/sauce_controllers')


router.get('/', auth, sauceCtrl.displaySauce);

 router.post('/:id', auth);

router.post('/', auth, sauceCtrl.newSauce);

router.put('/:id', auth);

router.delete('/:id', auth);

router.post('/:id/like', auth);

 module.exports = router;