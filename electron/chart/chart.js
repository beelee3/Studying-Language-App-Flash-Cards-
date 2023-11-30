var dic;
var dicKeyArr;
const imgAddon = `../.`



async function init(){
    console.log(`init hiragana.js`); 
    dicKeyArr = await window.electronApi.getDictKataKeys();
    dic =  await window.electronApi.getDictKata();
 
    console.log(dic[dicKeyArr[iterator]].imgSrc);
 
    console.log(dic);
    console.log(dicKeyArr);
 }
 
 init();