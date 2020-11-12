const { Client, MessageEmbed } = require('discord.js');
const { config } = require('dotenv');

const client = new Client({
    disableEveryone: true
});
const prefix = ".";

config({
    path: __dirname + "/.env"
});

//This is where you will make your bot have a rich presence, just change the fields to reflect the name you want to give your bot.//

client.on("ready", () => {
    console.log(`I am now online, my name is ${client.user.username}!`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name:"WelcomeBot (.ping)",
            type: "WATCHING"
        }
    })
});

//This is the embed that the user will recive when they join, just edit the provided fields to make your embed!//

client.on("guildMemberAdd", user => {
    const embed = new MessageEmbed()
        .setTitle("Welcome!")
        .setDescription("WelcomeBot is a project by Arman, it's a simple discord bot that messages users on join!")
        .setFooter("WelcomeBot")
        .setImage('https://cdn.discordapp.com/attachments/753624752433922162/776446865951424532/download.jpg');
    user.send(embed);
});

client.on("message", async message => {
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;
    const args= message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd === "ping") {
        const msg = await message.channel.send(`🚀 Pinging...`)
        msg.edit(`🚀 Ping is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms!`);
    };

});

client.login(process.env.TOKEN);