const Expense = require('../models/expense')
const User = require('../models/user')
const Admin = require('firebase-admin')
const serviceAccount = require('../piti-app-firebase-adminsdk-jyrwd-e163bb63fa.json')
Admin.initializeApp({
    credential: Admin.credential.cert(serviceAccount),
    databaseURL: "https://piti-app.firebaseio.com"
});
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();

function setDate (params){
    let date ;
    if(params){
         date = new Date(params)
    }
    else {
         date = new Date()
    }
    let dd = date.getDate()
    let mm = date.getMonth()
    let yy = date.getFullYear()
    let today =  `${dd}-${mm}-${yy}`
    return today
}

module.exports = {
    visionCreate : (req,res,next) =>{

        // const fileName = req.body.url
        // client
        // .textDetection(fileName)
        // .then(results => {
        //     const detections = results[0].textAnnotations;

        //     let arr = results[0].textAnnotations[0].description.split('\n')

        //     let total = 0
        //     for(let i=0;i<arr.length;i++){
        //         if(arr[i]=='Change'){

        //             total = Number(arr[i+1])
        //             break;
        //         }
        //     }
            req.body = {
                price : 71000,
                description : 'Mcdonald',
                type : 'Food & Drink',
                date : new Date()
            }
            next()
        // })
        // .catch(err => {
        //     res.status(400).json({
        //         err
        //     })
        // });
    },

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
                        let new_main = user.main_balance - result.price
                        let saving_goal = user.budget
                        let date = new Date()
                        let dd = date.getDate()
                        let maxDaySpentMoney = (balance - saving_goal) / (30-dd)
                        // if(setDate() == setDate(req.body.date)){
                        //     if( expensesToday.length!==0){

                        //         if ( expensesToday.reduce(reducer) > maxDaySpentMoney) {
                        //             message = {
                        //                 notification: {
                        //                     title: 'WARNING',
                        //                     body: 'you spent money too much out from your plan'
                        //                 },
                        //                 token: registrationToken
                        //             }
                        //         }
                        //     }
                        //     else {

                        //         if ( req.body.price > maxDaySpentMoney) {
                        //             message = {
                        //                 notification: {
                        //                     title: 'WARNING',
                        //                     body: 'you spent money too much out from your plan'
                        //                 },
                        //                 token: registrationToken
                        //             }
                        //         }
                        //     }
                        // }
                        User.findOneAndUpdate({
                                email: req.params.email
                            }, {
                                $push: {
                                    expense: idExpense
                                },
                                $set : {
                                    money_spent : total_spent,
                                    main_balance : new_main
                                }
                            })
                            .then((result) => {

                            //    if(message){
                            //        Admin.messaging().send(message)
                            //            .then((result) => {
                            //                res.status(201).json({
                            //                    message: 'create expense success',
                            //                    user: result
                            //                })

                            //            }).catch((err) => {
                            //                 res.status(400).json({
                            //                     err
                            //                 })
                            //            });
                            //    }
                            //    else {
                                res.status(201).json({
                                    message: 'create expense success',
                                    user: result
                                })
                            //    }
                            })
                            .catch((err) => {
                                // res.status(400).json({
                                //     err
                                // })
                            });

                    }).catch((err) => {
                        // res.status(400).json({
                        //     err
                        // })
                    })
            }).catch((err) => {
                // res.status(400).json({
                //     err
                // })
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
                // res.status(400).json(err)
            });
    },
    deleteOne: (req, res) => {
        Expense.findById({
                _id: req.params.id
            })
            .then(result => {
                let email = req.body.email
                let id = result._id
                let price = result.price
                let expanse = new Expense({
                    _id: id
                })

                expanse.remove()
                .then((result) => {

                    User.findOne({
                        email: email
                    })
                    .populate('expense')
                    .then((result) => {

                        let newTotal_balance = result.main_balance + price
                        let newMoney_spent = result.money_spent - price
                        User.update(
                            { email: email },
                            {
                                main_balance: newTotal_balance,
                                money_spent: newMoney_spent
                            }
                        )
                            .then((result) => {

                                 res.status(201).json({
                                    message: 'delete expense & update user success',
                                    expense: result
                                })
                            })
                            .catch((err) => {

                            });

                    })
                    .catch((err) => {
                        // res.status(400).json({
                        //     err
                        // })
                    });

                }).catch((err) => {
                    // res.status(400).json(err)
                });
            })
            .catch(err => {
                // res.status(500).json(err)
            }
            )
    }
}