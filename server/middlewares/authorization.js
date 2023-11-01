const Shelf = require('../models/Shelf')

const authorization = async (req, res, next) => {

    try {
        const foundBook = await Shelf.findOne({
            _id: req.body.id
        })

        console.log(foundBook)
        console.log(req.user._id, foundBook.user)
        
        if (!foundBook || foundBook.user != req.user._id) {
            
            throw { name: 'Unauthorized' }
        } else {
            next()
        }
        next()
    }
    catch(err){
        next(err)
    }

}


module.exports = {authorization}