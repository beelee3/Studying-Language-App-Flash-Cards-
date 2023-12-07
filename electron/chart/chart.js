// const {sortBy} = require('./sorting.js');
 import { sortBy } from "./sorting.js";

var dicKata;
var dicHira;
const imgAddon = `../.`

const sortState = {
    all:'all',
    a: 'a',
    i: 'i',
    u: 'u',
    e: 'e',
    o: 'o',
};
var currentSortState;
var sortedArrayHira,sortedArrayKata;

var importedArrayHira = [], importedArrayKata = [];



async function init(){
    console.log(` chart.js`); 
    dicKata =  await window.electronApi.getDictKata();
    dicHira =  await window.electronApi.getDictHira();

    console.log(dicHira);
    console.log(dicKata);
    display();

 }

 function display(){
    var targetDiv = document.getElementById("dHira");

    for(var key in dicHira){
        const divElement  = document.createElement("div");
        divElement.className = "centerV centerH character";
        divElement.id = `${key}`;

        const paraElement  = document.createElement("p");

        //content that goes into p tag
        const nodeImg = document.createElement("img")
            nodeImg.src = imgAddon+dicHira[key].imgSrc;
            nodeImg.id = "imgChart";

        // const node  = document.createTextNode(`Romaji: [${dicHira[key].romaji}]  \n Pronunciation: [${dicHira[key].pronunciation}] \n Notes: [${dicHira[key].notes}]`);
        const node1  = document.createTextNode(`Romaji: [${dicHira[key].romaji}]`);
        const node2  = document.createTextNode(`Pronunciation: [${dicHira[key].pronunciation}]`);
        const node3  = document.createTextNode(`Notes: [${dicHira[key].notes}]`);

        //append textNode contents into p
        // paraElement.appendChild(node);
        paraElement.appendChild(node1);
        paraElement.appendChild(document.createElement("br"));
        paraElement.appendChild(node2);
        paraElement.appendChild(document.createElement("br"));
        paraElement.appendChild(node3);

        //append img/p into div
        divElement.appendChild(nodeImg)
        divElement.appendChild(paraElement);
         //append div into targeted div
        targetDiv.appendChild(divElement);

        //add elements to an array;

        importedArrayHira.push(dicHira[key]);
    }
    ////design///
// <div class="centerV">
//     <img src="../../src/pictures/hiragana/a-a-h.png" id="imgChart">
//     <p>
//         Romaji: X  
//         <br>
//         Pronunciation: X  
//         <br>
//         Notes: X
//     </p>
// </div>
}

//render functions
//notes function 
    //show only the notes of a clicked character
    //hide everything else


//sorting stuff
function showAll(){
    //show all elements in the chart
    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');

    for(let i=0; i<targetDivChildren.length; i++){
        targetDivChildren[i].style.display = "block";
        
    }
}
function showSorted(){
    //show only the items on the sorted chart
    console.log(typeof currentSortState);
    if(currentSortState == currentSortState.all)
        return false;
    
    //sortedArrayHira is an array of Objects
    sortedArrayHira = sortBy(importedArrayHira,currentSortState);
     console.log(sortedArrayHira);

    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');
    console.log(targetDivChildren);

    let found = [];
    for(let i=0; i<sortedArrayHira.length; i++){
  
        for(let x=0; x<targetDivChildren.length; x++){
            if(sortedArrayHira[i].romaji != String(targetDivChildren[x].id)){
                   targetDivChildren[x].style.display ="none";
                // document.getElementById(String(targetDivChildren[x].id)).style.display = "none";
                console.log(`sorted Array Hira: ${sortedArrayHira[i].romaji}, target Div Children: ${targetDivChildren[x].id}`);
            }
            else{
                found.push(targetDivChildren[x]);
            }
            
        }
        console.log('found!',found);
        for(let i = 0; i < found.length; i++){
            found[i].style.display = "block";
        }
    }
}

const aSortButton = document.getElementById("aSort");
aSortButton.addEventListener('click', async ()=>{
    currentSortState = sortState.a;
    showSorted();
});

const iSortButton = document.getElementById("iSort");
iSortButton.addEventListener('click', async ()=>{
    currentSortState = sortState.i;
    showSorted();
});

const uSortButton = document.getElementById("uSort");
uSortButton.addEventListener('click', async ()=>{
    currentSortState = sortState.u;
    showSorted();
});

const eSortButton = document.getElementById("eSort");
eSortButton.addEventListener('click', async ()=>{
    currentSortState = sortState.e;
    showSorted();
});

const oSortButton = document.getElementById("oSort");
oSortButton.addEventListener('click', async ()=>{
    currentSortState = sortState.o;
    showSorted();
});

const showButton = document.getElementById("show");
showButton.addEventListener('click', async ()=>{
    currentSortState = sortState.all;
    showAll();

});


init();
