const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../users/usersModel');
const jwt_secrets = require('../config/secrets.js')

router.post('/register', async (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  try {
    user = await Users.add (user)
    res.status(201).json({message: `Welcome Aboard ${user.username}`})
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: err })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Users.findBy({ username }).first()
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user)
      res.status(200).json({
        message: `Welcome Back ${user.username}`,
        token: token
      })
    } else {
      res.status(401).json({ message: "Invalid Credentials" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: err
    })
  }
})

function genToken(user) {
  
  const payload = {
    userId: user.id,
    username: user.username,
    department: user.department

  }
  const secret = jwt_secrets.jwtSecret
  const options = { expiresIn: '1hr' }
  const token = jwt.sign(payload, secret, options)

  return token

}

module.exports = router;