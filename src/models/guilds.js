const mongoose = require("mongoose");

const model = new mongoose.Schema(
  {
    guildId: { type: "string" },
    lang: { type: "string" },
  },
  { collection: "Guilds" }
);

module.exports = mongoose.model("Guilds", model);
