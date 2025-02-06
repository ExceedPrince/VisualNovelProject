// Importing required modules from Electron
const { app, session, BrowserWindow, ipcMain  } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

let mainWindow;

// Function to create the browser window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload script
      nodeIntegration: true
    }
  });

  // Loading index.html into the window
  mainWindow.loadFile('index.html');
}

// When Electron is ready, create the window
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('close-app', () => {
  app.quit();
});

ipcMain.on('toggle-fullscreen', () => {
  if (mainWindow) {
    const isFullScreen = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFullScreen);
  }
});

ipcMain.handle('is-fullscreen', () => {
  return mainWindow.isFullScreen();
});

ipcMain.handle('save-slot-image', async (event, slotNumber, imageData) => {
  try {
      const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
      const saveDir = path.join(app.getPath('userData'), 'CL_save_images');
      const filePath = path.join(saveDir, `CL_save_slot_${slotNumber}.png`);

      if (!fs.existsSync(saveDir)) {
          fs.mkdirSync(saveDir, { recursive: true });
      }

      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      const fileUrl = pathToFileURL(filePath).href;
      return fileUrl;
  } catch (error) {
      console.error('Error at saving image:', error);
      return null;
  }
});