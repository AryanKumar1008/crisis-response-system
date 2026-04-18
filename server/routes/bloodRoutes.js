const express = require('express');
const router = express.Router();
const bloodController = require('../controllers/bloodController');

router.post('/blood-request', bloodController.createBloodRequest);
router.get('/blood-requests', bloodController.getBloodRequests);

module.exports = router;
