// Basic role-checking middleware
// In a real app, this would verify JWT tokens etc.
// For hackathon MVP, we trust the x-role header

function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.headers['x-role'] || 'guest';
    if (roles.includes(role)) {
      req.userRole = role;
      return next();
    }
    return res.status(403).json({ error: 'Access denied. Required role: ' + roles.join(' or ') });
  };
}

module.exports = { requireRole };
