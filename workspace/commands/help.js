const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Displays all available commands and their details.',
  execute(message, args) {
    const helpEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Command List')
      .addFields(
        { name: '!help', value: 'Displays all available commands and their details.' },
        { name: '!ban <@user>', value: 'Ban the user you tagged or their ID. [Bot permissions must be higher than users.]' },
        { name: '!kick <@user>', value: 'Kick the user you tagged or their ID. [Bot permissions must be higher than users.]' },
        { name: '!mute <@user>', value: 'Add Role Muted to user you tag. [You must have a Muted role in the server.]' },
        { name: '!unmute <@user>', value: 'Delete Role Muted to user you tag. [The user you select must have Role Muted.]' },
        { name: '!avatar <@user>', value: 'Show the profile of the user you tagged.' },
        { name: '!nsfw <type>', value: 'Available types: hentai, anal, hanal, ass, hass, boobs, hboobs, pgif, pussy' },
        { name: '!hello', value: 'Check if the command works normally.' },
        { name: '!status', value: 'Check how much CPU and RAM % of the bot uses, API Latency, OS, number of Discord servers the bot is on, Uptime.' },
      )
      .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL());

    message.channel.send({ embeds: [helpEmbed] });
  },
};