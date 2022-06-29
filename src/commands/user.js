const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  async execute(interaction) {
    await interaction.reply(
      `USER DATA
      Your tag: ${interaction.user.tag}
      Your id: ${interaction.user.id}`
    );
  },
};
