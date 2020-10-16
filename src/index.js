const http = require('http')
const { startBot } = require('./clients/discord')
const { PORT } = require('./config')

// Setup server for heroku to host
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello! This is the RecoveryBot server.')
})

// Start the server
server.listen(PORT, () => {
  console.log(`NODE: Server running on port ${PORT}`)
})

// Start our discord bot using the Discord client
// All configuration is done by the clients/discord.js file
startBot()
