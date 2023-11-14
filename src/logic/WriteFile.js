import fs from "fs";
import { getFileSize } from "./getFileSize.js";
const stringSplitter = `-`

//write to file if it doesnt exist/is empty  or append to the file
export function writeToTextFile(filePath, stringFormat="this is dummy text"){
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

export function writeToFile(filePath, stringFormat="this is dummy text"){
    fs.writeFileSync(filePath,stringFormat,(err) =>{
        //in case of an error throw err.
        if(err) throw err;
    });

}

///////////////////new stuff
export function writeToTextFile2(filePath, dictValue){
    console.log(`write2`);
    let stringFormat = JSON.stringify(dictValue,null,2)
    console.log(`string format ${stringFormat}`);
    if(getFileSize(filePath) == 0){
        console.log(`write2, 1`);
        fs.writeFileSync(filePath,stringFormat,(err) =>{
            //in case of an error throw err.
            if(err) throw err;
        });
       
    }
    //if the file has characters written in it, then append
    else {
        fs.appendFileSync(filePath,stringSplitter+stringFormat, (err)=>{
            if(err) throw err;
        });
        console.log(`write2, 2`);
    }
}