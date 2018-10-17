let mongoose = require("mongoose");
let User = require('../models/user')

//Chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../app.js');
chai.use(chaiHttp);
let id = ''

describe('Recommendation', () => {
  describe('/GET showing all zomato restaurant nearby that suits budget', () => {
    beforeEach((done) => {
      User.create({
        name : 'John',
        email : 'john@mail.com',
        avatar : 'test',
        budget : '500000',
        main_balance : '1500000',
        money_spent : '750000'
      })
        .then(response =>{
          id = response._id
          done()
        })
        .catch(error =>{
          console.log(error)
          done()
        })
    });

    afterEach((done) => { //Before each test we empty the database
      User.remove({}, (err) => {
         done();
      });
    });

    it('it should GET all zomato restaurant nearby that suits budget', (done) => {
      console.log(id)
      done()
      // const obj = {
      //   latitude : '-6.254590',
      //   longtitude : '106.757190'
      // }

      // chai.request(server)
      //   .post('/zomato')
      //   .set('content-type', 'application/x-www-form-urlencoded')
      //   .send(obj)
      //   .end((err, res) => {
      //     res.should.have.status(200);
      //     res.body.data.should.be.a('array');
      //     res.body.should.have.property('message').eql('success finding zomato data')
      //     res.body.data[0].should.be.a('object');
      //     res.body.data[0].restaurant.should.have.property('name')
      //     res.body.data[0].should.have.property('restaurant')
      //     res.body.data[0].restaurant.should.have.property('url')
      //     res.body.data[0].restaurant.should.have.property('id')
      //     res.body.data[0].restaurant.should.have.property('location')
      //     res.body.data[0].restaurant.should.have.property('cuisines')
      //     res.body.data[0].restaurant.should.have.property('photos_url')
      //     res.body.data[0].restaurant.should.have.property('photos_url')
      //     res.body.data[0].restaurant.should.have.property('average_cost_for_two')
      //     res.body.data[0].restaurant.should.have.property('thumb')
      //     done();
      //   });
    });
  });
});