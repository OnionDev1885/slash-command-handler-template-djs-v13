module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		if (!interaction.guild || interaction.user.bot) return;

		
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction`.blue);
		if (interaction.isCommand()) {

			const command = client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction, interaction.client);
			} catch (error) {
				console.log(`${error}`);
				await interaction.reply(
					{
						content: 'There was an error executing this command. Try again later!',
						ephemeral: true
					}
				);
			}
		}
    }
}