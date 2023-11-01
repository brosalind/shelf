const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Title",
        required: [true, "Title is required"]
    },
    note: {
        type: String,
        required: [true, "Text is required"]
    },
    tags: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shelf"
    }
},
{
    timestamps: true
})

const Note = mongoose.model("Note", NoteSchema)

module.exports = Note