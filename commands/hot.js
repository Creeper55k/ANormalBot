const array = ["heads", "tails"];

module.exports = {
    data: {
        name: 'hot',
        description: 'heads or tails',
    },
    async run(interaction) {
        await interaction.reply(array[Math.floor(Math.random() * array.length)]);
    }
};