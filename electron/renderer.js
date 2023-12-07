// const { dictionaryHiragana } = require('./main');

// const dicH = dictionaryHiragana.getDictionary();
// const dicHKeyArr = dictionaryHiragana.getKeyArr();
// var iterator = 0;

// function decrement(){
//     if(iterator-1 >= 0)
//         iterator--;

//     displayInfo();
//     console.log(`--`);

// }

// function random(){
//     var rngKey = dictHira.randomSelectKey();
//     document.getElementById("characterImg").src = dicH[rngKey].imgSrc;
// }

// function increment(){
//     if(iterator+1 <= dicHKeyArr.length-1)
//         iterator++;

//     displayInfo();
//     console.log(`++`);
// }

// function displayInfo(iterator){
//     document.getElementById("characterImg").src = dicH[dicHKeyArr[iterator]].imgSrc;
// }

// document.getElementById("back").addEventListener("click", decrement);
// document.getElementById("random").addEventListener("click", random);
// document.getElementById("next").addEventListener("click", increment);


const chartButton = document.getElementById("chart");
chartButton.addEventListener('click', async ()=>{
    window.electronApi.getChart();
});


