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


class Dictionary{
    //type = hiragana/katakana/vocab
    constructor(type){
        this.Dictionary = {};
        if(type != "hirgana" && type != "katakana" && type != "vocab") type = "invalid";
        this.type = type;
        this.fileName = `Dict${this.type}`;
        this.filePath = `./textFiles/${this.fileName}.txt`;
    }

    //add(romaji,pronunciation,type)
    //search()
    //display()
    //writeToFile()
    //readFromFile()
}