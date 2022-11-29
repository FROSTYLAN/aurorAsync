const mongoose = require("mongoose");
const { mongoURL } = require("../../config.json");

module.exports = {
  name: "ready",
  execute(client) {
    mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.channels.cache.get("996074367651938375").send("Estoy conectado");
    console.log(`Logged in as ${client.user.tag}`);
  },
};
