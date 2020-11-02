const { Client } = require('discord.js')
const { handleMessage } = require('../messages')
const { setupDB, createUsers } = require('../db')
const { BOT_TOKEN, GENERAL_CHANNEL_ID, GREETING_MSG } = require('../config')

// Create a Discord client for our bot
const bot = new Client()

const startBot = async () => {
  configureBot()
  await bot.login(BOT_TOKEN)
}

// Configure the bot to respond to messages
const configureBot = () => {
  bot.on('ready', () => {
    console.log(`DISCORD: ${bot.user.tag || 'Bot'} is now connected`)

    bot.user.setActivity('!help')
    setupDB(bot)
  })

  bot.on('message', async message => await handleMessage(message))

  bot.on('guildMemberAdd', member => {
    const memberTag = member.user.tag
    console.log(`DISCORD: New member added: ${memberTag}`)

    createUsers([{ name: memberTag }])
    member.guild.channels.cache
      .find(channel => channel.id === GENERAL_CHANNEL_ID)
      .send(`Welcome ${member}! ${GREETING_MSG}`)
  })
}

// Return the bot instance as well as a means of starting it
module.exports = { startBot, bot }
