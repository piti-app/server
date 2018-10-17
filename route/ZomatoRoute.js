const router = require('express').Router();
const { getData } = require('../controllers/ZomatoController');

router.post('/', getData);

module.exports = router;