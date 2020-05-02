const { Client } = require('discord.js')
const { handleMessage } = require('../messages')
const { setupDB, createUsers } = require('../db')
const { BOT_TOKEN } = require('../config')

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
    console.log(`DISCORD: New member added: ${member.user.tag}`)
    createUsers([{ name: member.user.tag }])
  })
}

// Return the bot instance as well as a means of starting it
module.exports = { startBot, bot }
