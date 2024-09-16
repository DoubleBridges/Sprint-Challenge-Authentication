const Users = require('./usersModel')
const db = require('../database/dbConfig')

const newUser = {
  username: "SomeDude",
  password: "somepassword"
}

const anotherUser = {
  username: "SomeOtherDude",
  password: "someOtherpassword"
}


describe('users model', () => {
  describe('add', () => {
    it('should add new user to the db', async () => {
      await Users.add(newUser)
      const user = await db('users') 
      expect(user).toHaveLength(1)
    })

    it('should return the user added', async () => {
      const user = await Users.add(anotherUser)
      expect(user.username).toEqual(anotherUser.username)
      expect(user).toHaveProperty('password', anotherUser.password)
    })
  })

  describe('findById', () => {
    it('should return the user requested by user ID', async () => {
      const user = await Users.add(newUser)
      const returnedUser = await Users.findById(user.id)
      expect(returnedUser.username).toEqual(newUser.username)
      expect(returnedUser).toHaveProperty('password', newUser.password)
    })
  })
  
  describe('find', () => {
    it('should return an array of users', async () => {
      await Users.add(newUser)
      const userArray = await Users.find()
      expect(typeof (userArray)).toEqual(typeof ([]))
      expect(userArray.length).toEqual(1)
    })
  })
  
  describe('findBy', () => {
    it('should return the user requested by filter value', async () => {
      const user = await Users.add(newUser)
      const foundUser = await Users.findBy(user).first()
      expect(foundUser.password).toEqual(newUser.password)
      expect(foundUser).toHaveProperty('username', newUser.username)
    })
  })

  beforeEach(async () => {
    await db('users').truncate()
  })
})