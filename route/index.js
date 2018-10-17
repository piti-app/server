const router = require('express').Router()
const expense = require('./expense')
const zomato = require('./ZomatoRoute')
const user = require('./user')

router.use('/expense', expense)
router.use('/zomato',zomato)
router.use('/user',user)

router.get('/', function(req, res, next) {
  res.send('<h1>Halo</h1>')
})

module.exports = router