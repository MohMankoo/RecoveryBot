import { User } from '../db/models/user'
import { createUsers } from '../db'
import { roles } from './roles'

// Handle a change in a user's streak.
// The user should be the author of the provided message.
export const handleStreakChange = (message, streakAccessor) =>
{
  const query = { name: message.author.tag }
  User.findOne(query, function (error, user)
  {
    error || !user
      ? createUserNotFound(message, error)
      : updateStreak(user, message, streakAccessor)
  })
}

// Helper for handleStreakChange
const updateStreak = async (user, message, streakAccessor) =>
{
  const prevStreak = user.streak.days
  const streak = parseInt(streakAccessor(user), 10)

  const prevStreakString = `${prevStreak} day${prevStreak === 1 ? '' : 's'}`
  const streakString = `${streak} day${streak === 1 ? '' : 's'}`
  const successMsg = `updated streak from \`${prevStreakString} ----> ${streakString}\``

  if(streak >= 0)
  {
    user.setStreak(streak)
    saveUserDBData(user, message, successMsg)
    setMemberRoleByStreak(message.guild.member(message.author), streak)
  } else
  {
    await message.reply(`please use a valid streak. See \`!help\``)
  }
}

// Set the role for a Discord GuildMember
// member - Must be a GuildMember object
const setMemberRoleByStreak = async (member, streak) =>
{
  // Remove previous streak roles
  Object.values(roles).forEach(async roleID =>
  {
    if(member.roles.cache.has(roleID)) await member.roles.remove(roleID)
  })

  const roleID = getRoleByStreak(streak)
  await member.roles.add(roleID)
}

// Return the role ID appropriate
// for the given streak
const getRoleByStreak = streak =>
{
  // For streaks under a week, fetch directly
  // For streaks over a week, calculate on per-milestone basis
  if(streak <= 7) {
    return roles[streak]
  } else if(streak < 49) {
    // Example: For streak=20,
    // streakInWeeks=2, startDayOfStreakWeek=14
    const streakInWeeks = Math.trunc(streak / 7)
    const startDayOfStreakWeek = streakInWeeks * 7
    return roles[startDayOfStreakWeek]
  } else if(streak < 60) {
    return roles[49]
  } else if(streak < 90) {
    return roles[60]
  } else if(streak < 180) {
    return roles[90]
  } else if(streak < 270) {
    return roles[180]
  } else if(streak < 365) {
    return roles[270]
  } else {
    return roles[365]
  }
}

// Save a database user object's data
const saveUserDBData = (user, originalMsg, successMsg) =>
{
  user.save(async function (error)
  {
    error
      ? console.log(
        `DB: Error saving data for user: \n${user}\n` +
        `DB: Error received: \n${error}`
      )
      : await originalMsg.reply(successMsg)
  })
}

// Create a usser not found in the DB using the message object,
// and provide diagnostic information to console
// for the provided error.
export const createUserNotFound = async (message, error) =>
{
  console.log(
    `DB: Error finding user ${message.author.tag}: ${error}` +
    `DB: Attempting to add user ${message.author.tag}`
  )

  createUsers([{ name: message.author.tag }])
  await message.reply(
    `oops! \`${message.author.tag}\` didn't exist` +
    ` in our database before, try again now.`
  )
}
