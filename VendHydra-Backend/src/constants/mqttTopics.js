const MACHINE_ID = process.env.MACHINE_ID || "vm_001";

module.exports = {
  TOPIC_COMMAND: `vending/${MACHINE_ID}/command`,
  TOPIC_TELEMETRY: `vending/${MACHINE_ID}/telemetry`,
  TOPIC_ACK: `vending/${MACHINE_ID}/ack`,
};
