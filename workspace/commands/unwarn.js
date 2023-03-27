// workspace/commands/unwarn.js
const sqlite3 = require('sqlite3').verbose();
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unwarn',
  description: 'Remove a warning from a user',
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
        .setDescription('Please mention a user to unwarn.');
      return message.channel.send({ embeds: [noUserEmbed] });
    }

    const warnID = args[1];
    if (!warnID || isNaN(warnID)) {
      const noWarnIdEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide a valid warning ID to remove.');
      return message.channel.send({ embeds: [noWarnIdEmbed] });
    }

    const db = new sqlite3.Database(`./database/warndatabase/${message.guild.id}.db`, (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    db.run('DELETE FROM warnings WHERE id = ? AND user_id = ?', [warnID, user.id], function (err) {
      if (err) {
        console.error(err.message);
      } else {
        if (this.changes === 0) {
          const noChangesEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Error')
            .setDescription(`No warning found with ID ${warnID} for the mentioned user.`);
          message.channel.send({ embeds: [noChangesEmbed] });
        } else {
          const unwarnSuccessEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Warning Removed')
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`Warning with ID ${warnID} has been removed for ${user}.`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 32 }));
          message.channel.send({ embeds: [unwarnSuccessEmbed] });
        }
      }
    });

    db.close();
  },
};