const Expense = require('../models/expense')
const User = require('../models/user')
const Admin = require('firebase-admin')
const setDate = require('../helper/date')
const serviceAccount = require('../piti-app-firebase-adminsdk-jyrwd-e163bb63fa.json')
Admin.initializeApp({
    credential: Admin.credential.cert(serviceAccount),
    databaseURL: "https://piti-app.firebaseio.com"
});

module.exports = {
    createExpense: (req, res) => {
        let url
        if (req.body.type == 'Food & Drink') {
            url = '../assets/icons/fried-egg.png'
        } else if (req.body.type == 'Transport') {
            url = '../assets/icons/car.png'
        } else if (req.body.type == 'Personal') {
            url = '../assets/icons/piggy-bank.png'
        } else if (req.body.type == 'Electronic') {
            url = '../assets/icons/headphones.png'
        } else if (req.body.type == 'Clothes') {
            url = '../assets/icons/basketball-jersey.png'
        } else if (req.body.type == 'Entertainment') {
            url = '../assets/icons/monitor.png'
        } else {
            url = '../assets/icons/user.png'
        }
        let registrationToken = req.body.fcmToken
        let message;
        Expense.create({
                date: req.body.date,
                price: req.body.price,
                type: req.body.type,
                description: req.body.description,
                url: url
            })
            .then((result) => {
                let idExpense = result._id
                User.findOne({
                        email: req.params.email
                    })
                    .populate('expense')
                    .then((user) => {
                        let expensesToday = []
                        user.expense.forEach(item =>{
                            if(setDate(item.date)== setDate()){                                   
                            expensesToday.push(item.price)
                            }
                        }) 
                        const reducer = (accumulator, currentValue) => accumulator + currentValue;
                        let balance = user.main_balance
                        let total_spent = user.money_spent + result.price
                        let saving_goal = user.budget
<<<<<<< HEAD
<<<<<<< HEAD
                        let date = new Date()
                        let dd = date.getDate()
                        let maxDaySpentMoney = (balance - saving_goal) / (30-dd)
=======
                        let maxDaySpentMoney = (balance - saving_goal) / 30
>>>>>>> upadate server add
=======
                        let date = new Date()
                        let dd = date.getDate()
                        let maxDaySpentMoney = (balance - saving_goal) / (30-dd)
>>>>>>> done
                        if(setDate() == setDate(req.body.date)){
                            if ( expensesToday.reduce(reducer) > maxDaySpentMoney) {                                
                                message = {
                                    notification: {
                                        title: 'WARNING',
                                        body: 'you spent money too much out from your plan'
                                    },
                                    token: registrationToken
                                }
                            }
                        }                        
                        User.findOneAndUpdate({
                                email: req.params.email
                            }, {
                                $push: {
                                    expense: idExpense
                                },
                                $set : {
                                    money_spent : total_spent
                                }
                            })
                            .then((result) => {                         
                               if(message){
                                   Admin.messaging().send(message)
                                       .then((result) => {
                                           res.status(201).json({
                                               message: 'create expense success',
                                               user: result
                                           })

                                       }).catch((err) => {
                                           console.log(err)
                                       });
                               }
                               else {
                                res.status(201).json({
                                    message: 'create expense success',
                                    user: result
                                })
                               }
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    err
                                })
                            });

                    }).catch((err) => {
                        res.status(400).json({
                            err
                        })
                    })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });

    },
    updateExpense: (req, res) => {
        Expense.update({
                _id: req.params.id
            }, {
                date: req.body.date,
                price: req.body.price,
                type: req.body.type,
                description: req.body.description,
            })
            .then((result) => {
                res.status(201).json({
                    message: 'update expense success',
                    expense: result
                })
            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    deleteOne: (req, res) => {
        Expense.findById({
                _id: req.params.id
            })
            .then(result => {
                let expanse = new Expense({
                    _id: result._id
                })
                expanse.remove()
                    .then(response => res.status(200).json(response))
                    .catch(err => res.status(500).json(err))
            })
            .catch(err => res.status(500).json(err))
    }
}