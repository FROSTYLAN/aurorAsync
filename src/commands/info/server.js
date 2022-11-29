const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const { defaultSuccessColor } = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Información del servidor"),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction, language) {
    const pingEmbed = await new EmbedBuilder()
      .setColor(defaultSuccessColor)
      .setTitle(
        client.languages.__({ phrase: "server.title", locale: language })
      )
      .setDescription(
        `${client.languages.__({
          phrase: "server.name",
          locale: language,
        })}: **${interaction.guild.name}**\n${client.languages.__({
          phrase: "server.totalMembers",
          locale: language,
        })}: **${interaction.guild.memberCount}**\n${client.languages.__({
          phrase: "server.created",
          locale: language,
        })}: **${interaction.guild.createdAt}**`
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
