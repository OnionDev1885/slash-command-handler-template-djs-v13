
const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.addUserOption(option => option.setName('user').setDescription('The user who\'s avatar you want to show.'))
		.setDescription('Gets the avatar of the mentioned user.'),
	async execute(interaction, client) {
		let user = interaction.options.getUser('user');
		if (!user) user = interaction.user;
        
		let emb = new MessageEmbed()
			.setTitle(`${user.tag}'s Avatar`)
			.addField('PNG', `[**\`LINK\`**](${user.displayAvatarURL({format: 'png'})})`, true)
			.addField('JPG', `[**\`LINK\`**](${user.displayAvatarURL({format: 'jpg'})})`, true)
			.addField('WEBP', `[**\`LINK\`**](${user.displayAvatarURL({format: 'webp'})})`, true)
			.setImage(user.displayAvatarURL())
			.setTimestamp()
			.setColor('AQUA');
		await interaction.reply({embeds: [emb]});
	}
};