const User = require('../models/user')

module.exports = {
    getUser : (req,res) => {
       User.findOne({
           email : req.params.email
       })
       .populate('expense')
            .then((result) => {
                res.status(200).json({
                    user : result
                })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    registerUser : (req,res) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar
        })
             .then((result) => {
                let usersaving =  {
                    user : result
                   }
                    res.status(201).json({
                        user : result
                    })
             }).catch((err) => {
                 res.status(400).json({
                     err
                 })
             });
     },
     updateUser : (req,res) => {
         User.update({
            email : req.params.email
         },{
             budget : req.body.budget,
             main_balance:  req.body.main_balance
         })
            .then((result) => {
                res.status(201).json({
                    msg : 'success edit budget and main balance',
                    user : result
                })
            }).catch((err) => {
                res.status(400).json(err)
            });
     },
     updateProfileUser : (req,res) => {
         console.log(req.body)
        User.update({
           email : req.params.email
        },{
            name: req.body.name,
            avatar: req.body.avatar,
            email: req.body.email,
            budget : req.body.budget,
            main_balance:  req.body.main_balance-req.body.spent
        })
           .then((result) => {
               res.status(201).json({
                   msg : 'success edit budget and main balance',
                   user : result
               })
           }).catch((err) => {
               res.status(400).json(err)
           });
    }
}