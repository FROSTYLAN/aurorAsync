const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const ms = require("ms");
const { defaultSuccessColor } = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ver la latencia y el tiempo de actividad del bot."),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction) {
    const pingEmbed = await new EmbedBuilder()
      .setColor(defaultSuccessColor)
      .setDescription(
        `Latencia: **${client.ws.ping}ms**\nActividad: **${ms(client.uptime)}**`
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
