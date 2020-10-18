// Print a help message to the given channel
export const printHelp = async channel => {
  await channel.send(
    `
COMMANDS
---------

!help    - Display this prompt
!up      - Update streak by 1 day
!down    - Go back to the past by 1 day
!set NUM - Set streak to NUM days
!reset   - Reset streak back to 0 days
!stats   - Show your streak statistics
    `,
    { code: true }
  )
}
