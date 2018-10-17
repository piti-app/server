const router = require('express').Router()
const expense = require('./expense')
const zomato = require('./ZomatoRoute')
const recommendation = require('./RecommendationRoute')

router.use('/expense', expense)
router.use('/zomato',zomato)
router.use('/recommendation', recommendation)

router.get('/', function(req, res, next) {
  res.send('<h1>Halo</h1>')
})

module.exports = router