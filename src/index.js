const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("../config.json");
const { join } = require("path");
const { setInterval } = require("timers");
const { log } = require("console");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();
client.languages = require("i18n");

client.languages.configure({
  locales: ["en", "es"],
  directory: join(__dirname, "locales"),
  defaultLocale: "es",
  retryInDefaultLocale: true,
  ObjectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("WARN" + msg);
  },

  logErrorFn: function (msg) {
    console.log("ERROR" + msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false,
  },
});

setInterval(() => {
  updateStatus();
}, 60000);

async function updateStatus() {
  const guildNum = await client.guilds.cache.size;
  const memberNum = await client.guilds.cache.reduce(
    (prev, guild) => prev + guild.memberCount,
    0
  );
  client.user.setActivity(`Servidores: ${guildNum} Miembros: ${memberNum}`, {
    type: 2,
  });
}

require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);

// Logea al bot en discord
client.login(token);
