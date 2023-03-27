const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'color',
  description: 'Provide a hexadecimal color code to display',
  execute(message, args) {
    const colorCode = args[0];
    // Check if user provided a valid hex code
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCode)) {
      return message.reply('Please provide a valid hexadecimal color code.');
    }

    // Create an embed with the color preview
    const colorEmbed = new MessageEmbed()
      .setColor(colorCode)
      .setTitle(`Hex Code: ${colorCode}`);

    message.channel.send({ embeds: [colorEmbed] });
  },
};
