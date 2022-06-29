const { Client, Intents } = require("discord.js");
const { token } = require("../config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
  console.log("conectado!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "server") {
    await interaction.reply(
      `${interaction.guild.name}
      Total members: ${interaction.guild.memberCount}
      Creation date: ${interaction.guild.createdAt}
      Verification level: ${interaction.guild.verificationLevel}`
    );
  } else if (commandName === "user") {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});

client.login(token);
