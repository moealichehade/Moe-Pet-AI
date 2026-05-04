const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('desktopPet', {
  appName: 'Moe Pet AI Desktop Companion'
});
