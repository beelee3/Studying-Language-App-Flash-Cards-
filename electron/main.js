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

const {dictHira,dictKata} = require('./appHandler');

// const newWin = new BrowserWindow({width: 800, height: 600});
// newWin.loadURL('https://github.com');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
// app.on('ready', function(){
  // ipcMain.handle('get-hira-dict', getDictHira);
  // ipcMain.handle('get-hira-keys', getDictHiraKeys);
  // ipcMain.handle('get-kata-dict', getDictKata);
  // ipcMain.handle('get-kata-keys', getDictKataKeys);

  dicIpcHandlers();
  
  createWindow()

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

initDict();



// ipcMain.on("init", ()=>{
//   dictHira.initialize();
//   dictKata.initialize();
// })


// var dictHira = new Dictionary("hiragana");
// dictHira.initialize();

// var dictKata = new Dictionary("katakana");
// dictKata.initialize();


//  async function getDictHira(){
//   const data = await dictHira.getDictionary();
//   // console.log(`get dict hiragana ${data}`);
//   return data;
//   // return await dictHira.getDictionary();
// }

// async function getDictHiraKeys(){
//   const data =  await dictHira.getKeyArr();
//   // console.log(`get keys hiragana ${data}`);
//   return data;
//   // return await dictHira.getDictionary();
// }


// async function getDictKata(){
//   return await dictKata.getDictionary();
// }
// async function getDictKataKeys(){
//   return await dictKata.getKeyArr();
// }
