import fs from "fs";

const stringSplitter = `-`;

// Recursive function to scan and get files
export function scanFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
      files.push(file);
    }
    //returns an array of files form the Folder
    return files
}
export function breakTextFileIntoLines(filePath){
  if(doesFileExist(filePath)==false){
    return false;
  }
  var arr = fs
              .readFileSync(filePath)
              .toString("utf-8")
              .split(`\n`);
  // console.log(` BTFIL: ${arr}`);
  return arr;
}


//returns an array of keys from the text file
export function getKeysFromTextFile(filePath){
    const arr = breakTextFileIntoLines(filePath);
    var keys = [];
    for(var i = 0; i < arr.length; i++){
      var extract = [];
      extract = arr[i].split(`\n`);
      keys.push(extract[0]);
    }
    return keys;
}

//returns array of dictionary data
export function getDictFromTextFile(dictFilePath){
  const dicData = breakTextFileIntoLines(dictFilePath);
  return dicData;
}

//returns array of init data
export function getInitFromTextFile(initFilePath){
  if(doesFileExist(initFilePath)==false){
    return false;
  }
  var stringFormat = fs.readFileSync(initFilePath,'utf-8');
  return stringFormat;
}


//returns array of keys from the img src
export function getKeysFromImgSrc(imgFilePath){
    var arr = scanFiles(imgFilePath);
    var keys = [];
    for(var i = 0; i < arr.length; i++){
      var extract = [];
      extract = arr[i].split("-");
      keys.push(extract[0]);
    }
    return keys;
}



//grabs formatted names from images and produces it into an array format
export function getDictFromImage(imgFilePath){
    var arr = scanFiles(imgFilePath);
    console.log(`scanned dict data: ${arr}`);

    var dictData = [];
    for(var i = 0; i < arr.length; i++){
      dictData.push(arr[i].replaceAll("-"," ").replaceAll(".png","")); 
    }
    console.log(`scanned dict data Array: ${dictData}`);
    return dictData;
}

export function doesFileExist(filePath){
    if(fs.existsSync(filePath)){
        return true;
    }
    return false;
}


//searches for a phrase in the text file 
  //ex. "initFromImg true"
export function searchEachLineTextFile(filePath, phrase){
    if(doesFileExist(filePath)==false){
      return false;
    }
    const arr = breakTextFileIntoLines(filePath);
    for(let i = 0; i < arr.length; i++){
      if(arr[i] == phrase){
        console.log(`${phrase} exists in the file!`);
        return true;
      }
    }
    return false;
}

//////////////////////////new stuff


export function readJsonFromFile(){

}
