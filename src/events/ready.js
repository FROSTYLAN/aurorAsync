module.exports = {
  name: "ready",
  execute(client) {
    client.channels.cache.get("996074367651938375").send("Estoy conectado");
    console.log(`Logged in as ${client.user.tag}`);
  },
};
