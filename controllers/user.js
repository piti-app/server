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
    }    
}