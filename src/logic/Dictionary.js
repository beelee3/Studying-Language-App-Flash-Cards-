// import {getKeysFromTextFile, getDictFromImage, doesFileExist, getInitFromTextFile, splitJsonIntoCharacterArray} from "./ReadFile.js";
const {
    getKeysFromTextFile,
    getDictFromImage,
    doesFileExist,
    getInitFromTextFile,
    splitJsonIntoCharacterArray
} = require('./ReadFile');

// import { writeToFile, writeToTextFile, writeObjectToFile } from "./WriteFile.js";
const {
    writeToFile,
    writeToTextFile, 
    writeObjectToFile, 
    stringifyObject,
    replaceTextInFile,
    createFolder,
} = require('./WriteFile');


class Character{
    constructor(romaji,pronunciation,type,imgSrc="n/a",notes="n/a"){
        //how to character is spelt
        this.romaji = romaji;
        //how to character is pronu
        this.pronunciation = pronunciation;
        if(type != "h" && type != "k" && type != "v") type = "invalid";
            if(type == "h")
                this.type = "hiragana";
            if(type == "k")
                this.type = "katakana";
            else if(type == "v")
                this.type = "vocab";
        
        this.imgSrc = imgSrc;
        this.notes = notes;
       
    }
}

class Dictionary{
    //type = hiragana/katakana/vocab
    constructor(type){
        this.Dictionary = {};
        
        if(type != "hiragana" && type != "katakana" && type != "vocab") type = "invalid";
        this.type = type;

        // this.fileName = `dict${this.type}.txt`;
        this.fileName = `dict_${this.type}.txt`;
        this.filePath = `./src/logic/textFiles/${this.fileName}`;
        // this.filePath = `./src/logic/testFolder/${this.fileName}`;
        this.textFilefolderPath = `./src/logic/textFiles`;
        
        // this.keyName = `KEY${this.type}.txt`;
        this.keyName = `KEY_${this.type}.txt`;
        this.keyPath = `./src/logic/textFiles/${this.keyName}`;
        this.keyArr  = [];

        //path to the img folder ex. "./src/pictures/hiragana"
        this.imgSrc = `./src/pictures/${this.type}`;

        //test vars
        // this.fileNameTest = `dict_${this.type}_Test.txt`;
        // this.filePathTest = `./src/logic/textFiles/${this.fileNameTest}`;

        this.initName=`${this.type}_init.txt`;
        this.initPath = `./src/logic/init/${this.initName}`;
        this.initFolderPath = `./src/logic/init`;
        this.init = {
            "initFromImg": true,
        }
    }

    getKeyArr(){
        return this.keyArr;
    }
    getDictionary(){
        return this.Dictionary;
    }

    //add(romaji,pronunciation,type)
    add(romaji, pronunciation, type){
        var newCharacter = new Character(romaji, pronunciation, type);
        newCharacter.imgSrc = String(this.imgSrc+`/${newCharacter.romaji}-${newCharacter.pronunciation}-${newCharacter.type.charAt(0)}.png`);
        if(newCharacter.type == "invalid"){
            return 0;
        }
        this.Dictionary[newCharacter.romaji] = newCharacter;
    }
    //display()
    display(){
        console.log(`////////////////${this.type} dictionary//////////////////////`);
        for (var key in this.Dictionary){
            console.log(`Romaji: [${this.Dictionary[key].romaji}], Pronunciation: [${this.Dictionary[key].pronunciation}], Type: [${this.Dictionary[key].type}] SRC: [${this.Dictionary[key].imgSrc}]`);
        }
    }
    
    //writeDictionaryToFile() //all keys:value pairs put into a text file
    writeDictToFile(){
        for(let key in this.Dictionary){
            if(this.doesKeyExist(key,"text")==false){
                let stringFormat = JSON.stringify(this.Dictionary[key],null,2);
                writeObjectToFile(this.filePath, stringFormat);
            }
        }
    }
    //use this to rewrite and override the whole text file
    rewriteDictToFile(){
        const stringSplitter = `--`
        let stringFormat="";
        for(let key in this.Dictionary){
             stringFormat += stringSplitter+JSON.stringify(this.Dictionary[key],null,2);

            // writeObjectToFile(this.filePath, stringFormat);
        }
        stringFormat = stringFormat.slice(2);
        writeToFile(this.filePath, stringFormat);
    }

    replaceNotesInFile(oldObj, newObj){
        var oldString = stringifyObject(oldObj);
        // console.log(oldString);

        var newString = stringifyObject(newObj);
        // console.log(newString);

        replaceTextInFile(this.filePath, oldString, newString);
    }



