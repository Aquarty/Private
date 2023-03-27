const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mutes the mentioned user',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.reply('You do not have the required permissions to use this command.');
    }

    const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
    const reason = args.slice(1).join(' ') || 'No reason provided';

    if (!member) {
      return message.reply('Please mention a valid member of this server');
    }

    if (member.id === message.author.id) {
      return message.reply('You cannot mute yourself');
    }

    if (member.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply('You cannot mute someone with a higher or equal role than you');
    }

    if (member.roles.cache.some(role => role.name === 'Muted')) {
      return message.reply('This user is already muted');
    }

    const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

    if (!mutedRole) {
      return message.reply('Could not find a `Muted` role, please create one.');
    }

    member.roles.add(mutedRole, reason)
      .then(() => {
        const embed = new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`${member.user.tag} has been muted.`)
          .addField('Reason', reason)
          .setFooter(`Muted by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(`Could not mute member: ${error}`);
        message.reply('There was an error trying to mute this user!');
      });
  },
};