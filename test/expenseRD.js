const server       = require('../app')

const chai      = require('chai')
const chaiHttp  = require('chai-http')

const Expense   = require('../models/expense')
const User   = require('../models/user')

chai.use(chaiHttp)

describe('Expense Testing Delete', function() {
    let exId = null
    
    beforeEach(function(done) {
      User.create({
        name : 'asrul',
        email : 'asrul@mail.com',
        avatar : 'awawa'
      })
        .then((result) => {
          user = result._id
          Expense.create({
            date: new Date(),
                price: 100000,
                type: 'food and drink',
                description: 'Makan enak di bento sama teman teman',
                user: result._id
          })
            .then((result) => {
              done()
              exId = result._id
            }).catch((err) => {
              console.log(err);
            });      
        }).catch((err) => {
          console.log(err);
        });
    })

    describe('delete one expense', function () {
      it('it should delete one expense', function (done) {
        chai.request(server)
        .delete('/expense/'+exId)
        .end(function(err, res) {  
          done()
          res.should.have.status(200)
          res.body.should.be.a('object');
          res.should.not.have.status(404);
        })
      })
    })

    afterEach(function(done) {
      Expense.remove({}, function(err){
        done()
      })
    })

    afterEach(function(done) {
      User.remove({}, function(err){
        done()
      })
    })

})
