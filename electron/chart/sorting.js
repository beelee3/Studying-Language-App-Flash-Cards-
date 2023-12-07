
export function sortBy(arrOfCharObj, sortingVowel){
    //dict = a dictionary of objects

    // if(typeof sortingVowel != String)
    //     return false;

    //this will have an array of characters that have a specific vowel(sortingVowel)
    //ex. sortingVowel = a; return ['ka','a','sa','etc'];
    var arrayOfSorting = []; 

    //object handling
    // for(var key in dict){
    //     if(dict[key].romaji.slice(dict[key].romaji.length-1, dict[key].romaji.length) == sortingVowel){
    //         console.log(dict[key].romaji.slice(dict[key].romaji.length-1, dict[key].romaji.length));
    //         arrayOfSorting.push(dict[key].romaji);
    //     }
        
    // }

    for(var i in arrOfCharObj){
        if(arrOfCharObj[i].romaji.slice(arrOfCharObj[i].romaji.length-1, arrOfCharObj[i].romaji.length) == sortingVowel){
            arrayOfSorting.push(arrOfCharObj[i]);
        }
    }

    // console.log(importedArrayHira[1]);
    // console.log(importedArrayHira[1].romaji.slice(importedArrayHira[1].romaji.length-1,importedArrayHira[1].romaji.length));
    // console.log(importedArrayHira[1].romaji);

    return arrayOfSorting;
}
