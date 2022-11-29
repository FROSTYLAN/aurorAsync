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
    .setDescription("Latencia y tiempo de actividad del bot."),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction, language) {
    const pingEmbed = await new EmbedBuilder()
      .setColor(defaultSuccessColor)
      .setDescription(
        `${client.languages.__({
          phrase: "ping.latency",
          locale: language,
        })}: **${client.ws.ping}ms**\n${client.languages.__({
          phrase: "ping.activity",
          locale: language,
        })}: **${ms(client.uptime)}**`
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
