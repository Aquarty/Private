const https = require('https');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'nsfw',
  description: 'Sends a random hentai image',
  async execute(message, args) {
    // Check if the channel is NSFW
    if (!message.channel.nsfw) {
      return message.reply('❌ This command can only be used in NSFW channels!');
    }

    // Get the type of image from the command arguments (if provided)
    const type = args[0] ? args[0].toLowerCase() : 'hentai';

    // Check if the type is valid
    if (!['hentai', 'anal', 'hnal', 'ass', 'hass', 'boobs', 'hboobs', 'pgif', 'pussy'].includes(type)) {
      return message.reply('❌ Invalid image type! Available types: hentai, anal, hanal, ass, hass, boobs, hboobs, pgif, pussy');
    }

    https.get(`https://nekobot.xyz/api/image?type=${type}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(data);
        const embed = new MessageEmbed()
          .setTitle(`NSFW (${type})`)
          .setColor(response.color)
          .setImage(response.message)
          .setFooter(`Version: ${response.version}`);
        message.channel.send({ embeds: [embed] });
      });
    }).on('error', (err) => {
      console.error(err);
    });
  },
};