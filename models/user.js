const mongoose = require('mongoose')

const schema = new mongoose.Schema({
   name: "string",
   email: "string",
   avatar: "string",
   budget: { type: Number, default: 0 },
   main_balance: { type: Number, default: 0 },
   money_spent: { type: Number, default: 0 },
   expense: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Expense'
   }]
}, {
   timestamps: true
});


module.exports = mongoose.model('User', schema);