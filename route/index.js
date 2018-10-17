const router = require('express').Router()
const expense = require('./expense')
const zomato = require('./ZomatoRoute')
<<<<<<< HEAD
const user = require('./user')

// router.use('/expense', expense)
router.use('/zomato',zomato)
router.use('/user',user)
=======
>>>>>>> 2eeff5afe58c443ecd34c7d8982fa2dc2e285c07
const recommendation = require('./RecommendationRoute')

router.use('/expense', expense)
router.use('/zomato',zomato)
router.use('/recommendation', recommendation)

router.get('/', function(req, res, next) {
  res.send('<h1>Halo</h1>')
})

module.exports = router