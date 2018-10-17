const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should();
const User = require('../models/user')
const Expense = require('../models/expense')
const server = require('../app')
let id_User = ''

describe('user GET', function () {
  
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

// describe('trainer POST', function () {
//   let id_pokemon = ''
//   beforeEach(function (done) {
//     const pokemon = new Pokemon({
//       name: "Charmender",
//       level: 1,
//       type: "fire",
//     })
//     pokemon.save((err,res) => {
//       id_pokemon = res._id
//       done()
//     })
//   })
//   afterEach(function (done) {
//     Trainer.remove({}, function (err) {
//       done()
//     })
//   })

//   afterEach(function (done) {
//     Pokemon.remove({}, function (err) {
//       done()
//     })
//   })

//   describe('post one user', function () {
//     it('it should post one Trainer data ', function (done) {
//       chai.request(server)
//       .post('/api/user')
//       .send({
//         nickname: "Ash Ketchum",
//         gender: "Male",
//         pokemons: [id_pokemon]
//       })
//       .end(function(err, res) {
//         res.body.should.be.an('object').to.have.property('msg')
//         res.body.should.be.an('object').to.have.property('trainer')
//         res.body.trainer.should.have.property('pokemons').with.lengthOf(1)
//         res.body.trainer.should.have.property('nickname')
//         res.body.trainer.should.have.property('gender')
//         res.body.trainer.should.have.property('createdAt')
//         res.body.trainer.should.have.property('updatedAt')
//         res.body.trainer.should.have.property('__v')
//         res.should.have.status(201)
//         done()
//       })
//     })
//   })
// })

// describe('trainer UPDATE', function () {
//   let id = ''
//   let id_pokemon = ''
//   beforeEach(function (done) {
//     const pokemon = new Pokemon({
//       name: "Charmender",
//       level: 1,
//       type: "fire",
//     })
//     pokemon.save((err,res) => {
//       id_pokemon = res._id
//       const newTrainer = new Trainer({
//         nickname: "Ash Ketchum",
//         gender: "Male",
//         pokemons: [id_pokemon]
//       })
//       newTrainer.save((err,res) => {
//         id = res._id
//         done()
//       })
//     })
//   })

//   afterEach(function (done) {
//     Trainer.remove({}, function (err) {
//       done()
//     })
//   })

//   afterEach(function (done) {
//     Pokemon.remove({}, function (err) {
//       done()
//     })
//   })

//   describe('update one Trainer', function () {
//     it('it should update one Trainer data ', function (done) {
//       chai.request(server)
//       .put('/api/user/'+id)
//       .send({
//         nickname: "Brock"
//       })
//       .end(function(err, res) {
//         res.body.should.be.an('object').to.have.property('msg')
//         res.body.should.be.an('object').to.have.property('trainer')
//         res.body.trainer.should.have.property('pokemons').with.lengthOf(1)
//         res.body.trainer.should.have.property('nickname')
//         res.body.trainer.should.have.property('gender')
//         res.body.trainer.should.have.property('createdAt')
//         res.body.trainer.should.have.property('updatedAt')
//         res.body.trainer.should.have.property('__v')
//         res.body.trainer.nickname.should.equal('Brock')
//         res.should.have.status(201)
//         done()
//       })
//     })
//   })
// })

// describe('trainer DELETE', function () {
//   let id = ''
//   let id_pokemon = ''
//   beforeEach(function (done) {
//     const pokemon = new Pokemon({
//       name: "Charmender",
//       level: 1,
//       type: "fire",
//     })
//     pokemon.save((err,res) => {
//       id_pokemon = res._id
//       done()
//     })
//   })
//   beforeEach(function (done) {
//     const newTrainer = new Trainer({
//       nickname: "Ash Ketchum",
//       gender: "Male",
//       pokemons: [id_pokemon]
//     })
//     newTrainer.save((err,res) => {
//       id = res._id
//       done()
//     })
//   })

//   afterEach(function (done) {
//     Trainer.remove({}, function (err) {
//       done()
//     })
//   })

//   afterEach(function (done) {
//     Pokemon.remove({}, function (err) {
//       done()
//     })
//   })

//   describe('delete one user', function () {
//     it('it should delete one user data ', function (done) {
//       chai.request(server)
//       .get('/api/user')
//       .end(function(err, res) {
//         res.body.should.be.an('object').to.have.property('msg')
//         res.body.should.be.an('object').to.have.property('user').with.lengthOf(1).should.be.an('object')
//         res.body.user[0].should.have.property('pokemons').with.lengthOf(1)
//         res.body.user[0].should.have.property('nickname')
//         res.body.user[0].should.have.property('gender')
//         res.body.user[0].should.have.property('createdAt')
//         res.body.user[0].should.have.property('updatedAt')
//         res.body.user[0].should.have.property('__v')
//         res.body.user[0].pokemons[0].should.have.property('_id')
//         res.body.user[0].pokemons[0].should.have.property('name')
//         res.body.user[0].pokemons[0].should.have.property('level')
//         res.body.user[0].pokemons[0].should.have.property('type')
//         res.should.have.status(200)
//         chai.request(server)
//         .delete('/api/user/'+res.body.user[0]._id)
//         .end(function(err, response){
//           response.should.have.status(201);
//           response.should.not.have.status(404);
//           response.body.should.be.a('object');
//           done();
//         })
//       })
//     })
//   })
// })
