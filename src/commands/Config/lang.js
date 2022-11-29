const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const { defaultSuccessColor } = require("../../../config.json");
const GuildModel = require("../../models/guilds.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("language")
    .setDescription("Cambiar el lenguaje del servidor.")
    .addStringOption((option) =>
      option
        .setName("lang")
        .setDescription("Lenguaje del servidor")
        .setRequired(true)
        .addChoices(
          { name: "Español", value: "es" },
          { name: "Inglés", value: "en" }
        )
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction) {
    const language = interaction.options._hoistedOptions[0].value;

    // Respuesta si no es administradors
    if (!interaction.memberPermissions.has("Administrator")) {
      const embedErr = new EmbedBuilder().setDescription(
        client.languages.__({
          phrase: "lang.noAdministrator",
          locale: language,
        })
      );
      return await interaction.reply({ embeds: [embedErr] });
    }

    // Verificar si tiene el valor o agregar uno nuevo.
    await GuildModel.findOne({ guildId: interaction.guildId }).then((s, e) => {
      if (e) return console.error(e);
      if (s) {
        s.lang = language;
        s.save().catch((e) => console.log(e));
      } else {
        const newGuild = new GuildModel({
          guildId: interaction.guild.toString(),
          lang: language,
        });
        newGuild.save().catch((e) => console.log(e));
      }
    });

    // Envó de respuesta
    const embedRes = new EmbedBuilder()
      .setDescription(
        client.languages.__({
          phrase: "lang.newLanguage",
          locale: language,
        })
      )
      .setColor(defaultSuccessColor);
    return interaction.reply({ embeds: [embedRes] });
  },
};
