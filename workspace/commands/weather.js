const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'weather',
  description: 'Get the current weather for a location.',
  async execute(message, args) {
    if (!args.length) {
      return message.reply('Please provide a location.');
    }

    const query = args.join(' ');
    const api_key = process.env.WEATHERSTACK_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Weather for ${data.location.name}`)
        .setDescription(data.current.weather_descriptions[0])
        .addFields(
          { name: 'Temperature', value: `${data.current.temperature}°C`, inline: true },
          { name: 'Feels Like', value: `${data.current.feelslike}°C`, inline: true },
          { name: 'Humidity', value: `${data.current.humidity}%`, inline: true },
        )
        .setFooter('Weather data provided by weatherstack.com');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.reply('An error occurred while fetching the weather data.');
    }
  },
};