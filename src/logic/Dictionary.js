import {scanFiles} from "./ReadFile.js";
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
            console.log(`this Dict name: ${this.fileName}`);
            console.log(`Romaji: [${this.Dictionary[key].romaji}], Pronunciation: [${this.Dictionary[key].pronunciation}], Type: [${this.Dictionary[key].type}]`);
            console.log(`images can be accessed through ${this.imgSrc}/${this.Dictionary[key].romaji}-${this.Dictionary[key].pronunciation}-${this.Dictionary[key].type}.png`);
        }
    }
    
    //writeDictionaryToFile() //all keys:value pairs put into a text file
    writeDictToFile(){
        // let stringFormat = "this is dummy text";
        for(let key in this.Dictionary){
            let stringFormat = `${this.Dictionary[key].romaji} ${this.Dictionary[key].pronunciation} ${this.Dictionary[key].type}`;
            writeToTextFile(this.filePath,stringFormat);
        }
    }

    //writeKeysToFile() //keys of the dictionary

    //readFromFile()

    //create finish making readFromTextFile
    readDictFromFile(){
        const fileArray = scanFiles(this.filePath);
        console.log(fileArray);
    }
    readImgFromFile(){
        const imgArray = scanFiles(this.imgSrc);
        console.log(imgArray);
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
