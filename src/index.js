// Módulo de sistema de archivos nativo de Node.
const fs = require("node:fs");
// Módulo de utilidad de ruta nativo de node, ayuda a construir rutas.
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("../config.json");

// Creamos nueva instancia de cliente (bot)
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);

// Logea al bot en discord
client.login(token);
