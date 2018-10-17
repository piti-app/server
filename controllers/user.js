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
                 res.status(201).json({
                     user : result
                 })
             }).catch((err) => {
                 res.status(400).json({
                     err
                 })
             });
     }    
}