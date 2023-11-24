var iterator = 0;

var dicH;
var dicKeyArr;

const decrementButton = document.getElementById("back");
decrementButton.addEventListener('click', async ()=>{
    if(iterator-1 >= 0)
        iterator--;

    displayInfo();
    console.log(`--`);
})
    

const randomButton = document.getElementById("random");
randomButton.addEventListener('click', async ()=>{
    
    let rngKey =  Math.floor(Math.random()*(dicKeyArr.length-1));
    document.getElementById("characterImg").src = dicH[rngKey].imgSrc;
})


function increment(){
    if(iterator+1 <= dicKeyArr.length-1)
        iterator++;

    displayInfo();
    console.log(`++`);
}

function displayInfo(iterator){
    console.log(`display call`);
    document.getElementById("characterImg").src = dicH[dicKeyArr[iterator]].imgSrc;
}

 async function init(){
   console.log(`init hiragana.js`); 
   dicKeyArr = await window.electronApi.getDictHiraKeys();
   dicH =  await window.electronApi.getDictHira();

   console.log(dicH);
   console.log(dicKeyArr);
}


// document.getElementById("back").addEventListener("click", decrement);
// document.getElementById("random").addEventListener("click", random);
// document.getElementById("next").addEventListener("click", increment);

init();


