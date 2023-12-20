const {ipcMain} = require('electron')
const Dictionary = require('../src/logic/Dictionary');
// const Character = require('../src/logic/Dictionary');

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

    ipcMain.on('set-notes', setNotes);
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


// async function setNotes(event, dictType, romaji, newNotes){
async function setNotes(event, dictType, romaji, newNotes){

  console.log(`setNotes call from appHandler`);

  console.log(dictType, romaji, newNotes);
  // console.log(`dictType`,dictType,`romaji ${romaji}, newNotes: ${newNotes}`);
  if(dictType == "hira"){

    var newObj = structuredClone(dictHira.Dictionary[romaji]);
    newObj.notes = newNotes;
    dictHira.replaceNotesInFile(dictHira.Dictionary[romaji], newObj)

    dictHira.Dictionary[romaji].notes = newNotes;
  }
    
    // dictHira[romaji].notes =  newNotes;

  else if (dictType == "kata"){

    var newObj = structuredClone(dictKata.Dictionary[romaji]);
    newObj.notes = newNotes;
    dictKata.replaceNotesInFile(dictKata.Dictionary[romaji], newObj)
    
    dictKata.Dictionary[romaji].notes = newNotes;
  }
    
    // dictKata[romaji].notes =  newNotes;
  
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