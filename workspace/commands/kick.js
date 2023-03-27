const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks the mentioned user',
    execute(message, args) {
        // Check if the author of the message has the Administrator permission
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have the required permissions to use this command.');
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!member) {
            return message.reply('Please mention a valid member of this server');
        }

        if (!member.kickable) {
            return message.reply('I cannot kick this user! Do they have a higher role? Do I have kick permissions?');
        }

        member.kick(reason)
            .then(() => {
                const embed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('User Kicked')
                    .addField('User', member.user.tag)
                    .addField('Moderator', message.author.tag)
                    .addField('Reason', reason)
                    .setTimestamp()
                    .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL());

                message.channel.send({ embeds: [embed] });
            })
            .catch(error => {
                console.error(`Could not kick member: ${error}`);
                message.reply('There was an error trying to kick this user!');
            });
    },
};