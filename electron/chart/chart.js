import {
    showAll, 
    init, 
    displayCharHira, 
    editNotes, 
    display, 
    ToggleState,
    displayCharKata, 
    // currentToggleState
} from "./chartLogic.js";

// var currentToggleState;
// const ToggleState = {
//     all:'all',
//     a: 'a',
//     i: 'i',
//     u: 'u',
//     e: 'e',
//     o: 'o',
// };

var currentToggleState;


export function showToggled(){
    //show only the items on the Toggleed chart
    console.log("current State: ", currentToggleState);
    if(currentToggleState == currentToggleState.all){
        return false;
    }
    
    displayCharHira.style.display = "none";
    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');
    // console.log(targetDivChildren);

    for(let x=0; x<targetDivChildren.length; x++){
        //targetDivChildren id = hira_<id> or kata_<id>
        var targetChild = String(targetDivChildren[x].id).split("_");

        if(!targetChild[1].includes(currentToggleState)){
            document.getElementById(String(targetDivChildren[x].id)).style.display = "none";
            continue;
        }
        
        document.getElementById(String(targetDivChildren[x].id)).style.display = "flex";
    }

    // displayCharKata.style.display = "none";
    // const targetDiv2 = document.getElementById("dKata");
    // const targetDivChildren2 = targetDiv2.querySelectorAll('.character');
    // // console.log(targetDivChildren);

    // for(let x=0; x<targetDivChildren.length; x++){
    //     //targetDivChildren id = hira_<id> or kata_<id>
    //     var targetChild = String(targetDivChildren2[x].id).split("_");

    //     if(!targetChild[1].includes(currentToggleState)){
    //         document.getElementById(String(targetDivChildren2[x].id)).style.display = "none";
    //         continue;
    //     }
        
    //     document.getElementById(String(targetDivChildren2[x].id)).style.display = "flex";
    // }
    
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

const submitEditButtonHira = document.getElementById("submitEdit_dHira");
submitEditButtonHira.addEventListener('click', async ()=>{
    var newNotes = String(document.getElementById("Notes_dHira").value);
    var romaji = String(document.getElementById("Romaji_dHira").innerHTML);

    editNotes("hira",romaji, newNotes);
});

const submitEditButtonKata = document.getElementById("submitEdit_dKata");
submitEditButtonKata.addEventListener('click', async ()=>{
    var newNotes = String(document.getElementById("Notes_dKata").value);
    var romaji = String(document.getElementById("Romaji_dKata").innerHTML);

    editNotes("kata",romaji, newNotes);
});




console.log(`chart js`);
init();

