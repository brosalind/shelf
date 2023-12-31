require('dotenv').config()
if (process.env.NODE_ENV !== 'production') { 
  require('dotenv').config();
}

const express = require('express')
const cors = require('cors')
const app = express()
const database = process.env.DATABASE_URL
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const router = require('./routers')
const socket = require('socket.io')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
}, {
  pingTimeout: 60000,
}
)

const Discussion = require('./models/Discussion')
const Message = require('./models/Message')
const User = require('./models/User')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)


mongoose.connect(database).then(() => {
  console.log("connected to db")
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((err) => {
  console.log(err)
})


io.on("connection", (socket) => {
  console.log("connected", socket.id)
  socket.on("message", async (message, id, email) => {
    try {

      const doesDiscussionExist = await Discussion.find({ bookId: id })

      const findUser = await User.findOne({ email })

      if (doesDiscussionExist.length > 1) {
        const newMessage = await Message.create({
          sender: findUser._id,
          content: message.content,
          discussion: doesDiscussionExist[0]._id
        })
      } else {
        const newDiscussion = await Discussion.create({
          bookId: id,
          users: [findUser._id]
        })
        const newMessage = await Message.create({
          sender: findUser._id,
          content: message.content,
          discussion: newDiscussion._id
        })
      }
      socket.broadcast.emit("hello", message, findUser.name)
    } catch (err) {
      console.log(err)
    }
  })

socket.on('disconnect', () => {
  console.log("disconnected")
})
})

