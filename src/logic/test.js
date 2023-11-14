import {Dictionary} from "./Dictionary.js";

var dicHira = new Dictionary("hiragana");
var dicKata = new Dictionary("katakana");


dicHira.initialize();
dicHira.display();

dicKata.initialize();
dicKata.display();


dicHira.writeDictToFile();
dicHira.writeKeysToFile();
// console.log(`hiragana`);
// dicHira.randomSelectKey();
// dicHira.randomSelectKey();
// dicHira.randomSelectKey();
// dicHira.randomSelectKey();

// console.log(`katakana`);
// dicKata.randomSelectKey();
// dicKata.randomSelectKey();
// dicKata.randomSelectKey();
// dicKata.randomSelectKey();


