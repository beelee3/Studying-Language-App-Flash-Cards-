import fs from "fs";


// Recursive function to scan and get files
export function scanFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
      files.push(file);
    }
    return files
  }

export function readTextFile(){
    
}

