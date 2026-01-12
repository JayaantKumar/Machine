const mqttClient = require("../config/mqtt");
const { TOPIC_TELEMETRY, TOPIC_ACK } = require("../constants/mqttTopics");

module.exports = function simulateDispense(orderId, itemCount) {
  const totalSteps = 10;
  const durationPerStep = (2000 * itemCount) / totalSteps;
  let step = 0;

  const interval = setInterval(() => {
    step++;
    const progress = Math.round((step / totalSteps) * 100);
    const itemNum = Math.min(Math.ceil((progress / 100) * itemCount), itemCount);

    if (progress >= 100) {
      clearInterval(interval);
      mqttClient.publish(TOPIC_ACK, JSON.stringify({ orderId, status: "completed" }));
    } else {
      mqttClient.publish(
        TOPIC_TELEMETRY,
        JSON.stringify({ orderId, progress, currentStep: `Dispensing Drink ${itemNum} of ${itemCount}...` })
      );
    }
  }, durationPerStep);
};
