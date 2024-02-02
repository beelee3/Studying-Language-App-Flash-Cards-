// is an obj that hosts an array of dictionarys
export var mainSelector;

//selectIterator = selector for dictionary ex. hira/kata/vocab
export var selectorIterator = 0;

//iterator within the selected dictionary
export var iterator = 0;

const imgAddon = `../.`




//selector for the dictionaries to use ex. hira/kata/vocab
export class selector{
    constructor(){
        this.objDictionary = []
    }    
}

class objDic{
    constructor(dictionaryObjData, objType="object type n/a"){
        this.dictionaryObjData = dictionaryObjData;
        this.objType = objType;
    }

}

function parseDicIntoArray(dictionary_to_parse){
    var dicArr = [];
    for(var key in dictionary_to_parse){
        dicArr.push(dictionary_to_parse[key]);
    }
    return dicArr;
}

export function select_hiragana(){
    selectorIterator = 0;
}
export function select_katakana(){
    selectorIterator = 1;
}

export function iterator_increment(){
    if(iterator <= mainSelector.objDictionary[selectorIterator].dictionaryObjData.length -1){
        iterator += 1;
    }
    console.log(`iterator ${iterator}`);
}

export function iterator_decrement(){
    if(iterator > 0){
        iterator -= 1;
    }
    console.log(`iterator ${iterator}`);
}

export function iterator_reset(){
    iterator = 0;
}

export function displayInfo(){
    console.log(`display call`);
    document.getElementById("characterImg").src = imgAddon+mainSelector.objDictionary[selectorIterator].dictionaryObjData[iterator].imgSrc;
    document.getElementById("romaji").innerHTML = mainSelector.objDictionary[selectorIterator].dictionaryObjData[iterator].romaji;
    document.getElementById("pronunciation").innerHTML = mainSelector.objDictionary[selectorIterator].dictionaryObjData[iterator].pronunciation;
    document.getElementById("notes").innerHTML = mainSelector.objDictionary[selectorIterator].dictionaryObjData[iterator].notes;
}
export async function init(){
    console.log(`init quizLogic.js`);
    mainSelector = new selector();
    console.log(mainSelector);

    var hArr;
    hArr = await window.electronApi.getDictHira();

    console.log(hArr);
    const hiraArr = parseDicIntoArray(hArr);
    var objDic_hira = new objDic(hiraArr,"hiragana");
    //slot 0 
    mainSelector.objDictionary.push(objDic_hira);
    
    var kArr;
    kArr = await window.electronApi.getDictKata();
    console.log(kArr);
    const kataArr = parseDicIntoArray(kArr);
    var objDic_kata = new objDic(kataArr,"katakana");
    //slot 1
    mainSelector.objDictionary.push(objDic_kata);


    displayInfo();
}