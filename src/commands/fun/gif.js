const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const { defaultErrorColor } = require("../../../config.json");
const { tenor_api_key } = require("../../../config.json");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Buscar un GIF")
    .addStringOption((option) =>
      option
        .setName("búsqueda")
        .setDescription("Ingrese un consulta")
        .setRequired(true)
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction, language) {
    const searchQuery = interaction.options._hoistedOptions[0].value;
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
      searchQuery
    )}&key=${tenor_api_key}&limit=10`;
    axios
      .get(url)
      .then(async (res) => {
        const content = res.data.results[Math.floor(Math.random() * 10)].url;

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel(
              `${client.languages.__({ phrase: "gif.link", locale: language })}`
            )
            .setStyle(ButtonStyle.Link)
            .setURL(content)
        );

        await interaction.reply({ content: content, components: [row] });
      })
      .catch(async (err) => {
        console.log(err);
        const embedErr = new EmbedBuilder()
          .setColor(defaultErrorColor)
          .setTitle("Error")
          .setDescription(
            "Ocurrió un error mientras se ejecutaba este comando..."
          );
        await interaction.reply({
          embeds: [embedErr],
          ephemeral: true,
        });
      });
  },
};
