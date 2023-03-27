const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans the mentioned user',
    execute(message, args) {
        // Check if the author of the message has the Ban Members permission
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have the required permissions to use this command.');
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!member) {
            return message.reply('Please mention a valid member of this server');
        }

        if (!member.bannable) {
            return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');
        }

        member.ban({ reason: reason })
            .then(() => {
                const banEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('User Banned')
                    .setDescription(`${member} has been banned from the server.`)
                    .addField('Reason', reason)
                    .addField('Moderator', message.author.tag)
                    .setTimestamp()
                    .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send(banEmbed);
            })
            .catch(error => {
                console.error(`Could not ban member: ${error}`);
                message.reply('There was an error trying to ban this user!');
            });
    },
};
