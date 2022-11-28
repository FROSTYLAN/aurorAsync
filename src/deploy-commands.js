const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { clientId, token } = require("../config.json");

const rest = new REST({ version: "10" }).setToken(token);

createSlash();

async function createSlash() {
  try {
    const commands = [];
    fs.readdirSync("./src/commands").forEach(async (category) => {
      const commandFiles = fs
        .readdirSync(`./src/commands/${category}`)
        .filter((archivo) => archivo.endsWith(".js"));
      for (const archivo of commandFiles) {
        const command = require(`./commands/${category}/${archivo}`);
        commands.push(command.data.toJSON());
      }
    });
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });
    console.log("Successfully registered application commands.");
  } catch (e) {
    console.error(e);
  }
}
