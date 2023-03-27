// Import the required modules
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});

require('dotenv').config();

console.log("----------------------------------")

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./workspace/commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./workspace/commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`Loaded ${command.name}`);
}

client.on('ready', () => {
    console.log("----------------------------------");
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("----------------------------------");
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
  
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    if (!client.commands.has(commandName)) return;
  
    const command = client.commands.get(commandName);
  
    try {
      command.execute(message, args, client);
    } catch (error) {
      console.error(error);
    }
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);