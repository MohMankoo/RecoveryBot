const { printHelp } = require('./help')
const {
  updateStreak,
  setStreak,
  resetStreak,
  showStreak
} = require('../streaks')

// Handle the provided message
const handleMessage = async message => {
  const userTag = message.author.tag
  const channel = message.channel

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
        printHelp(channel)
        break
      case 'up':
        updateStreak(userTag, channel)
        break
      case 'set':
        setStreak(userTag, commandList[0], channel)
        break
      case 'reset':
        resetStreak(userTag, channel)
        break
      case 'streak':
        showStreak(userTag, channel)
        break
      default:
        return
    }
  }
}

module.exports = { handleMessage }
