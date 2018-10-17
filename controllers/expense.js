const Expense = require('../models/expense')

module.exports = {
    createExpense: (req,res) => {        
        Expense.create({
            date: req.body.date,
            price: req.body.price,
            type: req.body.type,
            description: req.body.description,
            user: req.body.user
        })        
             .then((result) => {
                 res.status(201).json({
                     message: 'create expense success',
                     expense : result
                 })
             }).catch((err) => {
                 res.status(400).json({
                     err
                 })
             });
     },
     updateExpense : (req,res) => {
         Expense.update({
             _id: req.params.id
         },{
            date: req.body.date,
            price: req.body.price,
            type: req.body.type,
            description: req.body.description,
         })
            .then((result) => {
                res.status(201).json({
                    message: 'update expense success',
                    expense : result
                })
            }).catch((err) => {
                res.status(400).json(err)
            });
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