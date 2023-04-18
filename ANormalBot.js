const { REST, Routes, Discord, Message, MessageEmbed } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const commands = [
  {
    name: 'help',
    description: 'displays commands',
  },
  {
    name: 'randomcolor2',
    description: 'broken',
  },
  {
    name: 'morsecode',
    description: 'converts words and numbers to morsecode',
    options: [
      {
        name: 'text',
        description: 'the text to be converted to morsecode',
        type: 3,
        required: true,
      },
    ],
  },
  {
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
  {
    name: 'eval',
    description: 'cheat code for console',
    options: [
      {
        name: 'text',
        description: 'the text to be evaled',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'hot',
    description: 'heads or tails',
  },
  {
    name: 'rtd',
    description: 'roll the dice',
  },
  {
    name: 'joke',
    description: 'jokes',
  },
  {
    name: 'chemformula',
    description: 'gives a random chemical formula'
  },
  {
    name: 'meme',
    description: 'shows a random meme from r/meme, does have a meme filter for sfw memes',
  },
  ];



const rest = new REST({ version: '10' }).setToken('token');

( () => {
  try {
    console.log('Started refreshing application (/) commands.');

   rest.put(Routes.applicationCommands('530869174625632256'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
    
client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
 
    if (interaction.commandName === 'help') {
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
 
        interaction.reply({ embeds: [exampleEmbed] });
    }
});

client.on('interactionCreate', interaction => {
 if (!interaction.isCommand()) return;
     if (interaction.commandName === 'randomcolor2') {
      let color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
       
    const exampleEmbed = new EmbedBuilder()
   .setTitle(`Color`)
   .setColor(`#${color}`);
interaction.reply({ embeds: [exampleEmbed] });
   }
});

client.on('interactionCreate', interaction => {
   if (!interaction.isCommand()) return;
  if (interaction.commandName === 'morsecode') {
   const args = interaction.options.getString('text').split(/ +/);
    //let i = ["i"]
       let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
				morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
				text = args.join(" ").toUpperCase();
			while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
				text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
			}
			if (text.startsWith(".") || text.startsWith("-")) {
				text = text.split(" ");
				let length = text.length;
				for (var i = 0; i < length; i++) {
					text[i] = alpha[morse.indexOf(text[i])];
				}
				text = text.join("");
			} else {
				text = text.split("");
				let length = text.length;
				for (var i = 0; i < length; i++) {
					text [i] = morse[alpha.indexOf(text[i])];
				}
				text = text.join(" ");
			}
			return interaction.reply(text);
  }
});

client.on('interactionCreate', interaction => {
if (!interaction.isCommand()) return;
  if (interaction.commandName === 'binarycode') {
    const args = interaction.options.getString('text').split(/ +/);
    //let i = ["i"]
       let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
				binary = "/,01000001,01000010,01000011,01000100,01000101,01000110,01000111,01001000,01001001,01001010,01001011,01001100,01001101,01001110,01001111,01010000,01010001,01010010,01010011,01010100,01010111,01011000,01011001,01011010".split(","),
				text = args.join(" ").toUpperCase();
			while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
				text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
			}
			if (text.startsWith("0") || text.startsWith("1")) {
				text = text.split(" ");
				let length = text.length;
				for (var i = 0; i < length; i++) {
					text[i] = alpha[binary.indexOf(text[i])];
				}
				text = text.join("");
			} else {
				text = text.split("");
				let length = text.length;
				for (var i = 0; i < length; i++) {
					text [i] = binary[alpha.indexOf(text[i])];
				}
				text = text.join(" ");
			}
			return interaction.reply(text);
  }
});


client.on("interactionCreate", interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'eval') {
    const args = interaction.options.getString('text').split(/ +/);
//if author id doesn't match the developer's id, don't do anything but say message above
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        if (evaled.includes(client.token)) {
            evaled = evaled.replace(client.token, "nice try, but you arent allowed to do that");
        }
//if input after eval equals to client.token, replace token with message above

      interaction.reply(clean(evaled), {code:"xl"});
//if code was evaled successfully send message above
      function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return text;
  }
}
    } catch (err) {
      interaction.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
//if code was not evaled successfully, send error message
    }
  }
});

client.on('interactionCreate', function(interaction) {
if (!interaction.isCommand()) return;
  if (interaction.commandName === 'hot') {
    var array = ["heads", "tails"]
    interaction.reply(array[Math.floor(Math.random() * array.length)])
  }
});

client.on("interactionCreate", function(interaction) {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'rtd') {
        var roll = (Math.floor(Math.random()*200)+1);
        if (roll <= 100) {
            interaction.reply('keep rolling');
        }
        else {
            interaction.reply('You win!');
        }
    }
});

client.on('interactionCreate', interaction => {
  if (interaction.isCommand() && interaction.commandName === 'chemformula') {
    const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'];
    const formula = [];
 
    // Generate the chemical formula
    for (let i = 0; i < 10; i++) {
      const element = elements[Math.floor(Math.random() * elements.length)];
      const subscript = Math.floor(Math.random() * 9) + 1;
      formula.push(`${element}${subscript}`);
    }
 
    // Send the chemical formula back to the user
    interaction.reply(`Here's your random chemical formula: ${formula.join('')}`);
  }
});

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;
 
  if (interaction.commandName === 'meme') {
    const url = 'https://www.reddit.com/r/memes/random.json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const post = data[0].data.children[0].data;
        if (post.over_18) {
          throw new Error('NSFW content detected');
        }
        const imageUrl = post.url_overridden_by_dest;
        interaction.reply({ content: `${post.title}: ${imageUrl}` });
      })
      .catch(error => {
        console.error(error);
        interaction.reply('Oops! Something went wrong.');
      });
  }
}); 

client.login('token');
