module.exports = {
    name: 'unmute',
    description: 'Unmute a member',
    execute(message, args) {
        const target = message.mentions.members.first();
        if (!target) {
            message.reply('Please specify someone to unmute.');
            return;
        }
        
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            message.reply('Mute role not found.');
            return;
        }
        
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            message.reply('You do not have permission to unmute members.');
            return;
        }
        
        target.roles.remove(muteRole)
            .then(() => message.channel.send(`${target} has been unmuted.`))
            .catch(err => {
                console.error(err);
                message.reply('An error occurred while trying to unmute the member.');
            });
    },
};