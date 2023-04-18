module.exports = {
    data: {
        name: 'binarycode',
        description: 'converts words and numbers to binarycode',
        options: [
            {
                name: 'text',
                description: 'the text to be converted to morsecode',
                type: 3,
                required: true,
            },
        ],
    },
    async run(interaction) {
        const args = interaction.options.getString('text').split(/ +/);
        // let i = ["i"]
        const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        const binary = "/,01000001,01000010,01000011,01000100,01000101,01000110,01000111,01001000,01001001,01001010,01001011,01001100,01001101,01001110,01001111,01010000,01010001,01010010,01010011,01010100,01010111,01011000,01011001,01011010".split(",")
        
        let text = args.join(" ").toUpperCase();

        while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
            text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
        };

        if (text.startsWith("0") || text.startsWith("1")) {
            text = text.split(" ");
            let length = text.length;
            for (var i = 0; i < length; i++) {
                text[i] = alpha[binary.indexOf(text[i])];
            };
            text = text.join("");
        } else {
            text = text.split("");
            let length = text.length;
            for (var i = 0; i < length; i++) {
                text [i] = binary[alpha.indexOf(text[i])];
            };
            text = text.join(" ");
        };

        await interaction.reply(text);
    }
};