const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'covid',
  description: 'Get COVID-19 statistics for a country.',
  async execute(message, args) {
    if (!args.length) {
      return message.reply('Please provide a country.');
    }

    const country = args.join(' ');
    const url = `https://disease.sh/v2/countries/${country}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      const embed = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setTitle(`COVID-19 Statistics for ${data.country}`)
        .setDescription(`As of ${new Date(data.updated).toDateString()}`)
        .addFields(
          { name: 'Cases', value: data.cases.toLocaleString(), inline: true },
          { name: 'Deaths', value: data.deaths.toLocaleString(), inline: true },
          { name: 'Recovered', value: data.recovered.toLocaleString(), inline: true },
          { name: 'Active', value: data.active.toLocaleString(), inline: true },
          { name: 'Cases Today', value: data.todayCases.toLocaleString(), inline: true },
          { name: 'Deaths Today', value: data.todayDeaths.toLocaleString(), inline: true },
          { name: 'Tests', value: data.tests.toLocaleString(), inline: true },
        )
        .setFooter('Data provided by disease.sh');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while fetching the COVID-19 data.');
    }
  },
};
