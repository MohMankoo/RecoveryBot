// Print a help message to the given channel
export const printHelp = async channel => {
  await channel.send(
    `
===========
 COMMANDS
===========

  !help - Display this prompt

  !up      - Update streak by 1 day
  !set NUM - Set streak to NUM days
  !reset   - Reset streak back to 0 days
  !streak  - Show exact length of your streak
    `,
    { code: true }
  )
}
