const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// POST /api/incidents — Create a new crisis incident (panic button)
router.post('/', (req, res) => {
  const { guestName, roomNumber, type, description, location } = req.body;

  if (!guestName || !type) {
    return res.status(400).json({ error: 'guestName and type are required' });
  }

  const incident = {
    id: uuidv4(),
    guestName,
    roomNumber: roomNumber || 'Unknown',
    type, // 'medical', 'fire', 'security', 'other'
    description: description || '',
    location: location || 'Unknown',
    status: 'active', // active, responding, resolved
    priority: type === 'medical' ? 'critical' : type === 'fire' ? 'high' : 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.incidents.unshift(incident);
  res.status(201).json(incident);
});

// GET /api/incidents — List all incidents
router.get('/', (req, res) => {
  const { status } = req.query;
  let results = store.incidents;

  if (status) {
    results = results.filter(i => i.status === status);
  }

  res.json(results);
});

// GET /api/incidents/:id — Get single incident
router.get('/:id', (req, res) => {
  const incident = store.incidents.find(i => i.id === req.params.id);
  if (!incident) return res.status(404).json({ error: 'Incident not found' });
  res.json(incident);
});

// PATCH /api/incidents/:id/status — Update incident status (staff only)
router.patch('/:id/status', requireRole('staff'), (req, res) => {
  const { status } = req.body;
  const validStatuses = ['active', 'responding', 'resolved'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Use: ' + validStatuses.join(', ') });
  }

  const incident = store.incidents.find(i => i.id === req.params.id);
  if (!incident) return res.status(404).json({ error: 'Incident not found' });

  incident.status = status;
  incident.updatedAt = new Date().toISOString();

  res.json(incident);
});

module.exports = router;
