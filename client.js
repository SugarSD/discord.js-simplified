const { Client: RawClient, Events, GatewayIntentBits } = require('discord.js');

class Client {

    constructor(token, intentsArray) {
        //Add "GatewayIntentBits" to the beginning of each intent in the "intentsArray"
        this.intents = intentsArray.map(intents => GatewayIntentBits[intents]);
        this.client = new RawClient({ intents: this.intents });
        this.token = token;
        this.prefix = "";
        this.commands = [];
    }

    setPrefix(prefix) {
        //Sets the prefix for "onCommand()"

        this.prefix = prefix;
    }

    on(event, callback) {
        //Registers a new event

        this.client.on(Events[event], callback)
    }

    onCommand(command, callback) {
        //Registers a new prefix command

        this.commands.push({name: command, cb: callback});
        //Push command to command array
    }

    ready(callback) {
        //Once client is ready it will run this callback

        this.client.once(Events.ClientReady, () => callback());
    }

    login() {
        //Initialize discord bot

        if(this.commands.length > 0) {
            //Check if there's any commands in the commands array

            this.prefix === "" ? console.warn("Bot will respond to commands with no prefix. Use 'setPrefix(prefix)'") : null;
            //Check if prefix is set and warn if not

            this.client.on(Events.MessageCreate, (message) => {
                for (let i = 0; i < this.commands.length; i++) {
                    if(message.content.startsWith(this.prefix + this.commands[i].name)) {
                        this.commands[i].cb(message);
                    }
                }
            })
        }
        //Login
        this.client.login(this.token);
    }
}


//Export Client
module.exports = Client;