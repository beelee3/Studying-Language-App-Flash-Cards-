// import fs from "fs";
const fs = require('fs');

const stringSplitter = `--`;

// Recursive function to scan and get files
function scanFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
      files.push(file);
    }
    //returns an array of files form the Folder
    return files
  }


function breakTextFileIntoLines(filePath){
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
function getKeysFromTextFile(filePath){
    const arr = breakTextFileIntoLines(filePath);
    var keys = [];
    for(var i = 0; i < arr.length; i++){
      var extract = [];
      extract = arr[i].split(`\n`);
      keys.push(extract[0]);
    }
    return keys;
}

//returns array of init data
function getInitFromTextFile(initFilePath){
  var stringFormat = fs.readFileSync(initFilePath,'utf-8');
  return stringFormat;
}

//grabs formatted names from images and produces it into an array format
function getDictFromImage(imgFilePath){
    var arr = scanFiles(imgFilePath);
    // console.log(`scanned dict data: ${arr}`);

    var dictData = [];
    for(var i = 0; i < arr.length; i++){
      dictData.push(arr[i].replaceAll("-"," ").replaceAll(".png","")); 
    }
    // console.log(`scanned dict data Array: ${dictData}`);
    return dictData;
}

function doesFileExist(filePath){
    if(fs.existsSync(filePath)){
        return true;
    }
    return false;
}

/////////////////new stuff


//splits the json text and parses it, and returns an array of objects
function splitJsonIntoCharacterArray(filePath){
  if(doesFileExist(filePath)==false){
    return false;
  }
  console.log(``)
  var jsonString = fs.readFileSync(filePath,'utf-8',(err)=>{
    if(err){
      console.log(err)
    }
  }).split(stringSplitter);

  let jsonArray = []
  for(let i in jsonString){
    jsonArray.push(JSON.parse(jsonString[i]))
  }

  return jsonArray;
}

module.exports = {scanFiles,breakTextFileIntoLines,getKeysFromTextFile,getInitFromTextFile,getDictFromImage,doesFileExist,splitJsonIntoCharacterArray};
