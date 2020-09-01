
const Discord = require('discord.js');
//creates client


const client = new Discord.Client({autoReconnect:true});






const ytdl = require('ytdl-core');
//turns client on and logs into bot
const fs = require('fs');
const { inspect } = require('util');

//grabs required file called config
const config = require("./config.json");

const guildid = require("./guildid.json")


const guildConf = require('./guildConf.json');

const m3u8stream = require('m3u8stream');

const parseTime   = require('m3u8stream/dist/parse-time');



const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


//turns bot on


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



const DBL = require("dblapi.js");
const dbl = new DBL('', client);

// Optional events
dbl.on('posted', () => {
  console.log('oliy is fat!');
})



dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

dbl.on('ready', () => {
    setInterval(() => {
        dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);
});
const activities_list = [
    "with the )help command.",
    "lmao",
    "with coding",
    ")yardım"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 12000); // Runs this every 10 seconds.
});






client.on('message', (msg) => {
if (msg.content === 'derghelp') {
  if (msg.author.bot) return;
  const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Commands:")
		.addField("derghelp", "shows commands")
		.addField("dergping", "bot will send ping by amount of milliseconds it takes to send a message")
    .addField("derginvite", "gives you the invite for me to join your server")
    .addField("dergrps", "rock paper scissors are to be put after command,")
    .addField("dergavatar", "brings up avatar of requested user")
    .addField("dergrandomcolor", "sends random color from hex database")
    .addField("dergheads or tails", "basically coinflip")
    .addField("dergmeme", "provides you a meme")
		msg.channel.send({embed: embed}).then(embedMessage => {
    embedMessage.react('664486384257597491');
      const filter = (reaction, user) => reaction.emoji.id === '664486384257597491' && user.id === msg.author.id;
    const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min

    collector.on('collect', () => {

      var embed = new Discord.RichEmbed()
        .setColor('#007FFF')
        .setTitle('Commands; part 2')
        .addField("@ANormalBot", "bot replies to its mention")
        .addField("dergcat", "disabled due to api error" )
        .addField("dergeval", "gives owner permission to run scripts outside the program (Bot Owner Only)")
        .addField("dergsetlanguage", "currently supports turkish, more languages to be added")
        .addField("derg8ball (question)", "ask any question, and it will give you its best answer")
        .addField("dergjoke", "gives a random joke, jokes will be added everyday")
        .addField("dergmorsecode", "converts letters to morsecode or the other way around, morse code alphabet can be found here: https://morsecode.scphillips.com/morse2.html")
        .addField("dergplay", "plays youtube songs when you give it a link")
        .addField("dergbinary", "converts binary and alphabet, for the alphabet for binary: https://www.convertbinary.com/alphabet/")
        .addField("derguserinfo", "brings info of user (beta)")
        .addField("updates (not a command, just shows what i did to the bot)", "userinfo command added")
      embedMessage.edit(embed);
    });
})
  .catch(err => console.error(err));
  }
});

client.on('message', (msg) => {
  if (msg.content === ')join') {
    if(msg.author.bot) return;
    const channel = msg.member.voiceChannel;
    channel.join()
    msg.channel.send('i joined the channel successfully')
  }
});

client.on('message', (msg) => {
  if (msg.content === ')leave') {
    if(msg.author.bot) return;
    const channel = msg.member.voiceChannel;
    channel.leave()
    msg.channel.send('i left the channel successfully')
  }
});


client.on('message', (msg) => {
if (msg.content === 'derginvite') {
  if (msg.author.bot) return;
  const embed = new Discord.RichEmbed()
  msg.channel.send({embed: {
    color: 3447003,
    title: "invite me!",
    url: "https://discordapp.com/api/oauth2/authorize?client_id=530869174625632256&permissions=2048&redirect_uri=https%3A%2F%2Flmfao.com%2F&scope=bot"
  }
                   })
}
});


process.on('unhandledRejection', console.error);

var prefix = "derg"



