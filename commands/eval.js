module.exports = {
    data: {
        name: 'eval',
        description: 'cheat code for console',
        options: [
            {
                name: 'text',
                description: 'the text to be evaled',
                type: 3,
                required: true,
            },
        ]
    },
    async run(interaction) {
        const args = interaction.options.getString('text').split(/ +/);

        //if author id doesn't match the developer's id, don't do anything but say message above
        
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled);

                if (evaled.includes(client.token)) {
                    evaled = evaled.replace(client.token, "nice try, but you arent allowed to do that");
                };
            };

            //if input after eval equals to client.token, replace token with message above

            await interaction.reply(clean(evaled), {code:"xl"});
            //if code was evaled successfully send message above
            
            function clean(text) {
                if (typeof(text) === "string") {
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                } else {
                    return text;
                }
            };
        } catch (err) {
            await interaction.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            //if code was not evaled successfully, send error message
        };
    }
};