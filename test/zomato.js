let mongoose = require("mongoose");

//Chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../app.js');
chai.use(chaiHttp);

describe('Zomato', () => {
  describe('/GET showing all articles', () => {
    it('it should GET all the articles', (done) => {
      chai.request(server)
        .get('/zomato')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.should.have.property('message').eql('success finding zomato data');

          done();
        });
    });
  });
});