const User= require('../models/User')
const {checkToken} = require('../helpers/jwt')

const authentication = async(req, res, next) => {
    try {
        const {access_token} = req.headers
        const verifyUser = checkToken(access_token)

        if(!verifyUser){
            throw {name: 'JsonWebTokenError'}
        } else {
            const currentUser = await User.findById(
                verifyUser.id) 
                req.user = currentUser
        }
        next()
    } catch (err) {
        next(err)
        
    }

}

module.exports = {authentication}