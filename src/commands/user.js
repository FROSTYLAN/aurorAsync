const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const pingEmbed = await new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("Información de usuario")
      .setDescription(
        `Tag: **${interaction.user.tag}**\nId: **${interaction.user.id}**`
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
