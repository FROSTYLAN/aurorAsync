const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ver la latencia y el tiempo de actividad del bot."),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const pingEmbed = await new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(
        `Latencia: **${client.ws.ping}**\nActividad: **${ms(client.uptime)}**`
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
