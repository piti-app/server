const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var expect = chai.expect
const User = require('../models/user')
const Expense = require('../models/expense')
const server = require('../app')

describe('expense POST & PUT', function () {
    let id_User = ''
    let id_Expense = ''

    before(function (done) {
      User.create({
        name: "wahyudi",
        email: "umatlucu@mail.com",
        avatar: "gambar"      
      })
      .then((foundUser) => { 
        console.log(foundUser)     
          id_User = foundUser._id
            Expense.create({
            date: new Date(),
            price: 20000,
            type: 'Food & Drink',
            description: 'kfc ayam',
            user: id_User,
            })
            .then((expense_expense) => {              
               id_Expense = expense_expense._id
               done()   
            }).catch((err) => {
               done()               
            });              
      }).catch((err) => {
          done()
          
      })
     
    })
  

    describe('create & update Expense', function () {
      it('it should create expense', function (done) {
        chai.request(server)
        .post('/expense/create/umatlucu@mail.com')
        .send({
            date: new Date(),
            price: 15000,
            type: 'food',
            description: 'Warteg',
            url: '../assets/icons/fried-egg.png',
            fcmToken: 'e7r8s8gYnvA:APA91bHFpSxOE67ZG-i__bJRBMDzXBzgwBMJTKAr-VnyVyDaQ9FxdfwC1316_7pNfq_HQ4A1ctfAQ7C9EhpQDE-M6lyTxMTHvhroWnWUOTxODmcnzxLBrvaTGsd740RzcTTp8RoWu2Ek'
        })
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body).have.property('user');
            expect(res.body.message).equal('create expense success');
            expect(res.body.user).be.a('object');
            expect(res.body.user).have.property('budget');
            expect(res.body.user.budget).equal(0);
            expect(res.body.user).have.property('main_balance');
            expect(res.body.user.main_balance).equal(0);
            expect(res.body.user).have.property('money_spent');
            expect(res.body.user.money_spent).equal(0);
            expect(res.body.user).have.property('saving');
            expect(res.body.user.saving).equal(0);
            expect(res.body.user).have.property('expense');
            expect(res.body.user).have.property('_id');
            expect(res.body.user).have.property('name');
            expect(res.body.user).have.property('avatar');
            expect(res.body.user).have.property('email');
            expect(res.body.user).have.property('createdAt');
            expect(res.body.user).have.property('updatedAt');
            done()
        })
      })

      it('it should update expense', function (done) {
        chai.request(server)
        .put(`/expense/update/${id_Expense}`)
        .send({
            date: new Date(),
            price: 15000,
            type: 'Food & Drink',
            description: 'Solaria',
        })
        .end(function(err, res) { 
            expect(res).to.have.status(201)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('update expense success');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('expense');
            expect(res.body.expense).be.a('object');
            expect(res.body.expense).have.property('n');
            expect(res.body.expense).have.property('nModified');
            expect(res.body.expense).have.property('ok');
            expect(res.body.expense.n).be.a('number');
            expect(res.body.expense.nModified).be.a('number');
            expect(res.body.expense.ok).be.a('number');
            done()
        })
      })

      after(function (done) {
        User.remove({}, function (err) {
          done()
        })
      })
    
      after(function (done) {
        Expense.remove({}, function (err) {
          done()
        })
      })

    })
})