const guildModel = require("../models/guilds.js");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    const Guild = interaction.member.guild;

    await guildModel.findOne({ guildId: interaction.guildId }).then((s, e) => {
      if (e) return console.error(e);
      if (s) {
        Guild.lang = s.lang;
      } else {
        const newGuild = new guildModel({
          guildId: interaction.guildId.toString(),
          lang: "es",
        });
        newGuild.save().catch((e) => console.log(e));
      }
    });

    try {
      const language = interaction.member.guild.lang;
      console.log(language);
      await command.run(client, interaction, language);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
