const router = require('express').Router()
const { createOne } = require('../controllers/expense')

router.post('/', createOne)

module.exports = router