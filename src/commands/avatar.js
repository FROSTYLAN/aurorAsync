const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");

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
  async execute(client, interaction) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userAvatar = user.displayAvatarURL({ size: 512 });

    const embed = await new EmbedBuilder()
      .setColor("Aqua")
      .setTitle(`${user.tag}`)
      .setImage(`${userAvatar}`)
      .setTimestamp()
      .setDescription(`Id: **${interaction.user.id}**`);

    const button = new ButtonBuilder()
      .setLabel("Avatar Link")
      .setStyle(ButtonStyle.Link)
      .setURL(`${user.avatarURL({ size: 512 })}`);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
