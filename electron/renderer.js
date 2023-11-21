// import { Dictionary } from "../src/logic/Dictionary";

const Dictionary = require('../src/logic/Dictionary.js');

var dictHira = new Dictionary("hiragana");

dictHira.initialize();
dictHira.display();