const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bmi',
  description: 'Calculate your Body Mass Index (BMI)',
  usage: '<weight in kg> <height in cm>',
  execute(message, args) {
    // Check if the user has provided the necessary arguments
    if (args.length !== 2) {
      return message.reply('please provide your weight (in kg) and height (in cm).');
    }

    const weight = parseFloat(args[0]);
    const height = parseFloat(args[1]) / 100;

    // Calculate the BMI
    const bmi = weight / (height * height);

    // Categorize the BMI
    let category;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    // Create the embed
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('BMI Calculator')
      .addFields(
        { name: 'Weight', value: `${weight} kg` },
        { name: 'Height', value: `${args[1]} cm` },
        { name: 'BMI', value: bmi.toFixed(2) },
        { name: 'Category', value: category }
      )
      .setTimestamp();

    // Send the embed
    message.channel.send({ embeds: [embed] });
  },
};
