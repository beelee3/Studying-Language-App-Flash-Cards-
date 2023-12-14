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
    
    ipcMain.handle('set-notes',setNotes);
}

async function getDictHira(){
  const data = await dictHira.getDictionary();
  // console.log(`get dict hiragana ${data}`);
  // const data = await dictHira;
  return data;
  // return await dictHira.getDictionary();
}

async function getDictHiraKeys(){
  const data =  await dictHira.getKeyArr();
  console.log(`getting keys`);
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

async function setNotes(dictType, romaji, newNotes){
  // if((typeof dictType) != String)
  //   return false;

  console.log(`set notes call: `,dictType," romaji:",romaji," newNotes: ",newNotes);
  if(dictType == "hira"){
    dictHira[romaji].notes = await newNotes;
  }

  else if (dictType == "kata"){
    dictKata[romaji].notes = await newNotes;
  }
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