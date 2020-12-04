/**
 * Create a statistics message to be sent by the bot for a user
 * opts - An object containing different user attributes to use such as:
 * -> user
 * -> streak
 * -> lastModified
 * -> longestStreak
 * -> recoveringSince
 */
exports.createUserStatsMsg = opts => `
${opts.user} Stats

Streak:           ${opts.streak}
Last update:      ${opts.lastModified}
Longest streak:   ${opts.longestStreak}
Recovering since: ${opts.recoveringSince}
`
