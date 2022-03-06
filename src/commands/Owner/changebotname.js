const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions, DiscordAPIError } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changebotname')
		.addStringOption(option => option.setName('name').setDescription('The new name for the bot.').setRequired(true))
		.setDescription('Change the bot\'s username.'),
	async execute(interaction, client) {
		if (!config.settings.owners.includes(interaction.user.id)) return interaction.reply('**❌ | You are not an owner of the bot.**');

		try {
			let emb = new MessageEmbed()
				.setTimestamp()
				.setColor('PURPLE')
				.setFooter(interaction.user.tag, interaction.user.displayAvatarURL());
			let name = interaction.options.getString('name');
			
			if (!name) return interaction.reply('**❌ | You need to provide a name.**');
			else emb.setDescription(`Set the bot's username to **\`${name}\`**.`);
			try {
				try {
					client.user.setUsername(name);
				} catch (e) {
					return await interaction.reply({embeds: [emb]});
				}
			} catch (error) {
				console.log(error);
				return interaction.reply('**❌ | Could not change the bot\'s username.**');
			}
		} catch (DiscordAPIError) {
			return interaction.reply('**❌ | You have changed your name too quickly, please wait a moment.**');
		}
		
	}
};