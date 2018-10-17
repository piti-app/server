const router = require('express').Router()
const test = require('../controllers/user')

router.get('/:email', test.getUser)

module.exports = router