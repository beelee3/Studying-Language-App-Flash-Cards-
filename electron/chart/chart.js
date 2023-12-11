// import {init,showAll,showToggled,ToggleState,currentToggleState} from "./chartLogic.js";

// var currentToggleState;

var dicKata;
var dicHira;
const imgAddon = `../.`

const ToggleState = {
    all:'all',
    a: 'a',
    i: 'i',
    u: 'u',
    e: 'e',
    o: 'o',
};

var currentToggleState;
var importedArrayHira = [], importedArrayKata = [];



async function init(){
    console.log(` chart.js`); 
    dicKata =  await window.electronApi.getDictKata();
    dicHira =  await window.electronApi.getDictHira();

    console.log(dicHira);
    console.log(dicKata);
    display();
    noteHandler();
 }

function display(){
    var targetDiv = document.getElementById("dHira");

    for(var key in dicHira){
        // const divElement  = document.createElement("div");
        const divElement  = document.createElement("button");
        divElement.className = "centerV centerH character";
        divElement.id = `${key}`;

        const paraElement  = document.createElement("p");

        //content that goes into p tag
        const nodeImg = document.createElement("img")
            nodeImg.src = imgAddon+dicHira[key].imgSrc;
            nodeImg.id = "imgChart";

        // const node  = document.createTextNode(`Romaji: [${dicHira[key].romaji}]  \n Pronunciation: [${dicHira[key].pronunciation}] \n Notes: [${dicHira[key].notes}]`);
        // const node1  = document.createTextNode(`Romaji: [${dicHira[key].romaji}]`);
        // const node2  = document.createTextNode(`Pronunciation: [${dicHira[key].pronunciation}]`);
        // const node3  = document.createTextNode(`Notes: [${dicHira[key].notes}]`);

        const node1  = document.createElement("p");
        node1.textContent = `Romaji: [${dicHira[key].romaji}]`;
        node1.className = "romaji"

        const node2  = document.createElement("p") 
        node2.textContent = `Pronunciation: [${dicHira[key].pronunciation}]`;

        const node3  = document.createElement("p");
        node3.textContent = `Notes: [${dicHira[key].notes}]`;

        //append textNode contents into p
        // paraElement.appendChild(node);
        paraElement.appendChild(node1);
        // paraElement.appendChild(document.createElement("br"));
        paraElement.appendChild(node2);
        // paraElement.appendChild(document.createElement("br"));
        paraElement.appendChild(node3);

        //append img/p into div
        divElement.appendChild(nodeImg)
        divElement.appendChild(paraElement);
         //append div into targeted div
        targetDiv.appendChild(divElement);

        //add elements to an array;

        importedArrayHira.push(dicHira[key]);
    }
}

//render functions
//notes function 
    //show only the notes of a clicked character
    //hide everything else


//Toggleing stuff
function showAll(){
    //show all elements in the chart
    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');

    for(let i=0; i<targetDivChildren.length; i++){
        targetDivChildren[i].style.display = "flex";
    }
}
function showToggled(){
    //show only the items on the Toggleed chart
    console.log(typeof currentToggleState);
    if(currentToggleState == currentToggleState.all){
        return false;
    }
        
    
    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');
    console.log(targetDivChildren);

    for(let x=0; x<targetDivChildren.length; x++){
        if(!String(targetDivChildren[x].id).includes(currentToggleState)){
            document.getElementById(String(targetDivChildren[x].id)).style.display = "none";
            continue;
        }

        document.getElementById(String(targetDivChildren[x].id)).style.display = "flex";
            
    }
}

//if you click on a character div, it will expand the div and show the notes
function noteHandler(){
    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');
    console.log(targetDivChildren);

    for(let i = 0; i < targetDivChildren.length; i++){
        targetDivChildren[i].addEventListener('click',function(){
            //this is important, without this the function is trying to call data that hasnt been created yet
            if(this === undefined){
                return false;
            }
            this.style.display = "none";
            console.log(`was clicked: ${this.id}`);
        });
    }
}




//// buttons
const aToggleButton = document.getElementById("aToggle");
aToggleButton.addEventListener('click', async ()=>{
    currentToggleState = ToggleState.a;
    showToggled();
});

const iToggleButton = document.getElementById("iToggle");
iToggleButton.addEventListener('click', async ()=>{
    currentToggleState = ToggleState.i;
    showToggled();
});

const uToggleButton = document.getElementById("uToggle");
uToggleButton.addEventListener('click', async ()=>{
    currentToggleState = ToggleState.u;
    showToggled();
});

const eToggleButton = document.getElementById("eToggle");
eToggleButton.addEventListener('click', async ()=>{
    currentToggleState = ToggleState.e;
    showToggled();
});

const oToggleButton = document.getElementById("oToggle");
oToggleButton.addEventListener('click', async ()=>{
    currentToggleState = ToggleState.o;
    showToggled();
});

const showButton = document.getElementById("show");
showButton.addEventListener('click', async ()=>{
    currentToggleState = ToggleState.all;
    showAll();

});

init();

