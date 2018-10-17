const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({ 
    date: Date,
    price: Number,
    type: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
},{
    timestamps:true     
});


const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense