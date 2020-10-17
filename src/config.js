// Read .env file only outside production.
// dotenv allows us to read user-defined
// env variables from the `.env` file
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

// Server config
exports.PORT = process.env.PORT || 8000

// Database config
exports.DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/recoveryBotDB'

// Sensitive data config
exports.BOT_TOKEN = process.env.BOT_TOKEN || ''
