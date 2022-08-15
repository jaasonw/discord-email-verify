import cmd
import json
import logging
import os
import requests

from dotenv import load_dotenv
load_dotenv()

url = f'https://discord.com/api/v8/applications/{os.getenv("APPLICATION_ID")}/guilds/{os.getenv("DEV_GUILD_ID")}/commands'

logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
logging.debug(f'APPLICATION_ID: {os.getenv("APPLICATION_ID")}')


commands = ""
with open("./lib/commands.json") as cmdfile:
    commands = json.loads(cmdfile.read())

logging.debug(commands)
logging.debug(commands)

response = requests.put(
    url=url,
    headers={
        "Content-Type": "application/json",
        "Authorization": f'Bot {os.getenv("BOT_TOKEN")}',
    },
    json=commands
)

if response.status_code == 200:
    logging.info("Registered all commands")
else:
    logging.error("Error registering commands")
    logging.error(response.text)
