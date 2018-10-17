const Expense = require('../models/expense')

module.exports = {
    createOne: (req, res) => {
        let objExpense = {
            date: req.body.date,
            price: req.body.price,
            type: req.body.type,
            description: req.body.description,
            user: req.body.user
        }
        let expense = new Expense(objExpense)
        expense.save()
        .then( result => res.status(201).json({result}))
        .catch( err => res.status(500).json({err}))
    },
    deleteOne: (req, res) => {
        Expense.findById({_id:req.params.id})
        .then(result => {
            let expanse = new Expense({_id: result._id})
            expanse.remove()
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    }
}