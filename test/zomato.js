// let mongoose = require("mongoose");

// //Chai
// var chai = require('chai');
// var assert = chai.assert;
// var expect = chai.expect;
// var should = chai.should();
// let chaiHttp = require('chai-http');
// let server = require('../app.js');
// chai.use(chaiHttp);

// describe('Zomato', () => {
//   describe('/GET showing all zomato restaurant nearby', () => {
//     it('it should GET all zomato restaurant', (done) => {
//       const obj = {
//         latitude : '-6.254590',
//         longtitude : '106.757190'
//       }

//       chai.request(server)
//         .post('/zomato')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(obj)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.data.should.be.a('array');
//           res.body.should.have.property('message').eql('success finding zomato data')
//           res.body.data[0].should.be.a('object');
//           res.body.data[0].restaurant.should.have.property('name')
//           res.body.data[0].should.have.property('restaurant')
//           res.body.data[0].restaurant.should.have.property('url')
//           res.body.data[0].restaurant.should.have.property('id')
//           res.body.data[0].restaurant.should.have.property('location')
//           res.body.data[0].restaurant.should.have.property('cuisines')
//           res.body.data[0].restaurant.should.have.property('photos_url')
//           res.body.data[0].restaurant.should.have.property('photos_url')
//           res.body.data[0].restaurant.should.have.property('average_cost_for_two')
//           res.body.data[0].restaurant.should.have.property('thumb')
//           done();
//         });
//     });
//   });
// });