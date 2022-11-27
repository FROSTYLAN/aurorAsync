const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const { tenor_api_key } = require("../../config.json");
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
  async execute(client, interaction) {
    const searchQuery = interaction.options.getString("search_query");
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
      searchQuery
    )}&key=${tenor_api_key}&limit=10`;
    axios
      .get(url)
      .then(async (res) => {
        const content = res.data.results[Math.floor(Math.random() * 10)].url;

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("GIF Link")
            .setStyle(ButtonStyle.Link)
            .setURL(content)
        );

        await interaction.reply({ content: content, components: [row] });
      })
      .catch(async (err) => {
        console.log(err);
        await interaction.reply({
          content: "Ocurrió un error mientras se ejecutaba este comando...",
          ephemeral: true,
        });
      });
  },
};
