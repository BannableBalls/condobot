const express = require("express")
const disbut = require('discord-buttons');
const discord = require("discord.js")
const noblox = require("noblox.js")
const client = new discord.Client()
const getgames = require('./fetch.js')
getgames()
const env = require('dotenv').config()

disbut(client);
const app = express()
const port = 9000

app.use(express.json())


//©Hidd3n Utilities 2021

app.listen(
    port,
    () => console.log(`app online`)
)
app.post('/data', async (req, res) => {
    const url = req.body;
    const serverName = req.body;
    
    if(!url){
       return res.send("sussy barker")
    }
    if(!serverName){
       return res.send("ok and?")
    }
    

    let log = url.url.split("/");


    await noblox.getPlaceInfo(log[4]).then((res) => {
        const channel = client.channels.cache.find(channel => channel.id === process.env.LOGGING_CHANNELID)

        const embed = new discord.MessageEmbed()

        .setAuthor("Game logged")
        .setDescription("**condobot | https://github.com/xiudeveloper/condobot/**") // Change this if you'd like, I don't care.
        .setURL(url.url)
        .setColor('#cf4848')
        .addField('Name', res.Name, true)
        .addField('Players', res.OnlineCount, true)
        .addField('Created at', res.Created, true)
        .addField('Max Players', res.MaxPlayers, true)
        .addField('Playable', res.IsPlayable, true)
        .addField('Creator Name', res.Builder, true)
	.addField("Fake Games", "This game may be fake. All this bot does is log messages sent from a different server.", true)

        
        const linkbutton = new disbut.MessageButton()
        linkbutton.setStyle("url")
        linkbutton.setLabel("🎮 Play")
        linkbutton.setURL(url.url)

        const row = new disbut.MessageActionRow()
        .addComponent([linkbutton])

        channel.send(embed, {component: row})

    })


});

client.on('ready', () => {
    console.log(`SERVER: Logged in as ${client.user.tag}`)
})


client.login(process.env.BOT_TOKEN)
