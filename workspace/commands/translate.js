const translate = require('@iamtraction/google-translate');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'translate',
  description: 'Translates text to English',
  usage: '<language code> <text>',
  async execute(message, args) {
    const langCode = args[0];
    const text = args.slice(1).join(' ');

    if (!langCode) return message.channel.send('Please provide a language code and the text to translate.');
    if (!text) return message.channel.send('Please provide the text to translate.');

    try {
      const translation = await translate(text, { to: 'en', from: langCode });
      const embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle('Translation')
        .setDescription(`**Input Text:** ${text}\n**Translated Text:** ${translation.text}`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while translating the text.');
    }
  }
};