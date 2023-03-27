// workspace/commands/warn.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Warn a user',
  execute(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      const noPermissionEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('You do not have permission to use this command.');
      return message.channel.send({ embeds: [noPermissionEmbed] });
    }

    const userToWarn = message.mentions.users.first();
    if (!userToWarn) {
      const noUserEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please mention a user to warn.');
      return message.channel.send({ embeds: [noUserEmbed] });
    }

    const reason = args.slice(1).join(' ');
    if (!reason) {
      const noReasonEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide a reason for the warning.');
      return message.channel.send({ embeds: [noReasonEmbed] });
    }

    const dbFolderPath = './database/warndatabase';
    if (!fs.existsSync(dbFolderPath)) {
      fs.mkdirSync(dbFolderPath, { recursive: true });
    }

    const db = new sqlite3.Database(`./database/warndatabase/${message.guild.id}.db`, (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS warnings (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, reason TEXT, timestamp INTEGER)`);

      const timestamp = Date.now();
      db.run(`INSERT INTO warnings(user_id, reason, timestamp) VALUES(?, ?, ?)`, [userToWarn.id, reason, timestamp], function (err) {
        if (err) {
          console.error(err.message);
        } else {
          const warnSuccessEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('User Warned')
            .setThumbnail(userToWarn.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`${userToWarn} has been warned for "${reason}".`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 32 }));
          message.channel.send({ embeds: [warnSuccessEmbed] });
        }
      });
    });

    db.close();
  },
};