    writeKeysToFile(){ //grab the img files and write the keys into textfile
        for(let k in this.Dictionary){
            if(this.doesKeyExist(k,"text") == false){
                let stringFormat = k;
                writeToTextFile(this.keyPath, stringFormat)
            }
        }        
    }

    //scans image files and compares to check if it exists already in text file
    scanAndWriteNewFiles(){
        // console.log(`scanAndWriteFiles`);
        const imgArray = getDictFromImage(this.imgSrc);
        console.log(imgArray);
        for(var i = 0; i < imgArray.length; i++){
            var splitArr = [];
            splitArr = imgArray[i].split(" ");
            // console.log(`does key exist: ${this.doesKeyExist(splitArr[0],"text")}`);
            if(this.doesKeyExist(splitArr[0],"text") == false && this.type.slice(0,1) == splitArr[2]){
                this.add(splitArr[0],splitArr[1],splitArr[2]);
                this.writeDictToFile();
                this.writeKeysToFile();
            }
        }
           
    }
    //grab the data from img file and adds it to the dictionary
    setDictFromImgSrc(){
        const imgArray = getDictFromImage(this.imgSrc);
        for(var i = 0; i < imgArray.length; i++){
            var splitArr = [];
            splitArr = imgArray[i].split(" ");
            this.add(splitArr[0],splitArr[1],splitArr[2]);
        }
    }

    //grab the data from textFile and adds it to the dictionary
    setDictFromTextFile(){
        const nCharacterArray = splitJsonIntoCharacterArray(this.filePath);
        for(var i in nCharacterArray){
            this.Dictionary[nCharacterArray[i].romaji] = nCharacterArray[i];
        }
    }

    setKeysFromTextFile(){
        console.log(`set keys?`);
        const kArray = getKeysFromTextFile(this.keyPath);
        for(let i = 0; i<kArray.length; i++){
            this.keyArr.push(kArray[i]);
        }
        console.log(`set keys from text file: ${this.keyArr}`);
    }
    randomSelectKey(){
        if(this.keyArr.length <= 0){
            return false;
        }
        let rng = Math.floor(Math.random() * this.keyArr.length);
        let rngKey = this.keyArr[rng];
        // console.log(`RANDOM SELECT: Romaji: [${this.Dictionary[rngKey].romaji}], Pronunciation: [${this.Dictionary[rngKey].pronunciation}], Type: [${this.Dictionary[rngKey].type}]`);
        console.log(rngKey);
        return rngKey;
        // return this.Dictionary[rngKey];
    }
    //this will search  to see if key exists in textFile
    doesKeyExist(key, name){
       switch(name){

        case "dict":
                if(!this.Dictionary[key]){
                    console.log(`${key} doesn't exist in the ${this.type} dictionary`);
                    return false;
                }
                else{
                    console.log(`${key} does exist in the ${this.type} dictionary`);
                    return true;
                }
        case "text":
                if(doesFileExist(this.keyPath) == false){
                    return false;
                }
                let keyArr = getKeysFromTextFile(this.keyPath);
                for(let i = 0; i < keyArr.length; i++){
                    if(keyArr[i] == key){
                        //key exists
                        // console.log(`text ${key} does exist`);
                        return true;
                    }
                }
                return false;
        }
   
        
    }

    //init functions
    readInit(){
        if(doesFileExist(this.initPath)==false){
            return false;
          }
        var nInit = JSON.parse(getInitFromTextFile(this.initPath));
        //parse textfile settings to this.init
        this.init.initFromImg = nInit.initFromImg;
        // console.log(`read init from file`);
        // console.log(nInit);
        
    }
    writeInit(){
        // if(doesFileExist(this.initPath) == false && getFileSize(this.initPath) == 0){
        //     return true;
        // }
        console.log(`calling write init`);
        // console.log(this.init);
        var stringFormat = JSON.stringify(this.init, null, 2);
        writeToFile(this.initPath,stringFormat,err=>{
            if(err){
                console.log(err);
            }
        });

        // console.log(`writing init file to text`);
    }

    initialize(){
        // console.log(`//////////////////////`);
        // console.log(`start`,this.init);
        createFolder(this.textFilefolderPath);
        createFolder(this.initFolderPath);
        this.readInit();
        this.writeInit();

        if(this.init.initFromImg == true){
            this.setDictFromImgSrc();
            this.writeDictToFile();
            this.writeKeysToFile();
            this.init.initFromImg = false;
            this.writeInit();
            // console.log(`init from image complete`);

        }
        else{
            // this.setDictFromTextFile();
            this.setDictFromTextFile();
            this.setKeysFromTextFile();
            this.scanAndWriteNewFiles();
            // console.log(`init from text file: わたしわしのぶ`);
        }
        // console.log(`end`,this.init);
        // console.log(`//////////////////////`);
    }



}

module.exports = Dictionary;