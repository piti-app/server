const router = require('express').Router()
const expense = require('./expense')

router.use('/expense', expense)

router.get('/', function(req, res, next) {
  res.send('<h1>Halo</h1>')
})

module.exports = router