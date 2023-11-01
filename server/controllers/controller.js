const User = require('../models/User')
const Shelf = require('../models/Shelf')
const {createToken} = require('../helpers/jwt')
const {checkPassword} = require('../helpers/bcrypt')
const Discussion = require('../models/Discussion')
const Message = require('../models/Message')
const Note = require('../models/Note')

class Controller {
    static async registerUser(req, res, next){
        try {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: 'user'
            })

            const access_token = createToken({
                id: newUser.id,
                email: newUser.email
            })

            res.status(201).json({
                access_token,
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                picture: newUser.pic
            })
        } catch (err) {
            next(err)   
        }
    }
    static async login(req, res, next) {
        try {

            const {email, password} = req.body
            if(!email || email.trim().length === 0){
                throw {name: "noEmail"}
            }

            if(!password || password.trim().length ===0){
                throw {name: "noPassword"}
            }
            
            const user = await User.findOne({email})

            if (!user) {
                throw { name: "userDoesNotExist" }
            } else {
                const isPasswordValid = checkPassword(req.body.password, user.password)
                if (!isPasswordValid) {
                    throw { name: 'wrongPassword' }
                } else {
                    const access_token = createToken({
                        id: user.id,
                        email: user.email
                    })
                    res.json({ access_token, email: user.email, role: user.role, name: user.name, picture: user.pic})
                }
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async addBookToShelf(req, res, next){
        try {
            const {title, author, pageCount, description, cover, genre, isbn} = req.body

            const newBook = await Shelf.create({
                title: title,
                author: author,
                pageCount: pageCount,
                description: description,
                cover: cover,
                genre: genre,
                user: req.user._id,
                isbn: isbn
            })
            
            res.status(201).json(newBook)
            
        } catch (err) {
            next(err)
            
        }
    }

    static async getMyShelf(req, res, next){
        try {
            const shelfData = await Shelf.find({
                $and: [{
                    user: req.user._id
                }, {
                    status: 'To Read'
                }]
            })
            
            res.json(shelfData)
            
        } catch (err) {
            next(err)
            
        }
    }

    static async getAllShelf(req, res, next){
        try {
            const allShelf = await Shelf.find({
                    user: req.user._id
                
            })
            
            res.json(allShelf)
            
        } catch (err) {
            next(err)
            
        }
    }

    static async getCompletedBooks(req,res,next){
        try {
            const shelfData = await Shelf.find({
                $and: [{
                    user: req.user._id
                }, {
                    status: 'Finished'
                }]
            })
            
            res.json(shelfData)
            
        } catch (err) {
            next(err)
            
        }

    }

    static async getCurrentReads(req,res,next){
        try {
            const shelfData = await Shelf.find({
                $and: [{
                    user: req.user._id
                }, {
                    status: 'Current'
                }]
            })
            
            res.json(shelfData)
            
        } catch (err) {
            next(err)
            
        }
    }

    static async changeStatsToCurrent(req, res, next){
        try {
            const bookId = req.body.id

            const update = {
                $set: {
                    status: 'Current',
                }
            }
            const updatedBookStatus = await Shelf.findOneAndUpdate({
                _id: bookId
            }, update)

            const updatedBook = await Shelf.findById({
                _id: bookId
            })

            res.json(updatedBook)

        } catch (err) {
            next(err)
        }
    }

    static async changeStatsToRead(req, res, next){
        try {
            const bookId = req.body.id

            const update = {
                $set: {
                    status: 'To Read',
                }
            }
            const updatedBookStatus = await Shelf.findOneAndUpdate({
                _id: bookId
            }, update)

            const updatedBook = await Shelf.findById({
                _id: bookId
            })

            res.json(updatedBook)

        } catch (err) {
            console.log(err)
            next(err)
        }

    }

    static async changeStatsToFinish(req, res, next){
        try {
            const bookId = req.body.id

            const update = {
                $set: {
                    status: 'Finished',
                }
            }
            const updatedBookStatus = await Shelf.findOneAndUpdate({
                _id: bookId
            }, update)

            const updatedBook = await Shelf.findById({
                _id: bookId
            })

            res.json(updatedBook)

        } catch (err) {
            next(err)
        }
    }

    static async findUser(req, res, next){
        try{
            const {search} = req.query

            let options = { _id: { $ne: req.user._id } }
    

            if(search){
                options.name =  { $regex: search }
            } 

            const users = await User.find(options)

            if(!users){
                throw {name: "notFound"}
            }
            
            res.json(users);
        }catch(err){
            next(err)
        }
    }

    static async getDiscussion(req, res, next){
        try {
            const discussionData = await Discussion.find({
                bookId: req.query.id
            })

            if(discussionData.length <1){
                throw {name: "notFound"}
            } else {

                const discussionPosts = await Message.find({
                    discussion: discussionData[0]._id
                }).populate('sender')

                res.json(discussionPosts)
            }
   

        }catch(err){
            next(err)

        }
    }
    static async updateProfile(req, res, next){
        try {
            const update = {
                $set: {
                    name: req.body.name,
                    pic: req.body.pic
                }
            }
            const user = await User.findOneAndUpdate({
                _id: req.user._id
            }, update)

            res.json(user)

        } catch(err){
            next(err)
        }
    }

    static async removeBookFromShelf(req, res, next){
        try {
            const deletedBook = await Shelf.findOneAndRemove({
                _id: req.body.id
            })

            if(!deletedBook){
                throw {name: "notFound"}
            }
            res.json({message: `${deletedBook.title} was removed from your shelf`})

        } catch(err){
            next(err)
        }
    }


    static async getBookDetail(req, res, next){
        try {

            const { id } = req.query
            const currentBook = await Shelf.findById({
                _id: id
            })

            if(!currentBook){
                throw {name: "notFound"}
            } else {
                const bookNotes = await Note.find({
                    $and: [{
                        user: req.user._id
                    }, {
                        book: id
                    }]
                })
                res.json({currentBook, bookNotes})
            }
        
        } catch(err){
            next(err)
        }
    }

    static async addNote(req, res, next){
        try{
            const newNote = Note.create({
                title: req.body.title,
                note: req.body.text,
                book: req.body.bookId,
                user: req.user._id
            })

            res.status(201).json(newNote)

        } catch(err){
            next(err)
        }
    }

    static async getNotes(req, res, next){
        try {
            const myNotes = await Note.find({
                    user: req.user._id
                })
            
            res.json(myNotes)
        }
  
        catch (err) {
        next(err)
    }}

    // static async getNotesByBook(req, res, next){
    //     try {
    //         const bookNotes = await Note.find({
    //             $and: [{
    //                 user: req.user._id
    //             }, {
    //                 book: req.body.bookId
    //             }]
    //         })
            
    //         res.json(bookNotes)

    //     }
  
    //     catch (err) {
    //     next(err)
    // }}
}

module.exports = Controller