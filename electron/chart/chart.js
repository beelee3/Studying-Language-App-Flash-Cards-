import {showAll, init, displayCharHira, editNotes, display} from "./chartLogic.js";

// var currentToggleState;
const ToggleState = {
    all:'all',
    a: 'a',
    i: 'i',
    u: 'u',
    e: 'e',
    o: 'o',
};

var currentToggleState;


export function showToggled(){
    //show only the items on the Toggleed chart
    console.log(typeof currentToggleState);
    if(currentToggleState == currentToggleState.all){
        return false;
    }
        
    displayCharHira.style.display = "none";
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

    //do the same above for kata

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

const submitEditButton = document.getElementById("submitEditHira");
submitEditButton.addEventListener('click', async ()=>{
    var newNotes = String(document.getElementById("dNotesHira").value);
    var romaji = String(document.getElementById("dRomajiHira").innerHTML);

    editNotes("hira",romaji, newNotes);
});


console.log(`chart js`);
init();

