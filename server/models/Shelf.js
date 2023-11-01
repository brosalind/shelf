const mongoose = require('mongoose')

const ShelfSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    pageCount: {
        type: Number,
        default: 100
    },
    description: {
        type: String,
        required: [true, "Description is required"],
      },
    cover: {
        type: String,
        default: "https://3.bp.blogspot.com/-TRm-H9w6ZVM/UM1NwAE6JhI/AAAAAAAANkE/duehI5zEUKM/s1600/book+cover.jpg"
    },
    genre :{
        type: String,
        default: 'Literature'
    },
    isbn :{
        type: String
    },
    status: {
        type: String,
        default: 'To Read'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Shelf = mongoose.model("Shelf", ShelfSchema)

module.exports = Shelf