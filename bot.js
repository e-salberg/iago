const token = require('./config/json');
const fetch = require("node-fetch");
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

const sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "tilt", "smurf"];

const encouragementMsg = "keep it pma, keep it bsj";

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`) 
});

client.on("messageCreate", msg => {
    if (msg.author.bot) return;

    if (msg.content === "!q") {
        getQuote().then(quote => msg.channel.send(quote))
    }

    if (sadWords.some(word => msg.content.includes(word))) {
        msg.reply(encouragementMsg);
    }

    if (msg.content === "ping") {
        msg.channel.send("pong");
    }
});

client.login(token);