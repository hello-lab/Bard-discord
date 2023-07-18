const { Client, GatewayIntentBits } = require( 'discord.js')
const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyASil0l7fXjVvoZQSiV88OfRccclObti-w";

const gclient = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Create a new OpenAI Chat API client

const express =require('express')
const app = express();
const port = 3000;

app.get('/', function (req, res) {
	
	client.on('ready', () => {
  res.send('Logged in as'+client.user.tag);
});
	});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


 const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Event triggered when the bot is ready and connected to Discord
client.on('ready', () => {
  console.log('Logged in as'+ client.user.tag);
});


//image_url = response.data.data[0].url;
//console.log(image_url)




// Event triggered when a new message is sent in a Discord server
client.on('messageCreate', async (message) => {
  // Ignore messages sent by the bot itself
//	console.log(message.channel)
  if (message.author.bot) return;

  // Check if the message starts with the bot's mention
  const mentionRegex = new RegExp(`^<@${client.user.id}>`);
	message.channelId
  if (message.channel.name=="ezio-tasks") {
    // Extract the message content without the mention
    const prompt = message.content.replace(mentionRegex, '').trim();

    try {
  gclient
  .generateText({
    model: MODEL_NAME,
		safetySettings:[
			{"category": "HARM_CATEGORY_UNSPECIFIED",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_DEROGATORY",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_TOXICITY",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_VIOLENCE",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_SEXUAL",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_MEDICAL",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_DANGEROUS",
  "threshold": "BLOCK_NONE"}
									 
									 
									 
									 ],
    prompt: {
      text: prompt,
    },
  })
  .then((result) => {
		try{
		console.log(result[0])
res=result[0].candidates[0].output
		if(res.length>2000)
		{
			rez= res.match(/(.|[\r\1999]){1,1999}/g)
			console.log(rez)
			for(i=0;i<rez.length;i++)
				message.channel.send(rez[i])
		}
		else message.channel.send(res)
		}
    
		catch (error) {
      console.error('Error:', error);
      message.channel.send('Sorry, an error occurred while processing your request.');
    }
  });
    } catch (error) {
      console.error('Error:', error);
      message.channel.send('Sorry, an error occurred while processing your request.');
    }
  }

	else if (message.channel.name=="ezio-chat"){
		const prompt = message.content.replace(mentionRegex, '').trim();
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
		const ggclient = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
    try {
  ggclient
  .generateMessage({
    model: "models/chat-bison-001" ,
    prompt: {
      messages: [{ content: prompt }],},
			safetySettings:[
			{"category": "HARM_CATEGORY_UNSPECIFIED",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_DEROGATORY",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_TOXICITY",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_VIOLENCE",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_SEXUAL",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_MEDICAL",
  "threshold": "BLOCK_NONE"},
			{"category": "HARM_CATEGORY_DANGEROUS",
  "threshold": "BLOCK_NONE"}
									 
									 
									 
									 ]
  
  })
  .then((result) => {
		try{
		console.log(result[0].candidates[0])
res=result[0].candidates[0].content
		if(res.length>2000)
		{
			rez= res.match(/(.|[\r\1999]){1,1999}/g)
			console.log(rez)
			for(i=0;i<rez.length;i++)
				message.channel.send(rez[i])
		}
		
		else message.channel.send(res)
		}
    
		catch (error) {
      console.error('Error:', error);
      message.channel.send('Sorry, an error occurred while processing your request.');
    }
  });
    } catch (error) {
      console.error('Error:', error);
      message.channel.send('Sorry, an error occurred while processing your request.');
    }
	}
});

// Log in to Discord with your bot token
client.login("NzkzMTI3ODAzMDQxMjE4NTkw.G12FlP.T14qjCREl2k6fpzBQC_k_ANJggOQBxWqvbKipw");


