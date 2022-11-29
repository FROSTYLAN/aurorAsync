const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require("discord.js");
const { defaultSuccessColor } = require("../../../config.json");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Crea una sesión de Youtube")
    .addBooleanOption((option) =>
      option
        .setName("ilimitado")
        .setDescription(
          "Activa esta opción para que la invitación nunca expire. De lo contrario expirará a los 15 minutos."
        )
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async run(client, interaction, language) {
    await interaction.reply({
      content: client.languages.__({
        phrase: "youtube.loading",
        locale: language,
      }),
    });

    if (!interaction.member.voice.channel)
      return interaction.editReply({
        content: client.languages.__({
          phrase: "youtube.noChannel",
          locale: language,
        }),
      });

    if (interaction.options._hoistedOptions[0]?.value) {
      // Crear la invitación
      createTogetherCode(
        client,
        interaction.member.voice.channel.id,
        "755600276941176913",
        0
      )
        .then((invite) => {
          const embed = new EmbedBuilder()
            .setColor(defaultSuccessColor)
            .setDescription(
              `**[Haz click aquí](${invite.code} 'Enlace de Youtube')**`
            );
          return interaction.editReply({ content: " ", embeds: [embed] });
        })
        .catch((e) => {
          if (e == "Ha ocurrido un error al obtener los datos.") {
            const errorembed = new EmbedBuilder()
              .setColor(defaultSuccessColor)
              .setTitle(
                client.languages.__({
                  phrase: "utilities.errorEmbed",
                  locale: language,
                })
              )
              .setDescription(
                client.languages.__({
                  phrase: "utilities.unexpectedError",
                  locale: language,
                })
              );
            return interaction.editReply({
              content: " ",
              embeds: [errorembed],
            });
          } else if (e == "Tu bot no tiene los permisos necesarios.") {
            const errorembed = new EmbedBuilder()
              .setColor(defaultSuccessColor)
              .setTitle(
                client.languages.__({
                  phrase: "utilities.errorEmbed",
                  locale: language,
                })
              )
              .setDescription(
                client.languages.__({
                  phrase: "utilities.noInvitePerms",
                  locale: language,
                })
              );
            return interaction.editReply({
              content: " ",
              embeds: [errorembed],
            });
          }
        });
    } else {
      createTogetherCode(
        client,
        interaction.member.voice.channel.id,
        "755600276941176913",
        900
      )
        .then((invite) => {
          const embed = new EmbedBuilder()
            .setColor(defaultSuccessColor)
            .setDescription(
              `**[Haz click aquí](${invite.code} 'Enlace de Youtube')**`
            );
          return interaction.editReply({ content: " ", embeds: [embed] });
        })
        .catch((e) => {
          if (e == "Ha ocurrido un error al obtener los datos.") {
            const errorembed = new EmbedBuilder()
              .setColor(defaultSuccessColor)
              .setTitle(
                client.languages.__({
                  phrase: "utilities.errorEmbed",
                  locale: language,
                })
              )
              .setDescription(
                client.languages.__({
                  phrase: "utilities.unexpectedError",
                  locale: language,
                })
              );

            return interaction.editReply({
              content: " ",
              embeds: [errorembed],
            });
          } else if (e == "Tu bot no tiene los permisos necesarios.") {
            const errorembed = new EmbedBuilder()
              .setColor(defaultSuccessColor)
              .setTitle(
                client.languages.__({
                  phrase: "utilities.errorEmbed",
                  locale: language,
                })
              )
              .setDescription(
                client.languages.__({
                  phrase: "utilities.noInvitePerms",
                  locale: language,
                })
              );
            return interaction.editReply({
              content: " ",
              embeds: [errorembed],
            });
          }
        });
    }
  },
};

async function createTogetherCode(client, voiceChannelId, applicationID, time) {
  let returnData = {};
  return new Promise((resolve, reject) => {
    fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
      method: "POST",
      body: JSON.stringify({
        max_age: time,
        max_uses: 0,
        target_application_id: applicationID,
        target_type: 2,
        temporary: false,
        validate: null,
      }),
      headers: {
        Authorization: `Bot ${client.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((invite) => {
        if (invite.error || !invite.code) {
          reject("Ha ocurrido un error al obtener los datos.");
        }
        if (invite.code === 50013 || invite.code === "50013") {
          reject("Tu bot no tiene los permisos necesarios.");
        }
        returnData.code = `https://discord.com/invite/${invite.code}`;
        console.log(returnData);
        resolve(returnData);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
