const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Displays information about the mentioned user or the message author',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`User Info - ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User Tag', value: user.tag },
                { name: 'Nickname', value: member.nickname || 'None' },
                { name: 'Joined Server', value: new Date(member.joinedTimestamp).toLocaleDateString() },
                { name: 'Account Created', value: new Date(user.createdTimestamp).toLocaleDateString() },
            )
            .setTimestamp();

        message.channel.send({ embeds: [embed] })
            .catch(error => console.log(`Error sending userinfo message: ${error.message}`));
    },
};