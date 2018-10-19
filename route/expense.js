const router = require('express').Router()
const { deleteOne, createExpense, updateExpense  } = require('../controllers/expense')

router.post('/create/:id', createExpense)
router.put('/update/:id', updateExpense)
router.delete('/:id', deleteOne)

module.exports = router