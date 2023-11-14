import {Dictionary} from "./Dictionary.js";

var dicHira = new Dictionary("hiragana");
var dicKata = new Dictionary("katakana");


dicHira.initialize();
dicHira.display();

dicKata.initialize();
dicKata.display();


// dicHira.randomSelectKey();
// dicKata.randomSelectKey();


