import { app, BrowserWindow, screen } from 'electron';
import path from 'node:path';

const createWindow = () => {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  const petWindow = new BrowserWindow({
    width: 300,
    height: 320,
    x: width - 330,
    y: 40,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    resizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL;

  if (devServerUrl) {
    petWindow.loadURL(devServerUrl);
  } else {
    petWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
