// workspace/commands/reload.js
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'reload',
  description: 'Reload all commands',
  execute(message) {
    const allowedUserId = '708991550767628328';

    if (message.author.id !== allowedUserId) {
      const noPermissionEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('You do not have permission to use this command.');
      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    const commandFiles = fs
      .readdirSync('./workspace/commands')
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      delete require.cache[require.resolve(`./${file}`)];
      const command = require(`./${file}`);
      message.client.commands.set(command.name, command);
    }

    const reloadSuccessEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('Commands Reloaded')
      .setDescription('All commands have been successfully reloaded.')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 32 }));

    message.channel.send({ embeds: [reloadSuccessEmbed] });
  },
};