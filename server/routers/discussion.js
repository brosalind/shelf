const express = require('express')
const discussionRouter = express.Router()
const Controller = require('../controllers/controller')

discussionRouter.get('/', Controller.getDiscussion)
module.exports = discussionRouter