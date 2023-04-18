module.exports = {
    name: 'ready',
    once: true,
    async run(client) {
        console.log(`${client.user.tag} is online!`);
    }
};