// Read .env file only outside production.
// dotenv allows us to read user-defined
// env variables from the `.env` file
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  dotenv.config()
}

// Server config
const PORT = process.env.PORT || 8000

// Database config
const DB_URL =
  process.env.DB_URL || 'mongodb://127.0.0.1:27017/recoveryBotDB'

// Sensitive data config
const BOT_TOKEN = process.env.BOT_TOKEN || ''

module.exports = {
  PORT,
  DB_URL,
  BOT_TOKEN
}
