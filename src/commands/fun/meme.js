const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const axios = require("axios");
const {
  defaultSuccessColor,
  defaultErrorColor,
} = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("Meme random"),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction) {
    const url = "https://meme-api.herokuapp.com/gimme";
    axios
      .get(url)
      .then(async (res) => {
        const embed = new EmbedBuilder()
          .setColor(defaultSuccessColor)
          .setTitle(`${res.data.title}`)
          .addFields(
            {
              name: "Autor",
              value: `${res.data.author}`,
              inline: true,
            },
            {
              name: "Votos",
              value: `${res.data.ups}`,
              inline: true,
            }
          )
          .setImage(`${res.data.url}`)
          .setFooter({
            text: `Subreddit - ${res.data.subreddit}`,
          });

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Post Link")
            .setStyle(ButtonStyle.Link)
            .setURL(`${res.data.postLink}`)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
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
