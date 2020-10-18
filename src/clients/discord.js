import { Client } from 'discord.js'
import { handleMessage } from '../messages'
import { setupDB, createUsers } from '../db'
import { BOT_TOKEN } from '../config'

// Create a Discord client for our bot
export const bot = new Client()

bot.on('ready', () =>
{
  console.log(`DISCORD: ${bot.user.tag || 'Bot'} is now connected`)

  bot.user.setActivity('!help')
  setupDB(bot)
})

bot.on('message', async message => await handleMessage(message))

bot.on('guildMemberAdd', member =>
{
  console.log(`DISCORD: New member added: ${member.user.tag}`)
  createUsers([{ name: member.user.tag }])
})

export const startBot = () => bot.login(BOT_TOKEN)
