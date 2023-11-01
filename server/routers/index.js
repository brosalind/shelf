const express = require('express')
const router = express.Router()
const shelfRouter = require('../routers/shelf')
const Controller = require('../controllers/controller')
const {errorHandler} = require('../middlewares/errorHandler')
const { authentication } = require('../middlewares/authentication')
const userRouter = require('../routers/user')
const discussionRouter = require('../routers/discussion')
const noteRouter = require('../routers/notes')

router.post('/register', Controller.registerUser)
router.post('/login', Controller.login)
router.use('/discussion', discussionRouter)
router.use(authentication)
router.use('/shelf', shelfRouter)
router.use('/user', userRouter)
router.use('/notes', noteRouter)


router.use(errorHandler)
module.exports = router, shelfRouter,userRouter, discussionRouter, noteRouter