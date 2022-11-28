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
  async run(client, interaction) {
    const pingEmbed = await new EmbedBuilder()
      .setColor(defaultSuccessColor)
      .setTitle("Información del servidor")
      .setDescription(
        `Nombre del servidor: **${interaction.guild.name}**\nFecha de creación: **${interaction.guild.memberCount}**\nTotal de miembros: **${interaction.guild.createdAt}**`
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
