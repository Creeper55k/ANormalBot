module.exports = {
    data: {
        name: 'morsecode',
        description: 'converts words and numbers to morsecode',
        options: [
            {
                name: 'text',
                description: 'the text to be converted to morsecode',
                type: 3,
                required: true,
            }
        ],
    },
    async run(interaction) {
        const args = interaction.options.getString('text').split(/ +/);
        const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
	    const morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(",");
				
        let text = args.join(" ").toUpperCase();
			
        while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
			text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
		};

		if (text.startsWith(".") || text.startsWith("-")) {
			text = text.split(" ");
			let length = text.length;
			for (var i = 0; i < length; i++) {
				text[i] = alpha[morse.indexOf(text[i])];
			};
			text = text.join("");
		} else {
			text = text.split("");
			let length = text.length;
			for (var i = 0; i < length; i++) {
				text [i] = morse[alpha.indexOf(text[i])];
			};
			text = text.join(" ");
		};

		await interaction.reply(text);
    }
};