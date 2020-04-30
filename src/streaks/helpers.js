const { User } = require('../db/models/user')
const { roles } = require('./roles')

// Handle a change in a user's streak.
// The user should be the author of the provided message.
const handleStreakChange = (message, streakAccessor) => {
  const query = { name: message.author.tag }

  User.findOne(query, async function (error, user) {
    if (error || !user) {
      handleDBError(error)
    } else {
      const streak = parseInt(streakAccessor(user), 10)
      const streakString = `${streak} day${streak === 1 ? '' : 's'}`
      const successMsg = `Set streak to \`${streakString}\` for ${message.author.tag}`

      if (streak >= 0) {
        user.setStreak(streak)
        saveUserDBData(user, message.channel, successMsg)
        setMemberRole(message.guild.member(message.author), streak)
      } else {
        await message.channel.send(`Please use a valid streak.`)
      }
    }
  })
}

// Set the role for a Discord GuildMember
// member - Must be a GuildMember object
const setMemberRole = async (member, streak) => {
  // Remove previous streak roles
  Object.values(roles).forEach(async roleID => {
    if (member.roles.cache.has(roleID))
      await member.roles.remove(roleID)
  })

  const roleID = getRoleByStreak(streak)
  await member.roles.add(roleID)
}

// Return the role ID appropriate
// for the given streak
const getRoleByStreak = streak => {
  // For streaks under a week, fetch directly
  // For streaks over a week, calculate on per-week basis
  if (streak <= 7) {
    return roles[streak]
  } else {
    // Example: For streak=20,
    // streakInWeeks=2, startDayOfStreakWeek=14
    const streakInWeeks = Math.trunc(streak / 7)
    const startDayOfStreakWeek = streakInWeeks * 7
    return roles[startDayOfStreakWeek]
  }
}

// Save a database user object's data
const saveUserDBData = (user, discordChannel, discordMsg) => {
  user.save(async function (error) {
    error
      ? handleDBError(error)
      : await discordChannel.send(discordMsg)
  })
}

const handleDBError = error => console.log(`DB: ${error}`)

module.exports = {
  handleStreakChange,
  handleDBError
}
