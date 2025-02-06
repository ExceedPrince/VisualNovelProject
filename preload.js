const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  closeApp: () => ipcRenderer.send('close-app'),
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
  checkIsFullscreen: () => ipcRenderer.invoke('is-fullscreen'),
  saveSlotImage: (slotNumber, imageData) => ipcRenderer.invoke('save-slot-image', slotNumber, imageData),
});