const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
process.env.NODE_ENV = 'test';

const should = chai.should();
const User = require('../models/user')
const Expense = require('../models/expense')
const server = require('../app')


describe('user GET', function () {
  let id_User = ''
  beforeEach(function (done) {
    User.create({
      name: "khodhi",
      email: "khodhirobbani@gmail.com",
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
          .then((result_expense) => {
              User.findOneAndUpdate({
                _id : id_User
              },{
                $push : {
                  expense : result_expense._id
                }
              })
                .then((result) => {
                  done()
                }).catch((err) => {
                  done()
                });

          }).catch((err) => {
            done()
          });
    }).catch((err) => {
        done()

    })

  })

  afterEach(function (done) {
    User.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Expense.remove({}, function (err) {
      done()
    })
  })

  describe('get user', function () {
    it('it should get user login data ', function (done) {
      chai.request(server)
      .get('/user/khodhirobbani@gmail.com')
      .end(function(err, res) {

        res.body.should.be.an('object').to.have.property('user').should.be.an('object')
        res.body.user.should.have.property('_id')
        res.body.user.should.have.property('budget')
        res.body.user.should.have.property('main_balance')
        res.body.user.should.have.property('money_spent')
        res.body.user.should.have.property('name')
        res.body.user.should.have.property('email')
        res.body.user.should.have.property('avatar')
        res.body.user.should.have.property('createdAt')
        res.body.user.should.have.property('updatedAt')
        res.body.user.should.have.property('__v')
        res.body.user.expense[0].should.have.property('_id')
        res.body.user.expense[0].should.have.property('date')
        res.body.user.expense[0].should.have.property('type')
        res.body.user.expense[0].should.have.property('price')
        res.body.user.expense[0].should.have.property('description')
        res.should.have.status(200)
        done()
      })
    })
  })
})

 afterEach(function (done) {
    User.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Expense.remove({}, function (err) {
      done()
    })
  })

  describe('register user POST', function () {
    it('it should create new user', function (done) {
      chai.request(server)
      .post('/user')
      .send({name: 'test',email:'test@gmail.com',avatar:'gambar'})
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('user').should.be.an('object')
        res.body.user.should.have.property('_id')
        res.body.user.should.have.property('budget')
        res.body.user.should.have.property('main_balance')
        res.body.user.should.have.property('money_spent')
        res.body.user.should.have.property('name')
        res.body.user.should.have.property('expense')
        res.body.user.should.have.property('email')
        res.body.user.should.have.property('avatar')
        res.body.user.should.have.property('createdAt')
        res.body.user.should.have.property('updatedAt')
        res.body.user.should.have.property('__v')
        res.should.have.status(201)
        done()
      })
    })
  })


describe('user UPDATE', function () {
  let id_User = ''
  beforeEach(function (done) {
    User.create({
      name: "khodhi",
      email: "khodhirobbani@gmail.com",
      avatar: "gambar"
    })
    .then((foundUser) => {
        done()
    }).catch((err) => {
        done()
    })
  })

//   afterEach(function (done) {
//     User.remove({}, function (err) {
//       done()
//     })
//   })

  describe('update one User', function () {
    it('it should update one User budget&main_balance data ', function (done) {
      chai.request(server)
      .put('/user/khodhirobbani@gmail.com')
      .send({
        budget: 25000,
        main_balance: 22000
      })
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('user').should.be.an('object')
        res.body.user.should.have.property('nModified')
        res.body.user.nModified.should.to.equal(1)
        res.body.user.should.have.property('n')
        res.body.user.n.should.to.equal(1)
        res.body.user.should.have.property('ok')
        res.body.user.ok.should.to.equal(1)
        res.should.have.status(201)
        done()
      })
    })
  })
})
