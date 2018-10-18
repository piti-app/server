const router = require('express').Router();
const { getRecommendation,getNewRecommendation } = require('../controllers/RecommendationController');

router.post('/', getRecommendation);
router.post('/newRecommendation', getNewRecommendation);


module.exports = router;