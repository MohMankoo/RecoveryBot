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
const GENERAL_CHANNEL_ID = process.env.GENERAL_CHANNEL_ID || ''
const GREETING_MSG = process.env.GREETING_MSG || 'Welcome!'

// DISBOARD_CHANNEL to use for bumping server on Disboard.org
const USE_DISBOARD_BUMP = process.env.USE_DISBOARD_BUMP || false
const DISBOARD_CHANNEL_ID =
  process.env.DISBOARD_CHANNEL_ID || GENERAL_CHANNEL_ID

module.exports = {
  PORT,
  DB_URL,
  BOT_TOKEN,
  GENERAL_CHANNEL_ID,
  GREETING_MSG,
  USE_DISBOARD_BUMP,
  DISBOARD_CHANNEL_ID
}
