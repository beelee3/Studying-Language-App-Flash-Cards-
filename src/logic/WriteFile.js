// import fs from "fs";
const fs = require('fs');
// import { getFileSize } from "./getFileSize.js";
const {getFileSize} = require('./getFileSizeCount');

const stringSplitter = `--`

//write to file if it doesnt exist/is empty  or append to the file
function writeToTextFile(filePath, stringFormat="this is dummy text"){
    //if the amount returned is 0, writeFileSync
    if(getFileSize(filePath) == 0){
        fs.writeFileSync(filePath,stringFormat,(err) =>{
            //in case of an error throw err.
            if(err) throw err;
        });
    }
    //if the file has characters written in it, then append
    else {
        fs.appendFileSync(filePath, `\n`+stringFormat, (err)=>{
            if(err) throw err;
        });
    }
}

function writeToFile(filePath, stringFormat="this is dummy text"){
    fs.writeFileSync(filePath,stringFormat,(err) =>{
        //in case of an error throw err.
        if(err) throw err;
    });

}


//send in the json stringify'd objects into oldString/newString
function replaceTextInFile(filePath, oldString="old text", newString="new string"){
    oldString = oldString.slice(1, oldString.length-1);
    newString = newString.slice(1,newString.length-1);

    console.log(`replace text oldString: `,oldString);
    console.log(`replace text newString: `,newString);

    fs.readFile(filePath, 'utf-8', (err, data)=>{
        var formatted = data.replace(oldString, newString);

        fs.writeFile(filePath, formatted, 'utf-8', (err)=>{
            if (err) console.log(err);
        });
    });

}

function stringifyObject(obj){
    return JSON.stringify(obj,null,2);
}




///////////////new stuff
function writeObjectToFile(filePath, stringFormat="this is dummy text"){
    //if the amount returned is 0, writeFileSync
    if(getFileSize(filePath) == 0){
        fs.writeFileSync(filePath,stringFormat,(err) =>{
            //in case of an error throw err.
            if(err) throw err;
        });
    }
    //if the file has characters written in it, then append
    else {
        fs.appendFileSync(filePath, stringSplitter+stringFormat, (err)=>{
            if(err) throw err;
        });
    }
}

//create folder
function createFolder(filePath){
    try{
        if(!fs.existsSync(filePath)){
            fs.mkdirSync(filePath)
        }
    }
    catch(err){
        console.log(err);

    }
}


module.exports = {writeToTextFile,
    writeToFile,
    writeObjectToFile,
    replaceTextInFile,
    stringifyObject,
    createFolder,
};