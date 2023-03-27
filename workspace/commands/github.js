const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'github',
  description: 'Get GitHub statistics of a user.',
  async execute(message, args) {
    if (!args.length) {
      return message.reply('Please provide a GitHub username.');
    }

    const target = args[0];
    const url = `https://api.github.com/users/${target}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      const embed = new Discord.MessageEmbed()
        .setColor('#211F1F')
        .setTitle(`${data.name || data.login}'s GitHub Statistics`)
        .setDescription(data.bio || 'No bio provided.')
        .setThumbnail(data.avatar_url)
        .addFields(
          { name: 'Followers', value: data.followers.toLocaleString(), inline: true },
          { name: 'Following', value: data.following.toLocaleString(), inline: true },
          { name: 'Public Repositories', value: data.public_repos.toLocaleString(), inline: true },
          { name: 'Public Gists', value: data.public_gists.toLocaleString(), inline: true },
          { name: 'Location', value: data.location || 'Not specified.', inline: true },
          { name: 'Twitter', value: data.twitter_username || 'Not specified.', inline: true },
          { name: 'Website', value: data.blog || 'Not specified.', inline: true },
        )
        .setFooter('Data provided by the GitHub API');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while fetching the GitHub data.');
    }
  },
};