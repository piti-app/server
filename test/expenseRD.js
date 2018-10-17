const app       = require('../app')

const chai      = require('chai')
const chaiHttp  = require('chai-http')
const expect    = chai.expect

const Expanse   = require('../models/expense')
const User   = require('../models/user')

chai.use(chaiHttp)

describe('Expanse Testing Read and Delete', function() {
    // hooks before each
    let idExpanse = null
    let user = null
    
    beforeEach(function(done) {

      User.create({
        name : 'asrul',
        email : 'asrul@mail.com',
        avatar : 'awawa'
      })
        .then((result) => {
          user = result._id
          Expanse.create({
            date: new Date(),
                price: 100000,
                type: 'food and drink',
                description: 'Makan enak di bento sama teman teman',
                user: result._id
          })
            .then((result) => {
              console.log('Ini ', result);
              idExpanse = result._id
              done()
            }).catch((err) => {
              done()
            });      
        }).catch((err) => {
          done()
        });
    })

    afterEach(function(done) {
      Expanse.remove({}, function(err){
        done()
      })
    })

    describe('delete one expanse', function () {
      it('it should delete one expanse data ', function (done) {
        chai.request(server)
        .get('/expanse')
        .end(function(err, res) {
          res.body.should.be.an('object').to.have.property('expanse').with.lengthOf(1).should.be.an('object')
          res.body.expanse[0].should.have.property('createdAt')
          res.body.expanse[0].should.have.property('updatedAt')
          res.body.expanse[0].should.have.property('__v')
          res.should.have.status(200)
          chai.request(server)
          .delete('/expanse/'+res.body.expanse[0]._id)
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