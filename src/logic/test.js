import {Dictionary} from "./Dictionary.js";

var dicHira = new Dictionary("hiragana");
var dicKata = new Dictionary("katakana");


dicHira.initialize();
dicHira.display();

dicKata.initialize();
dicKata.display();



console.log(dicKata.getKeyArr());
console.log(dicHira.getKeyArr());

// dicHira.randomSelectKey();
// dicKata.randomSelectKey();


