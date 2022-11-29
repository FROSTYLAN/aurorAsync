const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const { defaultSuccessColor } = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Obtener avatar de usuario")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(false)
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction, language) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userAvatar = user.displayAvatarURL({ size: 512 });

    const embed = await new EmbedBuilder()
      .setColor(defaultSuccessColor)
      .setTitle(`${user.tag}`)
      .setImage(`${userAvatar}`)
      .setTimestamp()
      .setDescription(`Id: **${interaction.user.id}**`);

    const button = new ButtonBuilder()
      .setLabel(
        `${client.languages.__({ phrase: "avatar.link", locale: language })}`
      )
      .setStyle(ButtonStyle.Link)
      .setURL(`${user.avatarURL({ size: 512 })}`);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
