import {Dictionary} from "./Dictionary.js";

var dicHira = new Dictionary("hiragana");
dicHira.add("ka","ka","h");
dicHira.display();
dicHira.readImgSrc();

console.log("//////////////////");

var dictKata = new Dictionary("katakana");
dictKata.add("ka","ka","k");
dictKata.display();
dictKata.readImgSrc();


dicHira.setDictFromImgSrc();
dictKata.setDictFromImgSrc();

dicHira.writeDictToFile();
dictKata.writeDictToFile();

dicHira.writeKeysToFile();
dictKata.writeKeysToFile();


dicHira.readImgSrc();
dictKata.readImgSrc();

