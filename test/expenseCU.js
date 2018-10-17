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
        email: "wahyudisetiaji@gmail.com",
        avatar: "gambar"      
      })
      .then((foundUser) => {      
          id_User = foundUser._id
            Expense.create({
            date: new Date(),
            price: 20000,
            type: 'food',
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
        .post('/expense/create')
        .send({
            date: new Date(),
            price: 15000,
            type: 'food',
            description: 'Warteg',
            user: id_User,
        })
        .end(function(err, res) { 
            expect(res).to.have.status(201)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('create expense success');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('expense');
            expect(res.body.expense).be.a('object');
            expect(res.body.expense).have.property('_id');
            expect(res.body.expense).have.property('date');
            expect(res.body.expense).have.property('price');
            expect(res.body.expense).have.property('type');
            expect(res.body.expense).have.property('description');
            expect(res.body.expense).have.property('user');
            expect(res.body.expense).have.property('createdAt');
            expect(res.body.expense).have.property('updatedAt');
            done()
        })
      })

      it('it should update expense', function (done) {
        chai.request(server)
        .put(`/expense/update/${id_Expense}`)
        .send({
            date: new Date(),
            price: 15000,
            type: 'food',
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
            expect(res.body.expense).have.property('opTime');
            expect(res.body.expense).have.property('electionId');
            expect(res.body.expense).have.property('ok');
            expect(res.body.expense).have.property('operationTime');
            expect(res.body.expense.n).be.a('number');
            expect(res.body.expense.nModified).be.a('number');
            expect(res.body.expense.opTime).be.a('object');
            expect(res.body.expense.electionId).be.a('string')
            expect(res.body.expense.ok).be.a('number');
            expect(res.body.expense.operationTime).be.a('string')
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