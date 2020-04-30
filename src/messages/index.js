const { printHelp } = require('./help')
const {
  updateStreak,
  setStreak,
  resetStreak,
  showStreak
} = require('../streaks')

// Handle the provided message
const handleMessage = async message => {
  // If the message is a bot command, perform some functionality
  if (message.content.charAt(0) === '!') {
    // The message as an array
    const messageBlocks = message.content.split(' ')
    // Omit the '!' in command
    const command = messageBlocks[0].substring(1)
    // Keywords following command
    const commandList = messageBlocks.slice(1)

    switch (command.toLowerCase()) {
      case 'help':
        printHelp(message.channel)
        break
      case 'up':
        updateStreak(message)
        break
      case 'set':
        setStreak(message, commandList[0])
        break
      case 'reset':
        resetStreak(message)
        break
      case 'streak':
        showStreak(message)
        break
      default:
        return
    }
  }
}

module.exports = { handleMessage }
