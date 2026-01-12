const mqtt = require("mqtt");
const Order = require("../models/Order");
const { TOPIC_ACK, TOPIC_TELEMETRY } = require("../constants/mqttTopics");

const client = mqtt.connect(process.env.MQTT_URL);

client.on("message", async (topic, msg) => {
  const payload = JSON.parse(msg.toString());

  if (topic === TOPIC_TELEMETRY) {
    await Order.updateOne({ orderId: payload.orderId }, payload);
  }

  if (topic === TOPIC_ACK) {
    await Order.updateOne({ orderId: payload.orderId }, { status: "COMPLETED" });
  }
});

client.subscribe([TOPIC_TELEMETRY, TOPIC_ACK]);
