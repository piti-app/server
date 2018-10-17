const router = require('express').Router()
const {getUser} = require('../controllers/user')

router.get('/:email', getUser)

module.exports = router