/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')
const jwt_secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  let token = req.headers.authorization
  if (token) {
    jwt.verify(token, jwt_secrets.jwtSecret, (err, decodedToken) => {
      req.decodedJwt = decodedToken
      next()
      })
  } else {
    res.status(400).json({ nope: 'nope' })
  }
}