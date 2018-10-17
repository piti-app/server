const User = require('../models/user')

module.exports = {
    getUser : (req,res) => {
        console.log(req.params,'===========>')
    }
    // createOne: (req, res) => {
    //     let objExpense = {
    //         price: req.body.price,
    //         type: req.body.type,
    //         description: req.body.description,
    //         user: req.decoded._id
    //     }
    //     let expense = new User(objExpense)
    //     expense.save()
    //     .then( result => res.status(201).json({result}))
    //     .catch( err => res.status(500).json({err}))
    // }
}