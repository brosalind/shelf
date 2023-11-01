const express = require('express')
const noteRouter = express.Router()
const Controller = require('../controllers/controller')

noteRouter.post('/', Controller.addNote)
noteRouter.get('/', Controller.getNotes)
module.exports = noteRouter