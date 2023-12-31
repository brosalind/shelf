const express = require('express')
const shelfRouter = express.Router()
const Controller = require('../controllers/controller')
const {authorization} = require('../middlewares/authorization')

shelfRouter.post('/', Controller.addBookToShelf)
shelfRouter.get('/', Controller.getMyShelf)
shelfRouter.delete('/',Controller.removeBookFromShelf)
shelfRouter.get('/all', Controller.getAllShelf)
shelfRouter.get('/book',Controller.getBookDetail)
shelfRouter.get('/completed', Controller.getCompletedBooks)
shelfRouter.get('/current', Controller.getCurrentReads)
shelfRouter.patch('/current', Controller.changeStatsToCurrent)
shelfRouter.patch('/completed', Controller.changeStatsToFinish)
shelfRouter.patch('/toread', Controller.changeStatsToRead)
module.exports = shelfRouter