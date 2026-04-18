const store = require('../data/store');
const { v4: uuidv4 } = require('uuid');

exports.createBloodRequest = (req, res) => {
  const { bloodType, urgency, location } = req.body;

  if (!bloodType || !urgency || !location) {
    return res.status(400).json({ error: 'Blood type, urgency, and location are mandatory' });
  }

  const newRequest = {
    id: uuidv4(),
    bloodType,
    urgency,
    location,
    status: 'Active',
    timestamp: new Date().toISOString()
  };

  store.bloodRequests.push(newRequest);
  
  res.status(201).json({ message: 'Blood request created successfully', request: newRequest });
};

exports.getBloodRequests = (req, res) => {
  const populatedRequests = store.bloodRequests.map(request => {
    const matchedDonors = store.bloodDonors.filter(donor => donor.bloodType === request.bloodType && donor.available);
    return { ...request, matchedDonors };
  });

  res.status(200).json(populatedRequests);
};
