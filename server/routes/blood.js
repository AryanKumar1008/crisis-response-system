const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

const router = express.Router();

// Blood type compatibility chart
const compatibilityMap = {
  'O-':  ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+':  ['O+', 'A+', 'B+', 'AB+'],
  'A-':  ['A-', 'A+', 'AB-', 'AB+'],
  'A+':  ['A+', 'AB+'],
  'B-':  ['B-', 'B+', 'AB-', 'AB+'],
  'B+':  ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

// Who can RECEIVE from whom (reverse lookup)
function getCompatibleDonorTypes(recipientType) {
  const compatible = [];
  for (const [donorType, canDonateTo] of Object.entries(compatibilityMap)) {
    if (canDonateTo.includes(recipientType)) {
      compatible.push(donorType);
    }
  }
  return compatible;
}

// POST /api/blood/request — Create a blood request
router.post('/request', (req, res) => {
  const { patientName, bloodType, location, urgency, units } = req.body;

  if (!patientName || !bloodType) {
    return res.status(400).json({ error: 'patientName and bloodType are required' });
  }

  const request = {
    id: uuidv4(),
    patientName,
    bloodType,
    location: location || 'Unknown',
    urgency: urgency || 'normal', // normal, urgent, critical
    units: units || 1,
    status: 'open', // open, matched, fulfilled
    createdAt: new Date().toISOString(),
  };

  store.bloodRequests.unshift(request);
  res.status(201).json(request);
});

// GET /api/blood/requests — List all blood requests
router.get('/requests', (req, res) => {
  res.json(store.bloodRequests);
});

// POST /api/blood/donors — Register a new donor
router.post('/donors', (req, res) => {
  const { name, bloodType, location, phone } = req.body;

  if (!name || !bloodType) {
    return res.status(400).json({ error: 'name and bloodType are required' });
  }

  const donor = {
    id: uuidv4(),
    name,
    bloodType,
    location: location || 'Unknown',
    phone: phone || 'N/A',
    available: true,
  };

  store.bloodDonors.push(donor);
  res.status(201).json(donor);
});

// GET /api/blood/donors — List all donors
router.get('/donors', (req, res) => {
  res.json(store.bloodDonors);
});

// GET /api/blood/match/:requestId — Find matching donors for a blood request
router.get('/match/:requestId', (req, res) => {
  const request = store.bloodRequests.find(r => r.id === req.params.requestId);
  if (!request) return res.status(404).json({ error: 'Blood request not found' });

  const compatibleTypes = getCompatibleDonorTypes(request.bloodType);
  const matchedDonors = store.bloodDonors.filter(
    d => d.available && compatibleTypes.includes(d.bloodType)
  );

  // Sort: same location first, then exact match first
  matchedDonors.sort((a, b) => {
    const aLocMatch = a.location === request.location ? -1 : 0;
    const bLocMatch = b.location === request.location ? -1 : 0;
    if (aLocMatch !== bLocMatch) return aLocMatch - bLocMatch;

    const aTypeMatch = a.bloodType === request.bloodType ? -1 : 0;
    const bTypeMatch = b.bloodType === request.bloodType ? -1 : 0;
    return aTypeMatch - bTypeMatch;
  });

  res.json({
    request,
    compatibleTypes,
    matchedDonors,
    totalMatches: matchedDonors.length,
  });
});

module.exports = router;
