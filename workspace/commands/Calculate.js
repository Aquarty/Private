const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
  name: 'calculate',
  description: 'Calculate and solve equations',
  execute(message, args) {
    if (!args || !args.length) {
      return message.channel.send('Please provide an equation to solve.');
    }

    let input = args.join(' ');

    try {
      // Evaluate the input using mathjs
      const result = math.evaluate(input);

      // Format the result as a string with 2 decimal places
      const formattedResult = parseFloat(result.toFixed(2));

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Equation Calculation')
        .addField('Input', `\`\`\`${input}\`\`\``)
        .addField('Result', `\`\`\`${formattedResult}\`\`\``);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send('An error occurred while solving the equation.');
    }
  },
};
