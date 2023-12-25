const userSchema = require('../schema/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const message = require('../helper/message')
const salt = bcrypt.genSaltSync(10)
const process = require('process')


const login = async (req, res) => {
    const {email, password} = req.body
    const user = await userSchema.findOne({email})
    if (!user) {
        return res.status(400).json({
            success: false,
            message: message.user_is_not_existed
        })
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
            success: false,
            message: message.password_is_incorrect
        })
    }
    const token = jwt.sign({
        email: user.email,
        role: user.role
    }, process.env.SECRET_KEY || 'hehehe', {expiresIn: process.env.EXPIRES_IN || process.env.EXPIRES_IN || '1h'})
        res.cookie('tokenJWT',token);
    return res.status(200).json({
        
        success: true,
        data: {
            token
        }
    })
}
const register = async (req, res) => {
    const {email, password, userName} = req.body
    const hashPassword = bcrypt.hashSync(password, salt)
    const user = await userSchema.create({
        email,
        password: hashPassword,
        userName
    })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: message.user_create_failed
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    })
    
}
module.exports = {
    register, 
    login
}