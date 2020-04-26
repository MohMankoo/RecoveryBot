const moment = require('moment')
const { User } = require('../db/models/user')
const { handleStreakChange, handleDBError } = require('./helpers')

const updateStreak = (userTag, channel) =>
  handleStreakChange(userTag, user => user.streak.days + 1, channel)

const setStreak = (userTag, streak, channel) =>
  handleStreakChange(userTag, user => streak, channel)

const resetStreak = (userTag, channel) =>
  handleStreakChange(userTag, user => 0, channel)

const showStreak = (userTag, channel) => {
  const query = { name: userTag }

  User.findOne(query, async function (error, user) {
    if (error || !user) {
      handleDBError(error)
    } else {
      const streak = user.streak.days
      const lastModified = moment(user.streak.lastModified).format(
        'MMMM Do YYYY, h:mm:ss a Z'
      )

      await channel.send(
        `${userTag} is at ${streak} days. Last updated ${lastModified}`
      )
    }
  })
}

module.exports = {
  updateStreak,
  setStreak,
  resetStreak,
  showStreak
}
