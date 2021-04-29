const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creation du schéma due données
const userSchema = mongoose.Schema({
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true} 
})

// on applique la methode plugin au Schéma avec comme argument uniquevalidator
userSchema.plugin(uniqueValidator);

// Exportation du schéma en tant que modèle mongoose
module.exports = mongoose.model('User', userSchema);