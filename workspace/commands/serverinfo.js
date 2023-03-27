const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Displays various information about server',
  async execute(message) {
    const guild = message.guild;
    const owner = await guild.fetchOwner();
    const channels = await guild.channels.fetch();

    const embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setAuthor(guild.name, guild.iconURL() || 'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg')
      .setThumbnail(guild.iconURL() || 'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg')
      .addField('Server Creation', `<t:${Math.round(guild.createdTimestamp / 1000)}:f>`, false)
      .addField('Owner', `${owner}`, false)
      .addField('Total Members', `${guild.memberCount}`, false)
      .addField('Total Channels', `${channels.size}`, false)
      .setFooter(`Guild ID: ${guild.id}`);

    message.channel.send({ embeds: [embed] });
  }
};
