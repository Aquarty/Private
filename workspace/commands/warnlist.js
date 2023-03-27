// workspace/commands/warnlist.js
const sqlite3 = require('sqlite3').verbose();
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'warnlist',
  description: 'Show the list of warnings for a user',
  execute(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      const noPermissionEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('You do not have permission to use this command.');
      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    const user = message.mentions.users.first();
    if (!user) {
      const noUserEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please mention a user to view their warnings.');
      return message.channel.send({ embeds: [noUserEmbed] });
    }

    const db = new sqlite3.Database(`./database/warndatabase/${message.guild.id}.db`, (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    db.all('SELECT * FROM warnings WHERE user_id = ?', [user.id], (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        if (rows.length === 0) {
          const noWarningsEmbed = new MessageEmbed()
            .setColor('#FFFF00')
            .setTitle(`Warnings for ${user.tag}`)
            .setDescription('This user has no warnings.')
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 32 }));
          message.channel.send({ embeds: [noWarningsEmbed] });
        } else {
          const warningList = rows.map(row => {
            const date = new Date(row.timestamp);
            const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            return `${row.id} - ${row.reason} - ${dateString}`;
          }).join('\n');

          const warnListEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`Warnings for ${user.tag}`)
            .setDescription(`\`\`\`${warningList}\`\`\``)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 32 }));
          message.channel.send({ embeds: [warnListEmbed] });
        }
      }
    });

    db.close();
  },
};