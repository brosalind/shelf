const express = require('express')
const userRouter = express.Router()
const Controller = require('../controllers/controller')

userRouter.get('/', Controller.findUser)
userRouter.put('/', Controller.updateProfile)

module.exports = userRouter