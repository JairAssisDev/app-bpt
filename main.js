const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.on('form-submit', (event, formData) => {
    // Handle the form data here, e.g., save it, send it to a server, etc.
    console.log(formData);

    // You can send a response back to the renderer process if needed
    mainWindow.webContents.send('form-submitted', 'Data received successfully');
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
