const router = require('express').Router();
const { getRecommendation } = require('../controllers/RecommendationController');

router.post('/', getRecommendation);

module.exports = router;