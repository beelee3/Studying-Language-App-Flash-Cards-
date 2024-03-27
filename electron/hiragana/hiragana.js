var iterator = 0;
var dic;// = window.electronApi.getDictHira();
var dicKeyArr;// = window.electronApi.getDictHiraKeys();
const imgAddon = `../.`

const decrementButton = document.getElementById("back");
decrementButton.addEventListener('click', async ()=>{
    if(iterator-1 > 0)
        iterator--;

    displayInfo();
    console.log(`${iterator}--`);
});
    

const randomButton = document.getElementById("random");
randomButton.addEventListener('click', async ()=>{
    let rngKey =  Math.floor(Math.random()*(dicKeyArr.length-1));
    // document.getElementById("characterImg").src = dicH[rngKey].imgSrc;
    iterator = rngKey;
    displayInfo();
});

const incrementButton = document.getElementById("next");
incrementButton.addEventListener('click', async ()=>{
    if(iterator < dicKeyArr.length)
        iterator++;

    displayInfo();
    console.log(`${iterator}++`);
});


const chartButton = document.getElementById("chart");
chartButton.addEventListener('click', async ()=>{
    window.electronApi.getChart();
});




function displayInfo(){
    console.log(`display call`);
    try{
        document.getElementById("characterImg").src = imgAddon+dic[dicKeyArr[iterator]].imgSrc;
        document.getElementById("romaji").innerHTML = dic[dicKeyArr[iterator]].romaji;
        document.getElementById("pronunciation").innerHTML = dic[dicKeyArr[iterator]].pronunciation;
        document.getElementById("notes").innerHTML = dic[dicKeyArr[iterator]].notes;
    }
    catch(err){
        console.log(err);
    }

}

 async function init(){
   console.log(`init hiragana.js`); 
   
   dic =  await window.electronApi.getDictHira();
   dicKeyArr = await window.electronApi.getDictHiraKeys();


   console.log(dic);
   console.log(dicKeyArr);
   displayInfo();
   console.log(dic[dicKeyArr[iterator]].imgSrc);


}



init();




