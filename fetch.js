const fetch = require("node-fetch")
const discord = require('discord.js-selfbot-v11')
const client = new discord.Client()
const noblox = require("noblox.js")
const env = require("dotenv").config()

async function go(){
    client.login(process.env.USR_TOKEN)

    client.on('ready', () => {
        console.log(`CLIENT: Logged in as ${client.user.tag}`) // If you don't get this msg upon starting the bot, your Discord client token is incorrect
    })
    
    client.on('message', async boba => {
        if (boba.author.bot) return;
            if(boba.content.includes("https://www.roblox.com/games/")){
                const string = boba.content;
                var match = string.match(/\bhttps?:\/\/\S+/gi);
                var string2 = match[0]
                let log = string2.split("/");
                console.log(log[4])
    
                const data = `{"url": "${match}", "serverName": "${boba.guild.name}"}`
    
                fetch('http://localhost:9000/data', {
                    method: 'post',
                    body: data,
                    headers: {'Content-Type': 'application/json'}
                })
        }
    
    })
}

module.exports = go;

