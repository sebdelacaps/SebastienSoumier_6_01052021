const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

console.log(process.env.USER_MONGODB);

const userRoutes = require('./routes/user_routes');
const sauceRoutes = require('./routes/sauce_routes');

mongoose.connect(`mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_USER_MONGODB}@cluster0.lmble.mongodb.net/soPekocko_db?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use(express.json())

app.use('/images', express.static(path.join(__dirname,'images')))

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;