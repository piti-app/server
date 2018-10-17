const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const Expense = require('../models/expense')
const server = require('../app')

describe('Expance DELETE', function () {
  let id = ''
  beforeEach(function (done) {
    const expance = new Expense({
      date: new date(),
      price: 10000,
      type: 'food and drink',
      description: 'Makan pecel lele disebelah',
      user: 1
    })
    expance.save((err,res) => {
      id = res._id
      done()
    })
  })

  afterEach(function (done) {
    Expense.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Expense.remove({}, function (err) {
      done()
    })
  })

  describe('delete one expance', function () {
    it('it should delete one expance data ', function (done) {
      chai.request(server)
      .get('/expanse')
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('expance').with.lengthOf(1).should.be.an('object')
        res.body.expance[0].should.have.property('date')
        res.body.expance[0].should.have.property('type')
        res.body.expance[0].should.have.property('price')
        res.body.expance[0].should.have.property('description')
        res.body.expance[0].should.have.property('createdAt')
        res.body.expance[0].should.have.property('updatedAt')
        res.body.expance[0].should.have.property('__v')
        res.should.have.status(200)
        chai.request(server)
        .delete('/expanse/'+res.body.expance[0]._id)
        .end(function(err, response){
          response.should.have.status(201);
          response.should.not.have.status(404);
          response.body.should.be.a('object');
          done();
        })
      })
    })
  })
})
