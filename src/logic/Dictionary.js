import {getKeysFromTextFile, getKeysFromImgSrc, scanFiles, getDictFromImage} from "./ReadFile.js";
import { writeToTextFile } from "./WriteFile.js";


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
        
        this.keyName = `KEY${this.type}`;
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
            let stringFormat = `${this.Dictionary[key].romaji} ${this.Dictionary[key].pronunciation} ${this.Dictionary[key].type}`;
            
            writeToTextFile(this.filePath,stringFormat);
        }
    }

    writeKeysToFile(){ //grab the img files and write the keys into textfile
        var keys = getKeysFromImgSrc(this.imgSrc);
        for(var i = 0; i < keys.length; i++){
            let stringFormat = keys[i];
            writeToTextFile(this.keyPath,stringFormat)


            // if(!this.doesKeyExist(key[i])){
            //     writeToTextFile(this.keyPath,stringFormat)
            // }
            // else{
            //     console.log(`${key} already exists in the dictionary`);
            // }
        }
        console.log(keys);
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

        // for(var i = 0; i < imgArray.length; i++){
        //     var splitArr=[];
        //     //console.log(`SplitImgSrc: ${imgArray[i].split(" ")}`);
        //     splitArr = imgArray[i].split(" ");
        //     console.log(`${splitArr[0]} / ${splitArr[1]} / ${splitArr[2]} `);
        // }
   
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
    doesKeyExist(key){


        // if(!this.Dictionary[key]){
        //     console.log(`${key} doesn't exist in the ${this.type} dictionary`);
        //     return false;
        // }
        // else{
        //     console.log(`${key} does exist in the ${this.type} dictionary`);
        //     return true;
        // }
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
