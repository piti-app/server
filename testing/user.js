const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should();
const User = require('../models/User')
const Expense = require('../models/Expense')
const server = require('../app')

describe('trainers GET', function () {
  let id_Pokemon = ''
  beforeEach(function (done) {
    const expense = new Expense({
        date: new Date(),
        price: Number,
        type: String,
        description: String,
        user: { type: Schema.Types.ObjectId, ref: 'User'},
    })
    pokemon.save((err,res) => {
      id_Pokemon = res._id
      const newTrainer = new Trainer({
        nickname: "Ash Ketchum",
        gender: "Male",
        pokemons: [id_Pokemon]
      })
      newTrainer.save((err,res) => {
        done()
      })
    })
  })

  afterEach(function (done) {
    Trainer.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Pokemon.remove({}, function (err) {
      done()
    })
  })

  describe('get all Trainers', function () {
    it('it should get all Trainers data ', function (done) {
      chai.request(server)
      .get('/api/trainers')
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('trainers').with.lengthOf(1).should.be.an('object')
        res.body.trainers[0].should.have.property('pokemons').with.lengthOf(1)
        res.body.trainers[0].should.have.property('nickname')
        res.body.trainers[0].should.have.property('gender')
        res.body.trainers[0].should.have.property('createdAt')
        res.body.trainers[0].should.have.property('updatedAt')
        res.body.trainers[0].should.have.property('__v')
        res.body.trainers[0].pokemons[0].should.have.property('_id')
        res.body.trainers[0].pokemons[0].should.have.property('name')
        res.body.trainers[0].pokemons[0].should.have.property('level')
        res.body.trainers[0].pokemons[0].should.have.property('type')
        res.should.have.status(200)
        done()
      })
    })
  })
})

describe('trainer POST', function () {
  let id_pokemon = ''
  beforeEach(function (done) {
    const pokemon = new Pokemon({
      name: "Charmender",
      level: 1,
      type: "fire",
    })
    pokemon.save((err,res) => {
      id_pokemon = res._id
      done()
    })
  })
  afterEach(function (done) {
    Trainer.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Pokemon.remove({}, function (err) {
      done()
    })
  })

  describe('post one Trainers', function () {
    it('it should post one Trainer data ', function (done) {
      chai.request(server)
      .post('/api/trainers')
      .send({
        nickname: "Ash Ketchum",
        gender: "Male",
        pokemons: [id_pokemon]
      })
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('trainer')
        res.body.trainer.should.have.property('pokemons').with.lengthOf(1)
        res.body.trainer.should.have.property('nickname')
        res.body.trainer.should.have.property('gender')
        res.body.trainer.should.have.property('createdAt')
        res.body.trainer.should.have.property('updatedAt')
        res.body.trainer.should.have.property('__v')
        res.should.have.status(201)
        done()
      })
    })
  })
})

describe('trainer UPDATE', function () {
  let id = ''
  let id_pokemon = ''
  beforeEach(function (done) {
    const pokemon = new Pokemon({
      name: "Charmender",
      level: 1,
      type: "fire",
    })
    pokemon.save((err,res) => {
      id_pokemon = res._id
      const newTrainer = new Trainer({
        nickname: "Ash Ketchum",
        gender: "Male",
        pokemons: [id_pokemon]
      })
      newTrainer.save((err,res) => {
        id = res._id
        done()
      })
    })
  })

  afterEach(function (done) {
    Trainer.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Pokemon.remove({}, function (err) {
      done()
    })
  })

  describe('update one Trainer', function () {
    it('it should update one Trainer data ', function (done) {
      chai.request(server)
      .put('/api/trainers/'+id)
      .send({
        nickname: "Brock"
      })
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('trainer')
        res.body.trainer.should.have.property('pokemons').with.lengthOf(1)
        res.body.trainer.should.have.property('nickname')
        res.body.trainer.should.have.property('gender')
        res.body.trainer.should.have.property('createdAt')
        res.body.trainer.should.have.property('updatedAt')
        res.body.trainer.should.have.property('__v')
        res.body.trainer.nickname.should.equal('Brock')
        res.should.have.status(201)
        done()
      })
    })
  })
})

describe('trainer DELETE', function () {
  let id = ''
  let id_pokemon = ''
  beforeEach(function (done) {
    const pokemon = new Pokemon({
      name: "Charmender",
      level: 1,
      type: "fire",
    })
    pokemon.save((err,res) => {
      id_pokemon = res._id
      done()
    })
  })
  beforeEach(function (done) {
    const newTrainer = new Trainer({
      nickname: "Ash Ketchum",
      gender: "Male",
      pokemons: [id_pokemon]
    })
    newTrainer.save((err,res) => {
      id = res._id
      done()
    })
  })

  afterEach(function (done) {
    Trainer.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Pokemon.remove({}, function (err) {
      done()
    })
  })

  describe('delete one Trainers', function () {
    it('it should delete one Trainers data ', function (done) {
      chai.request(server)
      .get('/api/trainers')
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('trainers').with.lengthOf(1).should.be.an('object')
        res.body.trainers[0].should.have.property('pokemons').with.lengthOf(1)
        res.body.trainers[0].should.have.property('nickname')
        res.body.trainers[0].should.have.property('gender')
        res.body.trainers[0].should.have.property('createdAt')
        res.body.trainers[0].should.have.property('updatedAt')
        res.body.trainers[0].should.have.property('__v')
        res.body.trainers[0].pokemons[0].should.have.property('_id')
        res.body.trainers[0].pokemons[0].should.have.property('name')
        res.body.trainers[0].pokemons[0].should.have.property('level')
        res.body.trainers[0].pokemons[0].should.have.property('type')
        res.should.have.status(200)
        chai.request(server)
        .delete('/api/trainers/'+res.body.trainers[0]._id)
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
