const { MessageEmbed } = require('discord.js');
const Anilist = require('anilist-node');
const anilist = new Anilist();

module.exports = {
  name: 'animesearch',
  description: 'Search for an anime on Anilist',
  async execute(message, args) {
    try {
      if (!args || !args.length) {
        return message.channel.send('Please provide an anime to search for.');
      }

      const anime = await anilist.search('anime', args.join(' '));

      const title = anime?.media[0]?.title?.romaji ?? 'Unknown Title';
      const siteUrl = anime?.media[0]?.siteUrl ?? '';

      let description = anime?.media[0]?.description ?? '';
      if (description.length > 2048) {
        description = description.slice(0, 2045) + '...';
      }

      const coverImageUrl = anime?.media[0]?.coverImage?.large ?? '';

      const format = anime.media[0].format ? anime.media[0].format : 'N/A';
      const episodes = anime.media[0].episodes ? anime.media[0].episodes : 'N/A';
      const status = anime.media[0].status ? anime.media[0].status : 'N/A';
      const score = anime.media[0].meanScore ? anime.media[0].meanScore : 'N/A';
      const genres = anime.media[0].genres ? anime.media[0].genres.join(', ') : 'N/A';
      const tags = anime.media[0].tags ? anime.media[0].tags.map((tag) => tag.name).join(', ') : 'N/A';
      const id = anime?.media[0]?.id ?? 'N/A';

      const fields = [
        { name: 'Type', value: format, inline: true },
        { name: 'Episodes', value: episodes, inline: true },
        { name: 'Status', value: status, inline: true },
        { name: 'Score', value: score, inline: true },
        { name: 'Genres', value: genres, inline: true },
        { name: 'Tags', value: tags, inline: true },
      ];

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(title)
        .setURL(siteUrl)
        .setDescription(description)
        .setThumbnail(coverImageUrl)
        .addFields(fields)
        .setFooter(`ID: ${id}`);

      const link = `https://anilist.co/anime/${id}`;
      message.channel.send(`Link: ${link}`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while searching for the anime.');
    }
  },
};