const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(config.prefix + 'ping')) {
    const embed = new Discord.RichEmbed()
    .setColor(0x954D23)
    .addField("your ping:", `${Date.now() - msg.createdTimestamp}`)
    .addField("Api ping:", `${client.ping}`)
    msg.channel.send({embed})
  }
});




client.on("message", msg => {
  const args = msg.content.split(" ").slice(1);
  if (msg.content.startsWith(config.prefix + 'eval')) {
    if(msg.author.id !== config.ID) return msg.channel.send('my developer can only do this')
//if author id doesn't match the developer's id, don't do anything but say message above
     if (msg.author.bot) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        if (evaled.includes(client.token)) {
            evaled = evaled.replace(client.token, "nice try, but you arent allowed to do that");
        }
//if input after eval equals to client.token, replace token with message above

      msg.channel.send(clean(evaled), {code:"xl"});
      msg.react('315009125694177281');
//if code was evaled successfully send message above
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      msg.react('315009174163685377');
//if code was not evaled successfully, send error message
    }
  }
});



client.on('message', msg => {
  if (msg.content.startsWith(config.prefix + 'morsecode')) {
    const args = msg.content.split(/ +/).slice(1);
    if (msg.author.bot) return;
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
			return msg.channel.send(text);
  }
});



client.on('message', msg => {
  if (msg.content.startsWith(config.prefix + 'binary')) {
    const args = msg.content.split(/ +/).slice(1);
    if (msg.author.bot) return;
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
			return msg.channel.send(text);
  }
});

client.on('message', msg => {
    if (msg.content.startsWith(config.prefix + 'avatar')) {
       if (msg.author.bot) return;
      const args = msg.content.split(" ").slice(1);
      // Remove the "var" line; it isn't necessary.
      function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}
      if (args[0]) {
		const user = getUserFromMention(args[0]); 
      let embed = new Discord.RichEmbed()
      // Replace "message.member" with "message.author"
    .setImage(user.avatarURL)
    .setColor('#275BF0')
      msg.channel.send(embed)
      }
    }
});

client.on('message', msg => {
  if (msg.content === 'dergrandomcolor') {
     if (msg.author.bot) return;
      let color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
      let embed = new Discord.RichEmbed() //Embeds.
            .setTitle(`#${color}`)
            .setColor(`#${color}`);
     msg.channel.send(embed)
   }
});




client.on('message', msg => {
  const args = msg.content.split(" ").slice(1);
   if (msg.content.startsWith(config.prefix + 'say')) {
     if (msg.author.bot) return;
     if(msg.author.id !== config.ID) return msg.channel.send('You dont have permission to run this command, my developers can only can do this')
   const sayMessage = args.join(" ");
      msg.delete(1000).catch();
      msg.channel.send(sayMessage);
  }
});



client.on('message', msg => {
  const args = msg.content.split(" ").slice(1);
  if (msg.isMentioned(client.user)) {
    if (msg.author.bot) return;
    if(!args.length) {
      msg.react('559091884417482772')
      msg.channel.send('my prefix is derg, to get my commands to show, do derghelp')
    }
    if (args[0] === 'bad bot') {
      msg.author.send('no u')
    }
  }
});


client.on('message', function(msg) {
  if (msg.content === 'dergheads or tails') {
    if (msg.author.bot) return;
    var array = ["heads", "tails"]
    msg.channel.send(array[Math.floor(Math.random() * array.length)])
  }
});



client.on("message", function(msg) {
    if (msg.content === "dergroll the dice") {
       if (msg.author.bot) return;
        var roll = (Math.floor(Math.random()*200)+1);
        if (roll <= 100) {
            msg.channel.send('keep rolling');
        }
        else {
            msg.channel.send('You win!');
        }
    }
});




