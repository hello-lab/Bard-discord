const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

// Create a new Discord client
const { Client, GatewayIntentBits } = require('discord.js')
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




const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyCTCJQTebHLQ1YsKqvfv7aWVocwtNsQEzM";

async function chat(prommpt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,

        topP: 1,

    };

    const safetySettings = [{
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,

    });

    const result = await chat.sendMessage(prommpt);
    const response = result.response;
    var res = response.text()
        //console.log(response.text());
    return (res)


}

// Event triggered when the bot is ready and connected to Discord
client.on('ready', () => {
    console.log('Logged in as' + client.user.tag);
});


//image_url = response.data.data[0].url;
//console.log(image_url)




// Event triggered when a new message is sent in a Discord server
client.on('messageCreate', async(message) => {
    // Ignore messages sent by the bot itself
    //	console.log(message.channel)
    if (message.author.bot) return;

    // Check if the message starts with the bot's mention
    const mentionRegex = new RegExp(`^<@${client.user.id}>`);
    //message.channelId
    if (message.channel.name == "ezio-tasks" || message.channel.name == "ai-chat") {
        // Extract the message content without the mention
        const prompt = message.content.replace(mentionRegex, '').trim();
        if (prompt
            .includes("--not-for-ai--"))
            return
        try {
            chat(prompt)
                .then((result) => {
                    try {
                        console.log(result)
                        res = result
                        if (res.length > 2000) {
                            rez = res.match(/(.|[\r\1999]){1,1999}/g)
                            console.log(rez)
                            for (i = 0; i < rez.length; i++)
                                if (i == 0)
                                    message.reply(rez[i])
                                else
                                    message.channel.send(rez[i])
                        } else message.reply(res)
                    } catch (error) {
                        console.error('Error:', error);
                        message.reply('Sorry, an error occurred while processing your request.\n' + error);
                    }
                });
        } catch (error) {
            console.error('Error:', error);
            message.reply('Sorry, an error occurred while processing your request.\n' + error);
        }
    }


});
//discord.com/api/oauth2/authorize?client_id=1130920493524983809&permissions=150528&scope=bot
// Log in to Discord with your bot token
client.login("MTEzMDkyMDQ5MzUyNDk4MzgwOQ.G77FLQ.aBkMWQdumuvaQRvHbktub3XO8dpxwwDQ9DGnCQ");
