const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'hello',
  description: 'Hello to User',
  execute(message, args) {
    const helpEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Hello Command')
      .addFields(
        { name: 'Hello', value: 'Hello Your Mom' },
      )
      .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL());

    message.channel.send({ embeds: [helpEmbed] });
  },
};