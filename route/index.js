const router = require('express').Router()
const expense = require('./expense')
const zomato = require('./ZomatoRoute')
router.use('/expense', expense)
router.use('/zomato',zomato)

router.get('/', function(req, res, next) {
  res.send('<h1>Halo</h1>')
})

module.exports = router