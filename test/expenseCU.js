let mongoose = require("mongoose");

//Chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../app.js');
chai.use(chaiHttp);
require('dotenv').config()

var Expense = require('../models/expense');

describe('Expense', () => {

    describe('Expense Create & Update', () => {
        
        it('it should POST expense create', (done) => {

            chai.request(server)
            .post('/')
            .send({
                date: '2018-08-19T16:44:07.109Z',
                price: 10000,
                type: 'Test',
                description: 'Bike',
                user: '080232'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200)  
                done();
            })

        })

        after(function (done) {
            mongoose.connect(`mongodb://${process.env.USER_MLAB}:${process.env.PASSWORD_MLAB}@ds247170.mlab.com:47170/piti-app`, { useNewUrlParser: true })
                    .then (function () {
                        Expense.collection.drop()
                        done()
                    }) 
                    .catch (function (err) {
                        done()
                    })   
        })

    })

})