client.on("message", function(msg) {
    if (msg.content.startsWith(config.prefix + 'rps')) {
      const args = msg.content.split(" ").slice(1);
       if (msg.author.bot) return;
        var array = ["scissors", "paper", "rock"]
        if (!args.length) {
		return msg.channel.send('empty inputs dont count')
        }
    msg.channel.startTyping(3000);
      setTimeout(function(){
        if (args[0] === 'rock') {
        msg.channel.send(array[Math.floor(Math.random() * array.length)])
        }
        if (args[1] === 'paper') {
        msg.channel.send(array[Math.floor(Math.random() * array.length)])
        }
        if (args[2] === 'scissors') {
        msg.channel.send(array[Math.floor(Math.random() * array.length)])
        }
        msg.channel.stopTyping(true);
     }, 3000);
      }
});

client.on("message", function(msg) {
    if (msg.content.startsWith(config.prefix + '8ball')) {
      const args = msg.content.split(" ").slice(1);
       if (msg.author.bot) return;
        var array = ["yes", "no", "maybe", "ask again later", "i dont know", "most likely"]
        if (!args.length) {
		return msg.channel.send('empty inputs dont count')
        }
      msg.channel.send(array[Math.floor(Math.random() * array.length)])
      }
});

const jokes = require('./jokes.json');

client.on("message", function(msg) {
  if (msg.author.bot) return;
    if (msg.content.startsWith(config.prefix + 'joke')) {
      msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
      }
});


client.on('message', msg => {
  if (msg.content.startsWith(prefix + 'setlanguage')) {
    const args = msg.content.split(" ").slice(1);
    if (msg.author.bot) return;
    if (args[0] === 'turkish') {
      msg.channel.send('Language set! do )yardım')
    }
  }
});

client.on('message', (msg) => {
if (msg.content === 'dergyardım') {
  if (msg.author.bot) return;
  const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Commands:")
		.addField(")yardım et", "komutları gösterir")
		.addField(")ping", "bot mesaj göndermek için harcadığı milisaniye miktarına göre ping gönderecek")
		.addField(")rastgelememe", "rasgele bir meme gönderir ancak komut hala yenileniyor")
    .addField(")rps", "kağıt")
		.addField(")kedi", "rastgele bir kedi resmi gönderir")
    .addField(")avatar", "istenen kullanıcının avatarını getirir")
    .addField(")rastgelerenk", "sends random color from hex database")
    .addField(")yazı tura", "temelde coinflip")
    .addField("@ANormalBot", "kesinlikle cevap verecektir")
    .addField(")eval", "programın dışında komut dosyalarını çalıştırma sahibine izin verir (Yalnızca Bot Sahibi)")
    .addField(")Dili ayarla", "şu anda türkçeyi destekliyor ve beta sürümünde, yakında daha fazla dil eklenecek`")
		msg.channel.send({embed})
	}
});

client.on('message', msg => {
  if (msg.content === 'dergrastgelerenk') {
     if (msg.author.bot) return;
      let color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
      let embed = new Discord.RichEmbed() //Embeds.
            .setTitle(`#${color}`)
            .setColor(`#${color}`);
     msg.channel.send(embed)
   }
});



client.on('message', function(msg) {
  if (msg.content === 'dergyazı tura') {
    if (msg.author.bot) return;
    var array = ["heads", "tails"]
    msg.channel.send(array[Math.floor(Math.random() * array.length)])
  }
});



client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'spam');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('#d67286')
  .addField("Welcome to the server!", `${member}`)
  .addField("# of members", `${member.guild.memberCount}`)
  channel.send({embed})
});



client.on('message', (msg) => {
if (msg.content === 'dergbotinfo') {
  if (msg.author.bot) return;
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  const embed = new Discord.RichEmbed()
		.setColor(`#${color}`)
		.setTitle("My Info")
		.addField("My name", client.user.tag)
		.addField("My id", client.user.id)
    .addField("What version am i on?", Discord.version)
    .addField("the amount of servers i am in", client.guilds.size)
    .addField("Memory Usage", Math.round(process.memoryUsage().heapUsed / 1024 / 1024))
		msg.channel.send({embed})
	}
});

