const { EmbedBuilder } = require('@discordjs/builders');


module.exports = {
    data: {
        name: 'randomcolor2',
        description: 'broken',
    },
    async run(interaction) {
        const color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
             
        const exampleEmbed = new EmbedBuilder()
            .setTitle(`Color`)
            .setColor(`#${color}`);
        
        await interaction.reply({ embeds: [exampleEmbed] });
    }
};