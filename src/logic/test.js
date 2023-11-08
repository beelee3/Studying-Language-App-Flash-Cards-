import {Dictionary} from "./Dictionary.js";

var dicHira = new Dictionary("hiragana");
// dicHira.add("ka","ka","h");
// dicHira.display();
// dicHira.readDictFromImage();

console.log("//////////////////");

var dictKata = new Dictionary("katakana");
// dictKata.add("ka","ka","h");
// dictKata.display();
// dictKata.readDictFromImage();

dicHira.initialize();
dictKata.initialize();


//run this as the init
// dicHira.setDictFromImgSrc();
// dictKata.setDictFromImgSrc();


// dicHira.setDictFromTextFile();
// dictKata.setDictFromTextFile();


// dicHira.writeDictToFile();
// dictKata.writeDictToFile();

// dicHira.writeKeysToFile();
// dictKata.writeKeysToFile();


// dicHira.readDictFromFile();
// dictKata.readDictFromFile();

