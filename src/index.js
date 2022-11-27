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

// Avisará cuando el bot esté listo
client.once("ready", () => {
  client.channels.cache.get("996074367651938375").send("Estoy conectado");
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
  console.log("a");
  client.channels.cache.get("996074367651938375").send("ok!");
  if (message.content.startsWith("ok")) {
  }
});

// Clase nativa de Javascript
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Establecer un nuevo elemento en la Colección
  // Con la clave como nombre del comando y el valor como módulo exportado
  client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Logea al bot en discord
client.login(token);
