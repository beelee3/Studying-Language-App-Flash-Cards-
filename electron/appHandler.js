const {ipcMain} = require('electron')
const Dictionary = require('../src/logic/Dictionary');

var dictHira = new Dictionary("hiragana");
var dictKata = new Dictionary("katakana");


function initDict(){
    dictHira.initialize();
    dictKata.initialize();
}

function dicIpcHandlers(){
    ipcMain.handle('get-hira-dict', getDictHira);
    ipcMain.handle('get-hira-keys', getDictHiraKeys);
    ipcMain.handle('get-kata-dict', getDictKata);
    ipcMain.handle('get-kata-keys', getDictKataKeys);
}

async function getDictHira(){
  const data = await dictHira.getDictionary();
  // console.log(`get dict hiragana ${data}`);
  return data;
  // return await dictHira.getDictionary();
}

async function getDictHiraKeys(){
  const data =  await dictHira.getKeyArr();
  // console.log(`get keys hiragana ${data}`);
  return data;
  // return await dictHira.getDictionary();
}


async function getDictKata(){
  return await dictKata.getDictionary();
}
async function getDictKataKeys(){
  return await dictKata.getKeyArr();
}

module.exports = {dictHira,dictKata};
module.exports = {
    getDictHira,
    getDictHiraKeys,

    getDictKata,
    getDictKataKeys,

    initDict,
    dicIpcHandlers,
};