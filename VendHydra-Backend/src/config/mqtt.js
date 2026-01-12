const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_URL);

client.on("connect", () => {
  console.log("[MQTT] Connected");
});

module.exports = client;
