const config = require('../../../config.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('developer')
		.setDescription('Sends some information of the developer!'),
	async execute(interaction, client) {

		let emb = new MessageEmbed()
			.setTitle('SetupManager Developer')
			.setDescription('Hi, I\'m OnionDev!\nI am a NodeJS, HTML, CSS, JS developer who coded this bot.')
			.addField('Website', 'https://oniondev.gq')
            .addField('SlashCommand Handler Repo', 'https://github.com/OnionDev1885/slash-command-handler-template-djs-v13')
			.setFooter({text: 'Made by OnionDev', iconURL: 'https://trgop.gq/images/DiscordAvatar.png'})
			.setColor('BLUE');
		await interaction.reply({embeds: [emb]});
	}
};