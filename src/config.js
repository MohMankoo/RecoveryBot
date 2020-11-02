// Read .env file only outside production.
// dotenv allows us to read user-defined
// env variables from the `.env` file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Server info
const PORT = process.env.PORT || 8000
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/recoveryBotDB'

// Sensitive data
const BOT_TOKEN = process.env.BOT_TOKEN || ''

// Other
// GENERAL_CHANNEL is used for server greetings
const GENERAL_CHANNEL_ID = process.env.GENERAL_CHANNEL_ID || '0'
const GREETING_MSG = process.env.GREETING_MSG || 'Welcome!'

module.exports = {
  PORT,
  DB_URL,
  BOT_TOKEN,
  GENERAL_CHANNEL_ID,
  GREETING_MSG
}
