# Recovery Bot

A Discord bot that helps with recovery from addictive behaviour by tracking
users' streaks in achieving their goals.

## Getting Started

To build the files, first
[install yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable),
then run the following command in the project root to install dependencies:
`yarn`

Create a `.env` file in the root directory to store sensitive information
such as the bot token. The following are required:

- `BOT_TOKEN` - The bot token is used to authenticate a bot into your
  server. If you are the owner of your bot, you can access it from the
  [Discord applications page](https://discordapp.com/developers/applications/).
- `DB_URL` - This app uses MongoDB. Set the URL to your mongodb server
  here.

```sh
BOT_TOKEN=YOUR-TOKEN....
DB_URL="mongodb://...."
```

To start the bot, run the `src/index.js`. You can either manually run node
or allow yarn to do so:

```sh
node src
# OR:
yarn run start
```

## Configuration

The configuration variables for the application and the reading of the
`.env` file is processed at `src/config.js`. To create custom
configurations, simply set the variables defined there in your `.env` file.

## Heroku

For Heroku deployment, this bot does not require a `web` process, but
Heroku will create one by default anyway. In order to circumvent this, run
the following:

```sh
heroku ps:scale web=0
heroku ps:scale worker=1
```

- To check the status of the app, run `heroku ps`.
- To check the logs of the app, run `heroku logs --tail`
- To disable app, set `heroku ps:scale worker=0`
- To re-enable app, set `heroku ps:scale worker=1`

## Reference

- See the [Discord NodeJS library](https://discord.js.org/#/)
- See the
  [MongoDB Docs](https://docs.mongodb.com/manual/tutorial/getting-started/)
- See the [mongoose Docs](https://mongoosejs.com/docs/index.html)
