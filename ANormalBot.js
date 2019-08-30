//grabs required package from package.json
const Discord = require('discord.js');
//creates client
const client = new Discord.Client({autoReconnect:true});

const { get } = require('snekfetch');


const ytdl = require('ytdl-core');

//turns client on and logs into bot
const fs = require('fs');
const { inspect } = require('util');

//grabs required file called config
const config = require("./config.json");

const guildid = require("./guildid.json")

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
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMDg2OTE3NDYyNTYzMjI1NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTUzNDYwOTEwfQ.kgCZhiyLeYTzT9lRNOCTnekwhl5l3V5DXtRFVhM05bQ', client);

// Optional events
dbl.on('posted', () => {
  console.log('oliy is fat!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

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
if (msg.content === ')help') {
  if (msg.author.bot) return;
  const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Commands:")
		.addField(")help", "shows commands")
		.addField(")ping", "bot will send ping by amount of milliseconds it takes to send a message")
    .addField(")invite", "gives you the invite for me to join your server")
    .addField(")rps", "rock paper scissors are to be put after command,")
    .addField(")avatar", "brings up avatar of requested user")
    .addField(")randomcolor", "sends random color from hex database")
    .addField(")heads or tails", "basically coinflip")
    .addField("@ANormalBot", "bot replies to its mention")
    .addField(")cat", "gives a random image of a cat" )
    .addField(")eval", "gives owner permission to run scripts outside the program (Bot Owner Only)")
    .addField(")setlanguage", "currently supports turkish, more languages to be added")
    .addField(")8ball (question)", "ask any question, and it will give you its best answer")
    .addField(")joke", "gives a random joke, jokes will be added everyday")
    .addField("updates (not a command, just shows what i did to the bot)", "Fixed )cat command and added it back")
		msg.channel.send({embed})
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
if (msg.content === ')invite') {
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



var prefix = ")"



const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(prefix + 'ping')) {
    const embed = new Discord.RichEmbed()
    .setColor(0x954D23)
    .addField("your ping:", `${Date.now() - msg.createdTimestamp}`)
    .addField("Api ping:", `${client.ping}`)
    msg.channel.send({embed})
  }
});




client.on("message", msg => {
  const args = msg.content.split(" ").slice(1);
  if (msg.content.startsWith(prefix + 'eval')) {
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
  if (msg.content.startsWith(prefix + 'morsecode')) {
    const args = msg.content.split(" ").slice(1);
    if (msg.author.bot) return;
      if (args[0] === '.-') {
        msg.channel.send('a')
        }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-...') {
          msg.channel.send('b')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-.-.') {
          msg.channel.send('c')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-..') {
          msg.channel.send('d')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.') {
          msg.channel.send('e')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '..-.') {
          msg.channel.send('f')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '--.') {
          msg.channel.send('g')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '....') {
          msg.channel.send('h')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '..') {
          msg.channel.send('i')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.---') {
          msg.channel.send('j')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-.-') {
          msg.channel.send('k')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.-..') {
          msg.channel.send('l')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '--') {
          msg.channel.send('m')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-.') {
          msg.channel.send('n')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '--.-') {
          msg.channel.send('o')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.--.') {
          msg.channel.send('p')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '--.-') {
          msg.channel.send('q')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.-.') {
          msg.channel.send('r')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '...') {
          msg.channel.send('s')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-') {
          msg.channel.send('t')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '..-') {
          msg.channel.send('u')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '...-') {
          msg.channel.send('v')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.--') {
          msg.channel.send('w')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-..-') {
          msg.channel.send('x')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-.--') {
          msg.channel.send('y')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '--..') {
          msg.channel.send('z')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.----') {
          msg.channel.send('1')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '..---') {
          msg.channel.send('2')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '...--') {
          msg.channel.send('3')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '....-') {
          msg.channel.send('4')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '.....') {
          msg.channel.send('5')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-....') {
          msg.channel.send('6')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '--...') {
          msg.channel.send('7')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '---..') {
          msg.channel.send('8')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '----.') {
          msg.channel.send('9')
          }
      if (args[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] === '-----') {
          msg.channel.send('10')
          }
        }
});



client.on("message", msg => {
  if(msg.content.includes("discord.gg/")) {
    msg.delete();
    if(msg.guild.id == guildid.guildID) return; 
    if (msg.author.bot) return;
    msg.channel.send("invites arent allowed")
    msg.channel.send('<@241066577921835008>, invite sent, ban the user')
  }
});

client.on('message', msg => {
    if (msg.content === ')avatar') {
       if (msg.author.bot) return;
      // Remove the "var" line; it isn't necessary.
      let embed = new Discord.RichEmbed()
      // Replace "message.member" with "message.author"
    .setImage(msg.author.avatarURL)
    .setColor('#275BF0')
      msg.channel.send(embed)
    }
});

client.on('message', msg => {
  if (msg.content === ')randomcolor') {
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
   if (msg.content.startsWith(prefix + 'say')) {
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
      msg.channel.send('my prefix is ), to get my commands to show, do )help')
    }
    if (args[0] === 'bad bot') {
      msg.author.send('no u')
    }
  }
});


client.on('message', function(msg) {
  if (msg.content === ')heads or tails') {
    if (msg.author.bot) return;
    var array = ["heads", "tails"]
    msg.channel.send(array[Math.floor(Math.random() * array.length)])
  }
});



client.on("message", function(msg) {
    if (msg.content === ")roll the dice") {
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
    if (msg.content.startsWith(prefix + 'rps')) {
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
    if (msg.content.startsWith(prefix + '8ball')) {
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
    if (msg.content.startsWith(prefix + 'joke')) {
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
if (msg.content === ')yardım') {
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
  if (msg.content === ')rastgelerenk') {
     if (msg.author.bot) return;
      let color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
      let embed = new Discord.RichEmbed() //Embeds.
            .setTitle(`#${color}`)
            .setColor(`#${color}`);
     msg.channel.send(embed)
   }
});



client.on('message', function(msg) {
  if (msg.content === '))yazı tura') {
    if (msg.author.bot) return;
    var array = ["heads", "tails"]
    msg.channel.send(array[Math.floor(Math.random() * array.length)])
  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'bot-hell');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('#d67286')
  .addField("Welcome to the server!", `${member}`)
  .addField("# of members", `${member.guild.memberCount}`)
  channel.send({embed})
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

client.on('disconnected', function(event) {
   function ResetBot(reset){
    console.log('bot logged out! resetting')
  .then(ResetBot => client.destroy())
    .then(() => client.login(process.env.lmao));
  }
});

client.on('message', msg => {
	// Embedded
  if (msg.author.bot) return;
	if(msg.content.startsWith(prefix + 'cat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.file)
				return msg.channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(error.stack);
		}
	}
});

const queue = new Map();

client.on('message', async msg => {
	if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return;

	const serverQueue = queue.get(msg.guild.id);

	if (msg.content.startsWith(prefix + 'play')) {
		execute(msg, serverQueue);
		return;
	} else if (msg.content.startsWith(prefix + 'skip')) {
		skip(msg, serverQueue);
		return;
	} else if (msg.content.startsWith(prefix + 'stop')) {
		stop(msg, serverQueue);
		return;
	} 
});

async function execute(msg, serverQueue) {
	const args = msg.content.split(' ');

	const voiceChannel = msg.member.voiceChannel;
	if (!voiceChannel) return msg.channel.send('you need to be in a voice channel');
	const permissions = voiceChannel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return msg.channel.send('i might need permissions to join the channel and speak');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(msg.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(msg.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(msg.guild.id);
			return msg.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return msg.channel.send(`${song.title}` + "has been added to queue");
	}

}

function skip(msg, serverQueue) {
	if (!msg.member.voiceChannel) return msg.channel.send('you must be in the channel to stop the music');
	if (!serverQueue) return msg.channel.send('i cant skip any songs because queue is empty');
	serverQueue.connection.dispatcher.end();
}

function stop(msg, serverQueue) {
	if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('the Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}


client.login(process.env.lmao)