client.on('message', msg => {
  
  if (msg.content.startsWith(config.prefix + 'prefix')) {
    let newPrefix = msg.content.split(" ").slice(1);
    if (msg.author.bot) return;
      newPrefix: config.prefix 
     fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
     	if (err) console.log(err)
	})
  }
});

//const { get } = require("snekfetch");

//command currently disabled to api back-end at max compacity
/*
client.on('message', msg => {
  if(msg.content.startsWith(config.prefix + 'cat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.file)
				return msg.channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(err.stack);
		}
	}
});
*/

const memes = require('./memes.json');

client.on("message", function(msg) {
  if (msg.author.bot) return;
    if (msg.content.startsWith(config.prefix + 'meme')) {
      msg.channel.send(memes[Math.floor(Math.random() * memes.length)]);
      }
});

client.on('message', msg => {
    if (msg.content.startsWith(config.prefix + 'userinfo')) {
       if (msg.author.bot) return;
      const args = msg.content.split(" ").slice(1);
      // Remove the "var" line; it isn't necessary.
      function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}
      if (args[0]) {
		const user = getUserFromMention(args[0]); 
let inline = true
let pdresence = true
const status = {
online: "<:online:424890369688469504> Online",
idle: "<:idle:424890472855502849> Idle",
dnd: "<:dnd:424890429524410368> Do Not Disturb",
offline: "<:offilne:424890400319340546> Offline/Invisible"
}
const h = '9'
if (msg.author.bot === true) {
h: "<:bottag:425631858265423883> Yes";
} else {
h: "<:user:424958082691629057> No";
}
let member = msg.mentions.members.first()
      let embed = new Discord.RichEmbed()
.setThumbnail((user.displayAvatarURL))
let color = ((1 << 24) * Math.random() | 0).toString(16); 
        embed.setColor(`$color`)
.addField('Username', `${user.tag}`, inline)
.addField('id', user.id, inline)
.addField("Nickname", `${member.nickname !== null ? `${member.nickname}` : "<:no:425632070036094986> None"}`, true)
.addField('user', `${user}`, inline, true)
.addField('status', `${[user.presence.status]}`, inline, true)
.addField('Roles:', member.roles.map(r => `${r}`).join(' | '), true)
.addField('date of account creation', user.createdAt)
     msg.channel.send(embed)
      }
    }
});

client.on('message', (msg) => {
if (msg.content === 'dergbotinfo') {
  if (msg.author.bot) return;
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  var yeet = 0;
client.guilds.forEach(g => yeet+=g.memberCount)
  const embed = new Discord.RichEmbed()
		.setColor(`#${color}`)
		.setTitle("My Info")
		.addField("My name", client.user.tag)
		.addField("My id", client.user.id)
    .addField("What version am i on?", Discord.version)
    .addField("the amount of servers i am in", client.guilds.size)
    .addField("the amount of users i know of for all servers i'm in", yeet)
    .addField("Memory Usage", Math.round(process.memoryUsage().heapUsed / 1024 / 1024))
		msg.channel.send({embed})
	}
});

client.on('message', (msg) => {
if (msg.content === 'dergbeatsaberprofile') {
  if (msg.author.bot) return;
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  const embed = new Discord.RichEmbed()
		.setColor(`#${color}`)
		.setTitle("Creeper55k Beatsaber stats")
		.addField("Levels Played", "2036")
		.addField("Levels cleared", "750")
    .addField("Levels failed", "624")
    .addField("Total played Hours", "4h 50m")
    .addField("Total Score", "85 094 121")
    .addField("Hand Distance Traveled", "670km")
    .addField("Good cuts", "469 390")
    .addField("Bad cuts", "31 157")
    .addField("missed notes", "58 245")
    .addField("full combo", "19")
    .addField("Average Cut Score", "86")
		msg.channel.send({embed})
	}
});

client.login(process.env.lmao)

//bot is no longer supported
