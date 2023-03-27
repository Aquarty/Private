const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of the mentioned user or yourself',
    execute(message, args) {
        // Get the user mentioned in the message, or the message author if no user is mentioned
        const user = message.mentions.users.first() || message.author;

        // Create an embed with the user's avatar
        const avatarEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));

        // Send the embed to the channel
        message.channel.send({ embeds: [avatarEmbed] });
    },
};