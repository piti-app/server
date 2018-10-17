const router = require('express').Router()
const controller = require('../controllers/user')

router.get('/:email', controller.getUser)
router.post('/', controller.registerUser)
router.put('/:email', controller.updateUser)

module.exports = router