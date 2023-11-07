import {getKeysFromTextFile, getKeysFromImgSrc, scanFiles, getDictFromImage, doesFileExist} from "./ReadFile.js";
import { writeToFile, writeToTextFile } from "./WriteFile.js";


class Character{
    constructor(romaji,pronunciation,type){
        //how to character is spelt
        this.romaji = romaji;
        //how to character is pronu
        this.pronunciation = pronunciation;
        if(type != "h" && type != "k" && type != "v") type = "invalid";
        this.type = type;

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
        
        this.keyName = `KEY${this.type}.txt`;
        this.keyPath = `./src/logic/textFiles/${this.keyName}`;
        this.keyArr  = [];

        this.imgSrc = `./src/pictures/${this.type}`;


    }

    //add(romaji,pronunciation,type)
    add(romaji, pronunciation, type){
        var newCharacter = new Character(romaji, pronunciation, type);
        if(newCharacter.type == "invalid"){
            return 0;
        }
        this.Dictionary[newCharacter.romaji] = newCharacter;
    }
    //search()
    //display()
    display(){
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
                writeToTextFile(this.filePath,stringFormat);
            }
        }
    }

    writeKeysToFile(){ //grab the img files and write the keys into textfile
        for(let k in this.Dictionary){
            if(this.doesKeyExist(k,"text") == false){
                let stringFormat = k;
                writeToTextFile(this.keyPath, stringFormat)
            }
        }        
    }


    //readFromFile()

    //create finish making readFromTextFile
    readDictFromFile(){
        const fileArray = scanFiles(this.filePath);
        console.log(fileArray);
        return fileArray;
    }

    //returns array of Img
    readImgSrc(){
        const imgArray = getDictFromImage(this.imgSrc);
        console.log(`readImgSrc: ${imgArray}`);

        return imgArray;
    }

    setDictFromImgSrc(){
        const imgArray = this.readImgSrc();
        for(var i = 0; i < imgArray.length; i++){
            var splitArr = [];
            splitArr = imgArray[i].split(" ");
            this.add(splitArr[0],splitArr[1],splitArr[2]);
        }
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

    initialize(){
        //
    }
}



// var dicHira = new Dictionary("hiragana");
// dicHira.add("ka","ka","h");
// dicHira.display();
// dicHira.readImgFromFile();

// console.log("//////////////////");

// var dictKata = new Dictionary("katakana");
// dictKata.add("ka","ka","k");
// dictKata.display();
// dictKata.readImgFromFile();
