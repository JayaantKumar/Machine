const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Sends a dispense command to the main process.
   * @param {object} data - { slot, productId, addWater, orderId }
   * @returns {Promise} Promise object represents the result of the dispense command.
   */
  dispenseProduct: (data) => ipcRenderer.invoke('dispense-product', data),

  /**
   * Checks the hardware status.
   * @returns {Promise} Promise object represents hardware status { status, waterLevel, temperature }
   */
  checkHardware: () => ipcRenderer.invoke('check-hardware-status'),

  /**
   * Polls for payment status for a given orderId.
   * @param {string} orderId
   * @returns {Promise} Promise object represents payment status { status: 'pending' | 'success' | 'failed' }
   */
  getPaymentStatus: (orderId) => ipcRenderer.invoke('get-payment-status', orderId),
});