## Mock Backend Setup

This directory contains a Node.js backend server to manage the vending machine lifecycle, including payments, MQTT commands, and hardware responses. It uses MongoDB for persistent data storage.

### Prerequisites

You must have two services running:
1.  **MongoDB:** The database.
2.  **Mosquitto:** The MQTT broker.

#### 1. Database Setup (MongoDB)

You can run MongoDB locally or use a free cloud service like MongoDB Atlas.

* **Local (Recommended):**
    1.  Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
    2.  Start the MongoDB service.
    3.  The default connection string `mongodb://localhost:27017/vendhydra` should work automatically.

* **Cloud (MongoDB Atlas):**
    1.  Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
    2.  Create a new cluster.
    3.  Get your connection string (make sure to whitelist your IP address) and paste it into your `.env` file.

#### 2. MQTT Broker Setup (Mosquitto)

```bash
# On macOS
brew install mosquitto
brew services start mosquitto

# Using Docker
docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto