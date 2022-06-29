const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  async execute(interaction) {
    await interaction.reply(`SERVER DATA
    Server name: ${interaction.guild.name}
    Total members: ${interaction.guild.memberCount}
    Creation date: ${interaction.guild.createdAt}
    Verification level: ${interaction.guild.verificationLevel}`);
  },
};
