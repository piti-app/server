const mongoose = require('mongoose')

const schema = new mongoose.Schema({ 
    username: "string",
    email: "string",
    avatar: "string",
    expense: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('User', schema);