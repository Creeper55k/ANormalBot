module.exports = {
    data: {
        name: 'rtd',
        description: 'roll the dice',
    },
    async run(interaction) {
        const roll = (Math.floor(Math.random()*200)+1);

        if (roll <= 100) {
            await interaction.reply('keep rolling');
        } else {
            await interaction.reply('You win!');
        };
    }
};