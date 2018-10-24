const router = require('express').Router()
const { deleteOne, createExpense, updateExpense,visionCreate  } = require('../controllers/expense')

router.post('/create/:email', createExpense)
router.post('/create/vision/:email', visionCreate, createExpense)
router.put('/update/:id', updateExpense)
router.delete('/:id', deleteOne)

module.exports = router