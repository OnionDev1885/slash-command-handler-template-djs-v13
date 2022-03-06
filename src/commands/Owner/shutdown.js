const config = require('../../../config')
const { SlashCommandBuilder } = require('@discordjs/builders')
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shutdown')
    .setDescription('Shutdown\'s (turns off) the bot'),
    async execute(interaction, client) {
        if(!config.settings.owners.includes(interaction.user.id)) return interaction.reply({content: 'Do you thin you are worthy enough to shut me down idiot?', ephemeral:true})

        const confirmation = new MessageEmbed()
        .setTitle(`Are you sure?`)
        .setAuthor(interaction.user.tag)
        .setDescription('Are you sure about that?\nThis will make me **offline** and then to make me again **online**, you have to run the code again!!')
        .setColor('RED')
        .setTimestamp()

        const cancel = new MessageEmbed()
        .setTitle('Cancelled')
        .setDescription('This action was cancelled!!')
        .setColor('GREEN')
        .setTimestamp()

        const expired = new MessageEmbed()
        .setTitle('Error')
        .setDescription('This interaction has been expired!!')

        const confirm = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Yes')
            .setCustomId('yes')
            .setStyle('SUCCESS'),

            new MessageButton()
            .setLabel('No')
            .setStyle('DANGER')
            .setCustomId('no')
        )

        const confirmed = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Yes')
            .setCustomId('yep')
            .setDisabled(true)
            .setStyle('SUCCESS'),

            new MessageButton()
            .setLabel('No')
            .setStyle('DANGER')
            .setCustomId('nope')
            .setDisabled(true)
        )

        const m = await interaction.reply({embeds: [confirmation], components: [confirm]})
        setTimeout(function() {
            m.update({embeds: [expired], components: [confirmed]})
        }, 15000)

        const filter = i => i.user.id == interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({filter, timeout: 15000})

        collector.on('collect', async i => {
            if(i.customId === 'yes') {
                await i.update({content: 'Shutting Down.....', embeds: [], components: [confirmed]})
                await process.exit();
            }

            if(i.customId === 'no') {
                await i.update({embeds: [cancel], components: [confirmed]})
            }
        })
    }
}