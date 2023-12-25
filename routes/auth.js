const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const {validateLogin, validationRegister} = require('../middleware/validations')
const { authenticateJWT, checkAuthorizationAdmin} = require('../middleware/checkAuth')

router.post('/login', authenticateJWT, checkAuthorizationAdmin, authController.login)
router.post('/register', validationRegister, authController.register)

module.exports = router