import fs from "fs";


export function getFileSize(filePath){
    try{
      //if file exists send back the total amount of characters
      if(fs.existsSync(filePath)){
          const stat = fs.statSync(filePath);
          console.log(stat.size)
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