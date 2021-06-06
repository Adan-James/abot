require("dotenv").config();

// depedency shit
const fs = require("fs");
const Discord = require('discord.js');
const http = require("http");

const client = new Discord.Client();

client.on('ready', () => {
  	console.log(`Logged in as ${client.user.tag}!`);
});

// Command bullshit
const loadCommands = fs.readdirSync('./commands');

for(const folder of loadCommands){
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

	for(const file of commandFiles){
		const command = require(`./commands/${folder}/${file}`);

		client.commands.set(command.name, command);
	}
}

client.on('message', msg => {
	if(msg.content.substring(0, 1)== "!"){
		let args = msg.content.split(" ");
		let cmd = args[0].replace('!', '');

		if(!client.commands.has(cmd)) return;

		var cmdobj = client.commands.get(cmd);

		args.splice(0, 1);
		let argtxt = args.join(" ");

		if(args.length == 0) argtxt = "<NONE>"
		console.log(msg.member.user.username + " attempted to run command " + cmd + " with args " + argtxt);

		if(cmdobj.permission == 0){
			if(args.length < cmdobj.reqargs){
				msg.reply("you are missing required arguments you silly willy! Usage: ```!" + cmd + " " + cmdobj.usage + "```");
				return;
			}

			try {
				cmdobj.execute(msg, args)
			} catch(error){
				console.log(msg.member.user.username + " had a fatal error while running " + cmd + " error: \n" + error);
				msg.reply("Error running command!\n```" + error + "```");
			}
		}else if(msg.member.hasPermission(cmdobj.permission) || msg.member.hasPermission('ADMINISTRATOR')){
			if(args.length < cmdobj.reqargs){
				msg.reply("you are missing required args! Usage: ```!" + cmd + " " + cmdobj.usage + "```");
				return;
			}
			try {
				cmdobj.execute(msg, args)
			} catch(error){
				console.log(msg.member.user.username + " had a fatal error while running " + cmd + " error: \n" + error);
	
				msg.reply("Error running command!\n```" + error + "```");
			}
		}else{
			msg.reply('You do not have permission to execute this command you fucking idiot');
		}
	}
});

client.login(process.env.TOKEN);