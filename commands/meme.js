const fetch = require('node-fetch-commonjs');

module.exports = {
    data: {
        name: 'meme',
        description: 'shows a random meme from r/meme, does have a meme filter for sfw memes',
    },
    async run(interaction) {
        const url = 'https://www.reddit.com/r/memes/random.json';

        fetch(url)
            .then(response => response.json())
            .then(async data => {
                const post = data[0].data.children[0].data;

                if (post.over_18) {
                    console.error('NSFW content detected');
                };

                const imageUrl = post.url_overridden_by_dest;
    
                await interaction.reply({ content: `${post.title}: ${imageUrl}` });
            })
            .catch(async error => {
                console.error(error);
                await interaction.reply('Oops! Something went wrong.');
            });
    }
};