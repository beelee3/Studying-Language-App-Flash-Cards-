import {Dictionary} from "./Dictionary.js";

var dicHira = new Dictionary("hiragana");
dicHira.add("ka","ka","h");
dicHira.display();
dicHira.readImgFromFile();

console.log("//////////////////");

var dictKata = new Dictionary("katakana");
dictKata.add("ka","ka","k");
dictKata.display();
dictKata.readImgFromFile();
