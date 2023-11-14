import {getKeysFromTextFile, getDictFromImage, doesFileExist, getDictFromTextFile, getInitFromTextFile, searchEachLineTextFile} from "./ReadFile.js";
import { writeToFile, writeToTextFile, writeToTextFile2 } from "./WriteFile.js";
import { getFileSize } from "./getFileSize.js";

class Character{
    constructor(romaji,pronunciation,type,notes="n/a"){
        //how to character is spelt
        this.romaji = romaji;
        //how to character is pronu
        this.pronunciation = pronunciation;
        if(type != "h" && type != "k" && type != "v") type = "invalid";
        this.type = type;
        this.notes = notes;

    }
}

export class Dictionary{
    //type = hiragana/katakana/vocab
    constructor(type){
        this.Dictionary = {};
        
        if(type != "hiragana" && type != "katakana" && type != "vocab") type = "invalid";
        this.type = type;

        this.fileName = `dict${this.type}.txt`;
        this.filePath = `./src/logic/textFiles/${this.fileName}`;

        this.fileName2 = `dict${this.type}2.txt`;
        this.filePath2 = `./src/logic/textFiles/${this.fileName2}`;
        
        this.keyArr  = [];
        this.keyName = `KEY${this.type}.txt`;
        this.keyPath = `./src/logic/textFiles/${this.keyName}`;

        this.keyName2 = `KEY${this.type}.txt`;
        this.keyPath2 = `./src/logic/textFiles/${this.keyName2}`;
        

        this.imgSrc = `./src/pictures/${this.type}`;

        this.initName=`${this.type}_init.txt`;
        this.initPath = `./src/logic/init/${this.initName}`;
        this.init = {
            "initFromImg": true,
        }
    }

    //add(romaji,pronunciation,type)
    add(romaji, pronunciation, type){
        var newCharacter = new Character(romaji, pronunciation, type);
        if(newCharacter.type == "invalid"){
            return 0;
        }
        this.Dictionary[newCharacter.romaji] = newCharacter;
    }
    //display()
    display(){
        console.log(`////////////////${this.type} dictionary//////////////////////`);
        for (var key in this.Dictionary){
            // console.log(`this Dict name: ${this.fileName}`);
            console.log(`Romaji: [${this.Dictionary[key].romaji}], Pronunciation: [${this.Dictionary[key].pronunciation}], Type: [${this.Dictionary[key].type}]`);
            // console.log(`images can be accessed through ${this.imgSrc}/${this.Dictionary[key].romaji}-${this.Dictionary[key].pronunciation}-${this.Dictionary[key].type}.png`);
        }
    }
    
    //writeDictionaryToFile() //all keys:value pairs put into a text file
    writeDictToFile(){
        for(let key in this.Dictionary){
            if(this.doesKeyExist(key,"text")==false){
                let stringFormat = `${this.Dictionary[key].romaji} ${this.Dictionary[key].pronunciation} ${this.Dictionary[key].type}`;
                // console.log(`writing dict to file: ${stringFormat}`);
                 writeToTextFile(this.filePath,stringFormat);

                console.log(`write request`);
                writeToTextFile2(this.filePath2, this.Dictionary[key]);
            }
        }
    }

    writeKeysToFile(){ //grab the img files and write the keys into textfile
        for(let k in this.Dictionary){
            if(this.doesKeyExist(k,"text") == false){
                let stringFormat = k;
                writeToTextFile(this.keyPath, stringFormat)
                writeToTextFile(this.keyPath2, stringFormat)
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
        const textArray = getDictFromTextFile(this.filePath);
        for(var i = 0; i < textArray.length; i++){
            var splitArr = [];
            splitArr = textArray[i].split(" ");
            this.add(splitArr[0], splitArr[1], splitArr[2]);
        }
    }
    setKeysFromTextFile(){
        const kArray = getKeysFromTextFile(this.keyPath);
        for(let i = 0; i<kArray.length; i++){
            this.keyArr.push(kArray[i]);
        }
        console.log(`set keys from text file: ${this.keyArr}`);
    }
    randomSelectKey(){
        let rng = Math.floor(Math.random() * this.keyArr.length);
        // console.log(`rng: ${rng} keyArr:${this.keyArr} keyArrLength:${this.keyArr.length}`);
        let rngKey = this.keyArr[rng];
        // console.log(rngKey);
        console.log(`Romaji: [${this.Dictionary[rngKey].romaji}], Pronunciation: [${this.Dictionary[rngKey].pronunciation}], Type: [${this.Dictionary[rngKey].type}]`);
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

    doesKeyExist2(key, name){
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
                 if(doesFileExist(this.keyPath2) == false){
                     return false;
                 }
                 let keyArr = getKeysFromTextFile(this.keyPath2);
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
        if(doesFileExist(this.initPath) == true && getFileSize(this.initPath) == 0){
            return true;
        }
        
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
        console.log(`//////////////////////`);
        console.log(`start`,this.init);
        this.readInit();
        console.log(`readInit`,this.init);
        this.writeInit();
        
        if(this.init.initFromImg == true){
            this.setDictFromImgSrc();
            this.writeDictToFile();
            this.writeKeysToFile();
            this.init.initFromImg = false;
            this.writeInit();
            console.log(`init from image complete`);
        }
        else{
            this.setDictFromTextFile();
            this.setKeysFromTextFile();
            this.scanAndWriteNewFiles();
            console.log(`init from text file: わたしわしのぶ`);
        }
        console.log(`end`,this.init);
        console.log(`//////////////////////`);
    }



}


