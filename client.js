const { Client: RawClient, Events, GatewayIntentBits } = require('discord.js');

class Client {
    constructor(token, intentsArray) {
        //Add "GatewayIntentBits" to the beginning of each intent in the "intentsArray"
        this.intents = intentsArray.map(intents => GatewayIntentBits[intents]);
        this.client = new RawClient({ intents: this.intents });
    }

    on(event) {
        const client = this.client;
    }

    ready(listeners) {
        //Wait for client to be ready and then run "client.on" listeners
        this.client.once(Events.ClientReady, listeners(this.on));
    }
}

export default Client;