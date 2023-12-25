const jwt = require('jsonwebtoken')
require('dotenv').config()
const message = require('../helper/message')

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        
        try {
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decodeToken.role
            next()
        } catch (error) {
            if(error.name = 'TokenExpiredError'){
                return res.status(401).json({
                    status: false, 
                    message: 'Token has expired'
                })
            }else if(error.name == 'JsonWebTokenError'){
                return res.status(401).json({
                    status: false, 
                    message: 'Invalid token'
                })
            }else 
            {
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred while processing the token'
                })
            }
        }
        
    }else 
    {
        return res.status(401).json({
            success: false,
            message: message.not_found_token
        })
    
    }
}
const checkAuthorizationAdmin = (req, res, next) => {
    if(req.user && req.user.role === 'admin'){
        next()
    }else 
    {
        res.status(403).json({
            status: false, 
            message: 'Access denied. Admin privileges required.'
        })
    }
}
module.exports = {
    authenticateJWT, 
    checkAuthorizationAdmin
}