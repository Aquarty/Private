const { version } = require('discord.js');
const os = require('os');
const ms = require('ms');

module.exports = {
  name: 'status',
  execute(message, args, client) {
    const totalGuilds = client.guilds.cache.size;
    const cpuUsage = (process.cpuUsage().system / 1000000).toFixed(2);
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const apiLatency = client.ws.ping;
    const uptime = ms(client.uptime, { long: true });
    const osType = os.type();

    const statusEmbed = {
      color: '#0099ff',
      title: `Bot Status - ${client.user.tag}`,
      thumbnail: {
        url: client.user.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: 'CPU Usage',
          value: `${cpuUsage}%`,
          inline: true,
        },
        {
          name: 'RAM Usage',
          value: `${ramUsage} MB`,
          inline: true,
        },
        {
          name: 'API Latency',
          value: `${apiLatency} ms`,
          inline: true,
        },
        {
          name: 'OS Type',
          value: `${osType}`,
          inline: true,
        },
        {
          name: 'Discord Servers',
          value: `${totalGuilds}`,
          inline: true,
        },
        {
          name: 'Uptime',
          value: `${uptime}`,
          inline: true,
        },
      ],
      footer: {
        text: `Requested by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL({ dynamic: true }),
      },
    };

    message.channel.send({ embeds: [statusEmbed] });
  },
};
