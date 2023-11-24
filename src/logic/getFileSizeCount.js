// import fs from "fs";
const fs = require('fs');


function getFileSize(filePath){
    try{
      //if file exists send back the total amount of characters
      if(fs.existsSync(filePath)){
          const stat = fs.statSync(filePath);
          console.log(`${filePath}'s file size: ${stat.size}`);
          return stat.size;
      }
      //if file doesnt exist return 0
      else{
          return 0;
      }
  }catch(err){
      console.log(err);
  }
}

// module.export = getFileSize;
module.exports = {getFileSize};