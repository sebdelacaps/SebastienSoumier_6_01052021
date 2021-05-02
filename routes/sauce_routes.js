const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// associe les fonctions aux différentes routes 

const sauceCtrl = require('../controllers/sauce_controllers')


router.get('/', auth, sauceCtrl.displaySauce);

 router.get('/:id', auth, sauceCtrl.getSauce);

router.post('/', auth, multer, sauceCtrl.newSauce);

router.put('/:id', auth, multer, sauceCtrl.modifySauce);

router.delete('/:id', auth, sauceCtrl.deleteSauce);

router.post('/:id/like', auth, sauceCtrl.likeSauce);

 module.exports = router;