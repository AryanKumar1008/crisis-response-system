// In-memory data store — simple and hackathon-ready
// All data resets on server restart

const store = {
  incidents: [],
  bloodRequests: [],
  bloodDonors: [
    // Pre-seeded donors for demo purposes
    { id: 'd1', name: 'Amit Sharma', bloodType: 'O+', location: 'Floor 1', phone: '+91-9876543210', available: true },
    { id: 'd2', name: 'Priya Patel', bloodType: 'A+', location: 'Floor 2', phone: '+91-9876543211', available: true },
    { id: 'd3', name: 'Rahul Verma', bloodType: 'B+', location: 'Floor 1', phone: '+91-9876543212', available: true },
    { id: 'd4', name: 'Sneha Gupta', bloodType: 'O-', location: 'Floor 3', phone: '+91-9876543213', available: true },
    { id: 'd5', name: 'Karan Singh', bloodType: 'AB+', location: 'Floor 2', phone: '+91-9876543214', available: true },
    { id: 'd6', name: 'Meera Joshi', bloodType: 'A-', location: 'Lobby', phone: '+91-9876543215', available: true },
    { id: 'd7', name: 'Vikram Rao', bloodType: 'B-', location: 'Floor 1', phone: '+91-9876543216', available: true },
    { id: 'd8', name: 'Ananya Das', bloodType: 'O+', location: 'Floor 3', phone: '+91-9876543217', available: true },
  ],
};

module.exports = store;
