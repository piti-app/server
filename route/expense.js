const router = require('express').Router()
const { createOne, deleteOne } = require('../controllers/expense')

router.post('/', createOne)
router.delete('/:id', deleteOne)

module.exports = router