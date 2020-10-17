import mongoose from 'mongoose'
import { User } from './models/user'
import { DB_URL } from '../config'

export const setupDB = async bot => {
  // Attempt connecting to DB
  console.log(`DB: Attempting connection.`)
  try {
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (error) {
    console.log(`DB: Could not reach the database.`)
    console.log(error)
  }

  // Log connection information
  const database = mongoose.connection
  database.on('open', () =>
    console.log(`DB: Connected successfully!`)
  )
  database.on('error', error => {
    console.log(`DB: Connection failed to establish to the database.`)
    console.log(error)
  })

  // Create user entries in database for those that dont exist
  const serverUsers = await bot.users
  const modelledUsers = []
  serverUsers.cache.forEach(user => {
    modelledUsers.push({ name: user.tag })
  })
  await createUsers(modelledUsers)
}

// users - A list of objects matching the User Schema
export const createUsers = async users => {
  // Wait for MongoDB to build unique indexes
  // for `username` field if necessary
  await User.init()

  // Create default user data.
  // Prevents creation if user data exists.
  console.log('DB: Creating user data...')
  users.forEach(user => {
    User.create(user, function (error) {
      error
        ? console.log(`DB: Skipping existing user ${user.name}`)
        : console.log(`DB: Data created for user ${user.name}`)
    })
  })
}
