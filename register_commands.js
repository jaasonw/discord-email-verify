const fs = require('node:fs');
const axios = require('axios');

// const commandFiles = fs.readdirSync('./lib/?commands.json');
require('dotenv').config();

(async () => {
  const file = fs.readFileSync('./lib/commands.json');
  const commands = JSON.parse(file);

  console.debug(commands);

  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
  };
  console.log(commands);
  const response = await axios.put(
    `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`,
    commands,
    config
  );

  console.log(response);
  if (response.status == 200) {
    console.info('Registered all commands');
  } else {
    console.error('Error registering commands');
    console.error(response.statusText);
  }
})().catch((e) => {
  console.log(e);
});
