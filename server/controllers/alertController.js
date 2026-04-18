const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

exports.createAlert = (req, res) => {
  const { type, location, severity, description } = req.body;
  
  if (!type || !location) {
    return res.status(400).json({ error: 'Type and location are required' });
  }

  const newAlert = {
    id: uuidv4(),
    type,
    location,
    severity: severity || 'High',
    description: description || '',
    status: 'Active',
    timestamp: new Date().toISOString()
  };

  store.incidents.push(newAlert);
  
  res.status(201).json({ message: 'Alert triggered successfully', alert: newAlert });
};

exports.resolveAlert = (req, res) => {
  const { id } = req.params;
  const alertIndex = store.incidents.findIndex(a => a.id === id);

  if (alertIndex === -1) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  store.incidents[alertIndex].status = 'Resolved';
  res.status(200).json({ message: 'Alert resolved successfully', alert: store.incidents[alertIndex] });
};

exports.getAlerts = (req, res) => {
  res.status(200).json(store.incidents);
};
