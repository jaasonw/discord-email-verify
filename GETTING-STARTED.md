# Getting Started

These instructions cover how to deploy the bot to your own account and set up a development environment

1. Create an application in the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a Discord server with a role for verification
3. Click on the Bot tab and create a bot token
4. Create a link to add the bot to the server, the bot needs **Manage Nicknames**, **Manage Roles**, and **Use Slash Commands**.
5. To test the email portion of the bot you can either use an **App Password** on your preferred email provider or [Ethereal Email](https://ethereal.email/). Either way, you’ll need an SMTP email and password
6. Create a fork and local clone of the repository and create a development branch
7. You’ll also need a database, [Supabase](https://supabase.com/) and [PlanetScale](https://planetscale.com/) provide free SQL databases
   1. To configure the database, set your DATABASE_URL environment variable and run `npx prisma db push`
8. Create a Netlify account (it might work on other cloud providers that support Next.js too with some configuration but I’ve only tested this on Netlify and the repo is configured to work with Netlify out of the box) and create a new site, linking it to the dev branch of your fork
9. Fill in the following environment variables in the deploy settings

   ```jsx
   DISCORD_TOKEN = "Your Discord application's public key";
   APPLICATION_ID = 'Your Discord application ID';
   BOT_TOKEN = 'Your Discord bot token';
   DATABASE_URL = 'Your database url';
   GUILD_ID = 'The ID of the server you plan to use';
   VERIFICATION_ROLE = 'The ID of the role you want to register';
   DEPLOYMENT_URL =
     'The URL you plan to deploy to (ex: https://acm-registration.netlify.app)';
   EMAIL = 'The SMTP email address you plan to use';
   EMAIL_PASSWORD = "The email's password";
   ```

10. Trigger a redeploy to set the new environment variables
11. Head back to the Discord Developer Portal and set the interaction endpoint of your app to (your deployment url)/api/interactions (ex: https://acm-registration.netlify.app/api/interactions)
12. Test the slash command in your local server

# Local Development

To test locally without pushing a commit every time to trigger a redeploy, I’d recommend using a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/#set-up-a-tunnel-locally-cli-setup) (you do not need a Cloudflare account for this)

1. Boot up a local development server with `npm run dev`
2. Create a tunnel with `cloudflared tunnel --url http://localhost:PORT_NUMBER`
3. Point your bot’s interaction endpoint url to the tunnel url
