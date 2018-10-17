const router = require('express').Router()
const { createOne, deleteOne } = require('../controllers/expense')

router.post('/', createOne)
router.delete('/:id', deleteOne)

<<<<<<< HEAD
=======
router.post('/create', createOne)
>>>>>>> Create Update Testing Expense CU

module.exports = router