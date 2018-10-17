const Expense = require('../models/expense')

module.exports = {
    createOne: (req, res) => {
        let objExpense = {
            date: req.body.date,
            price: req.body.price,
            type: req.body.type,
            description: req.body.description,
            user: req.body._id
        }
        let expense = new Expense(objExpense)
        expense.save()
        .then( result => res.status(201).json({result}))
        .catch( err => res.status(500).json({err}))
    }
}