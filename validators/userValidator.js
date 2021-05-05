const {check, validationResult} = require('express-validator');

exports.userValidationResult = (req, res, next)=>{
const result = validationResult(req)
if(!result.isEmpty()){
    const error = result.array()[0].msg;
    return res.status(422).json({success: false, error: error})
}
next();
}


exports.userValidator = [
    check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please provide a valid email!'),
    
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .isLength({min: 8})
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage('Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character'),

];


