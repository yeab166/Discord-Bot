const { Client, GatewayIntentBits } = require('discord.js');
const express= require('express');
const {connectToMongoDB}= require('./connection/connectTo');
const route= require('./routes/url');
const axios = require('axios');
              require('dotenv').config();

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/shorten',route);

connectToMongoDB("mongodb://127.0.0.1:27017/shortURL-2");

app.listen(3000,()=>{
  console.log(`Express server running on port 3000`);
})

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ] 
});

client.on("messageCreate",async (Message)=>{
  if(Message.author.bot) return;

  if(Message.content.startsWith("create")){
    //The .trim() function in JavaScript is a string method 
    // that removes any extra whitespace (spaces, tabs, or newlines) 
    // from both the beginning and the end of a string.
    const url = Message.content.split("create ")[1]?.trim();
    if (!url) 
      return Message.reply('Please provide a URL after `create`.');
    
    try{
      const response = await axios.post('http://localhost:3000/shorten', { url });
      const shortCode = response.data.shortURL;
      const shortLink = `http://localhost:3000/shorten/${shortCode}`;

      return Message.reply(
        `Short URL created: ${shortLink}`
      );
    }catch (err) {
      console.error('Axios error:', err.response?.status, err.response?.data || err.message);
      return Message.reply('❌ Failed to create short URL.');
    }
  }
})

client.on("interactionCreate",interaction=>{
  interaction.reply(
    "Pong!"
  )
})

client.login(
  process.env.DISCORD_TOKEN
);
