const router = require('express').Router();
const { getData } = require('../controllers/ZomatoController');

router.get('/', getData);

module.exports = router;