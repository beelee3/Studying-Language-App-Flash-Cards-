const {contextBridge, ipcRenderer} = require('electron');


contextBridge.exposeInMainWorld('electronApi', {
getDictHira: ()=> ipcRenderer.invoke('get-hira-dict'),
getDictHiraKeys: ()=> ipcRenderer.invoke('get-hira-keys'),

getDictKata: ()=> ipcRenderer.invoke('get-kata-dict'),
getDictKataKeys: ()=> ipcRenderer.invoke('get-kata-keys'),

getChart: ()=> ipcRenderer.invoke('get-chart'),
setNotes: (dictType, romaji, newNotes)=> ipcRenderer.send('set-notes',dictType, romaji, newNotes),

getQuiz: ()=> ipcRenderer.invoke('get-quiz'),

});



// ipcMain.handle('get-hira-dict', getDictHira);
// ipcMain.handle('get-hira-keys', getDictHiraKeys);
// ipcMain.handle('get-kata-dict', getDictKata);
// ipcMain.handle('get-kata-keys', getDictKataKeys);