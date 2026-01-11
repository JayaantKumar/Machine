const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// ----------------------------------------------------
// 1) Put Electron's userData (and cache) in a safe folder
//    This avoids Windows "Access is denied" cache errors
// ----------------------------------------------------
const userDataPath = path.join(app.getPath('documents'), 'VendHydraData');
app.setPath('userData', userDataPath);

// ----------------------------------------------------
// 2) Optional: disable GPU shaders disk cache completely
//    (extra safety against those gpu_disk_cache errors)
// ----------------------------------------------------
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');

// Already present in your code - keeps things more stable
app.disableHardwareAcceleration();

const isDev = !app.isPackaged;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1080, // Typical portrait kiosk width
    height: 1920, // Typical portrait kiosk height
    fullscreen: true,
    frame: false,
    kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the app
  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  win.loadURL(startUrl);

  // Open the DevTools automatically if in development
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// --- IPC Handlers ---
// These are mock handlers. Replace with actual hardware logic.

ipcMain.handle('dispense-product', async (event, data) => {
  console.log('IPC: dispense-product received:');
  console.log(data);
  // { slot, productId, addWater, orderId }
  
  // Simulate hardware operation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Simulating dispense for Order ${data.orderId} from slot ${data.slot}`);
  return { success: true, message: 'Dispense signal sent' };
});

ipcMain.handle('check-hardware-status', async (event) => {
  console.log('IPC: check-hardware-status received');
  
  // Simulate a hardware check
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    status: 'ok',
    waterLevel: 85, // percentage
    temperature: 4, // celsius
  };
});

ipcMain.handle('get-payment-status', async (event, orderId) => {
  console.log(`IPC: get-payment-status received for Order ${orderId}`);
  
  // This is where you would poll your payment gateway API
  // For this demo, we'll just return 'pending' a few times then 'success'
  // Note: This demo logic is in PaymentScreen.jsx, this is just the bridge
  
  return { status: 'pending' }; // or 'success' or 'failed'
});
