const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: {
        name: 'help',
        description: 'displays commands',
    },
    async run(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Commands')
            .setDescription('Here are the available commands:')
            .addFields(
                { name: '/help', value: 'Displays commands.' },
                { name: '/ping [num]', value: 'Responds with "Pong!" and the number of milliseconds it took to get a response.', inline: true },
                { name: '/invite', value: 'Provides the invite link for ANormalBot to join a new server.', inline: true },
                { name: '/rps <rock/paper/scissors>', value: 'Allows the player to play Rock-Paper-Scissors with ANormalBot.', inline: true },
                { name: '/randomcolor', value: 'Sends a random color from ANormalBot\'s color database.', inline: true },
            );

        await interaction.reply({ embeds: [exampleEmbed] });
    }
};