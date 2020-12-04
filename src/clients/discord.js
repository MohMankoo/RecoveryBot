const { Client } = require('discord.js')
const { handleMessage } = require('../messages')
const { setupDB, createUsers } = require('../db')
const config = require('../config')

// Create a Discord client for our bot
const bot = new Client()

const startBot = async () => {
  configureBot()
  await bot.login(config.BOT_TOKEN)
}

// Configure the bot to respond to messages
const configureBot = () => {
  bot.on('ready', () => {
    // Do initialization routine
    console.log(`DISCORD: ${bot.user.tag || 'Bot'} is now connected`)
    bot.user.setActivity('!help')
    setupDB(bot)

    // Schedule disboard if needed; bumps every 121 minutes
    if (config.USE_DISBOARD_BUMP && config.DISBOARD_CHANNEL_ID) {
      setInterval(bumpDisboard, 7260000)
    }
  })

  bot.on('message', async message => await handleMessage(message))

  bot.on('guildMemberAdd', member => {
    if (!config.GENERAL_CHANNEL_ID) return
    const memberTag = member.user.tag
    console.log(`DISCORD: New member added: ${memberTag}`)

    createUsers([{ name: memberTag }])
    bot.channels.cache
      .find(channel => channel.id === config.GENERAL_CHANNEL_ID)
      .send(`Welcome ${member}! ${config.GREETING_MSG}`)
  })
}

const bumpDisboard = () =>
  bot.channels.cache
    .find(channel => channel.id === config.DISBOARD_CHANNEL_ID)
    .send(`!d bump`)

// Return the bot instance as well as a means of starting it
module.exports = { startBot, bot }
