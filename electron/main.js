// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const { create } = require('node:domain');
const path = require('node:path')

const Dictionary = require('../src/logic/Dictionary');
const fs = require('fs');

const {getDictHira,
  getDictHiraKeys,
  getDictKata,
  getDictKataKeys,
  initDict,
  dicIpcHandlers} = require('./appHandler');

// const newWin = new BrowserWindow({width: 800, height: 600});
// newWin.loadURL('https://github.com');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false,
    //   enableRemoteModule: true,
    //   // preload: path.join(__dirname, 'preload.js'),
    // },
  });
  // and load the index.html of the app.
  mainWindow.loadFile('./electron/index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  initDict();//appHandler.js
  dicIpcHandlers(); //from  appHandler.jks
  ipcMain.handle('get-chart', createChartWindow);
  createWindow();

  // ipcMain.on('get-hira-dict', getDictHira);
  // ipcMain.on('get-hira-keys', getDictHiraKeys);

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
      createWindow();
  })
})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const createChartWindow = () => {
  const childWin = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  childWin.loadFile('./electron/chart/chart.html');
}