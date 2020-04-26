const { User } = require('../db/models/user')

const handleStreakChange = (userTag, streakAccessor, channel) => {
  const query = { name: userTag }

  User.findOne(query, async function (error, user) {
    if (error || !user) {
      handleDBError(error)
    } else {
      const streak = parseInt(streakAccessor(user), 10)

      if (streak && streak >= 0) {
        user.setStreak(streak)
        saveUserData(
          user,
          channel,
          `Set streak to ${streak} days for ${userTag}`
        )
      } else {
        await channel.send(`Please use a valid streak.`)
      }
    }
  })
}

const saveUserData = (user, discordChannel, discordMsg) => {
  user.save(async function (error) {
    error ? handleDBError(error) : await discordChannel.send(discordMsg)
  })
}

const handleDBError = error => console.log(`DB: ${error}`)

module.exports = {
  handleStreakChange,
  handleDBError
}
