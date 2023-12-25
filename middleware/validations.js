const {body, validationResult} = require('express-validator')
const validateLogin = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'), (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array().map(error => error.msg).join(', ')
            });  
        }
        next()
    }
]
const validationRegister = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('userName').isLength({min: 6}).withMessage('Username must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array().map(error => error.msg).join(', ')
            });  
        }
        next()
    }
]
const validationProduct = [
    body('name').isLength({min: 6}).withMessage('Name must be at least 6 characters long'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').isLength({min: 6}).withMessage('Description must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array().map(error => error.msg).join(', ')
            });  
        }
        next()
    }
]
module.exports = {
    validateLogin, 
    validationProduct,
    validationRegister,
} 