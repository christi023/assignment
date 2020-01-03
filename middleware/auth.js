const config = require('config');
const jwt = require('jsonwebtoken');

// purpose of this function is to get token that sent either from react,postman, whatever front-end you use, it will send along a token!!!
function auth(req, res, next) {
  const token = req.header('x-auth-token'); // fetch from header

  // Check for token
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' }); // we say here user is unauthorized
  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
