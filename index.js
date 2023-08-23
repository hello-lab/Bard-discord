const { Client, GatewayIntentBits } = require( 'discord.js')
const { TextServiceClient } = require("@google-ai/generativelanguage");

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyASil0l7fXjVvoZQSiV88OfRccclObti-w";

const gclient = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Create a new OpenAI Chat API client

const http = require('http');
http.createServer((req, res) => {
res.writeHead(200, {
    'Content-type': 'text/plain'
});
    res.write('Hey');
    res.end();
}).listen(4000);



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
				if (i==0)
				message.reply(rez[i])
			else 
					message.channel.send(rez[i])
		}
		else message.reply(res)
		}
    
		catch (error) {
      console.error('Error:', error);
      message.reply('Sorry, an error occurred while processing your request.\n'+error);
    }
  });
    } catch (error) {
      console.error('Error:', error);
      message.reply('Sorry, an error occurred while processing your request.\n'+error);
    }
  }

	else if (message.channel.name=="ai-chat"){
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
  "threshold": "BLOCK_ONLY_HIGH"},
			{"category": "HARM_CATEGORY_VIOLENCE",
  "threshold": "BLOCK_ONLY_HIGH"},
			{"category": "HARM_CATEGORY_SEXUAL",
  "threshold": "BLOCK_ONLY_HIGH"},
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
				if (i==0)
				message.reply(rez[i])

			else 
					message.channel.send(rez[i])
		}
		
		else {
			try {
			message.reply(res)}
			catch(er){
		message.reply("ERROR CODE - 168")
		}
		}
		}
    
		catch (error) {
			if (error== undefined) {
				return
			}
      console.error('Error:', error);
      message.reply('Sorry, an error occurred while processing your request.\nYour prompt might be hateful/offensive/sexual if not please take the screenshort and report to <@658666010890600448>');
    }
  });
    } catch (error) {
			if (error== undefined) {
				return
			}
      console.error('Error:', error);
      message.reply('Sorry, an error occurred while processing your request.\nYour prompt might be hateful/offensive/sexual if not please take the screenshort and report to <@658666010890600448>');
    }
	}
});
//discord.com/api/oauth2/authorize?client_id=1130920493524983809&permissions=150528&scope=bot
// Log in to Discord with your bot token
client.login("MTEzMDkyMDQ5MzUyNDk4MzgwOQ.GN3p1n.VlPezVkfokIgAGwyW8YBGTWB3lDdutvsv_QxZ4");


