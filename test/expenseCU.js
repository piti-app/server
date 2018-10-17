const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should();
const User = require('../models/user')
const Expense = require('../models/expense')
const server = require('../app')

describe('expense POST', function () {
    let id_User = ''
    this.timeout(2000000)
    beforeEach(function (done) {
      User.create({
        name: "wahyudi",
        email: "wahyudisetiaji@gmail.com",
        avatar: "gambar"      
      })
      .then((foundUser) => {      
          id_User = foundUser._id
          done()               
      }).catch((err) => {
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
  
    describe('create Expense', function () {
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
            res.body.should.be.an('object').to.have.property('user').should.be.an('object')  
            res.body.user.should.have.property('_id')
            res.body.user.should.have.property('data')
            res.body.user.should.have.property('price')
            res.body.user.should.have.property('type')
            res.body.user.should.have.property('description')
            res.body.user.should.have.property('user')
            res.body.user.should.have.property('createdAt')
            res.body.user.should.have.property('updatedAt')
            res.body.user.should.have.property('__v')                             
            res.should.have.status(201)
            done()
        })
      })
    })

    describe('update Expense', function () {
        it('it should update expense', function (done) {
          chai.request(server)
          .put('/expense/update')
          .send({
              date: new Date(),
              price: 15000,
              type: 'food',
              description: 'Solaria',
              user: id_User,
          })
          .end(function(err, res) { 
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