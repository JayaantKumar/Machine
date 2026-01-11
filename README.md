🥤 VendHydra - Smart Vending Machine Project

Welcome! This guide will help you set up and run the VendHydra software on a Windows computer or Raspberry Pi.

This system consists of two main parts (folders):

vendhydra-machine (The Brain/Backend): Handles payments, database, and hardware control.

VendHydra (The Screen/Frontend): The touch interface customers see.

✅ Phase 1: Install Required Software (Do this once)

Before downloading the project, you need to install these 3 tools on your computer.

1. Node.js (The Runtime)

Download the LTS Version (Recommended for Most Users) from nodejs.org.

Run the installer and click "Next" through everything.

2. Git (To download the code)

Download "64-bit Git for Windows Setup" from git-scm.com.

Install with default settings.

3. VS Code (The Editor)

Download from code.visualstudio.com.

This is where you will run the commands.

4. MongoDB (The Database)

Download "MongoDB Community Server" (MSI package) from mongodb.com.

Important: During installation, check the box that says "Install MongoDB as a Service".

Also check "Install MongoDB Compass" (optional but helpful).

📥 Phase 2: Download the Project

Open VS Code.

Open a Terminal (Click Terminal > New Terminal at the top).

Run this command to download the project (replace URL with your actual repo URL):

git clone [https://github.com/YOUR_USERNAME/VendHydra-Project.git](https://github.com/YOUR_USERNAME/VendHydra-Project.git)


(Or simply unzip the project folder if you received it as a ZIP file).

⚙️ Phase 3: Setup "The Brain" (Backend)

We need to set up the server that processes orders.

In VS Code, go to File > Open Folder and select the vendhydra-machine folder.

Open a Terminal (Ctrl + ~).

Install Dependencies: Run this command and wait for it to finish:

npm install


Configure Settings:

Create a new file named .env.

Paste the following inside it:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/vendhydra
MQTT_URL=mqtt://broker.hivemq.com:1883

# Payment Keys (Test Mode)
CASHFREE_APP_ID=your_test_app_id_here
CASHFREE_SECRET_KEY=your_test_secret_key_here
CASHFREE_ENV=TEST


Test it: Run npm run dev.

You should see: [DB] Connected to MongoDB and [API] Backend running.

If successful, stop it by pressing Ctrl + C.

🖥️ Phase 4: Setup "The Screen" (Frontend)

Now let's set up the visual interface.

In VS Code, go to File > Open Folder and select the VendHydra folder (the other folder).

Open a Terminal.

Install Dependencies:

npm install


Configure Settings:

Create a new file named .env.

Paste this:

VITE_API_URL=http://localhost:3000/api
VITE_MACHINE_ID=vm_001


🚀 Phase 5: Turning on the Machine (Daily Routine)

To run the full vending machine, you need 3 Terminals running at the same time.

Step 1: Start the Brain 🧠

Open the vendhydra-machine folder in VS Code.

Open a Terminal and run:

npm run dev


Wait for "Connected to MongoDB". Keep this running.

Step 2: Start the Web Server 🌐

Open a New Terminal (Click the + icon in the terminal panel).

Navigate to the VendHydra folder:

cd ../VendHydra


Run:

npm run dev


Wait until you see "Local: http://localhost:5173/". Keep this running.

Step 3: Launch the Kiosk App 📱

Open another New Terminal (You should now have 3).

Make sure you are in the VendHydra folder.

Run:

npx electron .
