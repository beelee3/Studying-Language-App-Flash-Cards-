import fs from "fs";


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
  var arr = fs
              .readFileSync(filePath)
              .toString("utf-8")
              .split(`\n`);
  // console.log(` BTFIL: ${arr}`);
  return arr;
}


//returns an array of keys from the text file
export function getKeysFromTextFile(filePath){
    var arr = breakTextFileIntoLines(filePath);
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
  var dicData = breakTextFileIntoLines(dictFilePath);
  return dicData;
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
    var dictData = [];
    for(var i = 0; i < arr.length; i++){
      dictData.push(arr[i].replaceAll("-"," ").replaceAll(".png",""));
    }
    return dictData;
}

export function doesFileExist(filePath){
    if(fs.existsSync(filePath)){
        return true;
    }
    return false;
}