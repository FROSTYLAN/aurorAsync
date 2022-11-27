const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Información del servidor"),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const pingEmbed = await new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("Información del servidor")
      .setDescription(
        `Nombre del servidor: **${interaction.guild.name}**\nFecha de creación: **${interaction.guild.memberCount}**\nTotal de miembros: **${interaction.guild.createdAt}**`
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
