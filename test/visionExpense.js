let mongoose = require("mongoose");
process.env.NODE_ENV = 'test';

//Chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../app.js');
chai.use(chaiHttp);
const User = require('../models/user')


describe('Google Vision Test', () => {
  describe('/POST create expense', () => {
    let email = ''
    beforeEach(function (done) {
      User.create({
        name: "test",
        email: "test@gmail.com"
      })
      .then((foundUser) => {
          email = foundUser.email
          done()
        }).catch((err) => {
            done()
        })
      })

      afterEach(function (done) {
        // User.remove({}, function (err) {
        //   done()
        // })
        done()
      })

    it('it should create an expense from image input', (done) => {
      const obj = {
        url : 'https://storage.googleapis.com/mtb-corner.wahyudisetiaji.xyz/1540372990695mcdonaldindo.jpg'
      }
      chai.request(server)
        .post(`/expense/create/vision/${email}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(obj)
        .end((err, res) => {
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
            expect(res.body.user).have.property('email');
            expect(res.body.user).have.property('createdAt');
            expect(res.body.user).have.property('updatedAt');
            done()
        });
    });
  });
});