const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/alert', alertController.createAlert);
router.get('/alerts', alertController.getAlerts);
router.patch('/alert/:id/resolve', alertController.resolveAlert);

module.exports = router;
