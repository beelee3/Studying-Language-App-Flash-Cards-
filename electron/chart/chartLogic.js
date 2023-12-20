// import { dictHira, dictKata } from "../appHandler";

var dicKata;
var dicHira;
const imgAddon = `../.`

export const displayCharHira = document.getElementById("dCharHira");

export var importedArrayHira = [], importedArrayKata = [];

export const ToggleState = {
    all:'all',
    a: 'a',
    i: 'i',
    u: 'u',
    e: 'e',
    o: 'o',
    toggled: 'toggled',
};


export async function init(){
    console.log(` chartLogic.js`); 
    dicKata =  await window.electronApi.getDictKata();
    dicHira =  await window.electronApi.getDictHira();

    console.log(dicHira);
    console.log(dicKata);
    displayCharHira.style.display = "none";
    
    display();
    noteHandler();
 }

 export function display(){
    var targetDiv = document.getElementById("dHira");
    importedArrayHira = [];
    importedArrayKata = [];

    for(var key in dicHira){
        //this is the container for the whole character Element
        const divElement  = document.createElement("div");
        divElement.className = "centerV centerH character";
        divElement.id = `${key}`;

        //container of the character content
        const divCharacter = document.createElement("div");

        //romaji element block
        const paraRom  = document.createElement("p");
        paraRom.innerText = "Romaji: ";
        const romSpan = document.createElement("span");
        romSpan.className = "boldThis"
        romSpan.id = `dRomaji${key}`;
        romSpan.innerText = `${dicHira[key].romaji}`;
        //append
        divCharacter.appendChild(paraRom);
        paraRom.appendChild(romSpan);

        //pronunciation element block
        const paraPro  = document.createElement("p");
        paraPro.innerText = "Pronunciation: ";
        const proSpan = document.createElement("span");
        proSpan.className = "boldThis"
        proSpan.id = `dPronun${key}`;
        proSpan.innerText = `${dicHira[key].pronunciation}`
        //append
        divCharacter.appendChild(paraPro);
        paraPro.appendChild(proSpan);

        //note element block
        const paraNote  = document.createElement("p");
        paraNote.innerText = "Notes: ";
        const noteSpan = document.createElement("span");
        noteSpan.className = "boldThis"
        noteSpan.id = `dNotes${key}`;
        noteSpan.innerText = `${dicHira[key].notes}`;
        //append
        divCharacter.appendChild(paraNote);
        paraNote.appendChild(noteSpan);
        

        //content that goes into p tag
        const nodeImg = document.createElement("img")
            nodeImg.src = imgAddon+dicHira[key].imgSrc;
            nodeImg.id = "imgChart";

        

        //append img/p into div
        divElement.appendChild(nodeImg);
        divElement.appendChild(divCharacter);
        // divElement.appendChild(paraElement);
            //append divCharacter into divElement
                //append paraRom,paraPro,paraNote into divCharacter
                    //append span with classNames of = "dRomaji", "dPronun", "dNotes" into >> paraRom, paraPro, paraNote

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
export function showAll(){
    //show all elements in the chart
    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');
    displayCharHira.style.display = "none";

    for(let i=0; i<targetDivChildren.length; i++){
        targetDivChildren[i].style.display = "flex";
    }
}


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
            // this.style.display = "none";
            console.log(`was clicked: ${this.id}`);
            toggleOthers(this, targetDivChildren);
        });
    }
    
}


export function toggleOthers(eleToDisplay, listOfElements){
    console.log(`toggle others`);
    for(let i = 0; i < listOfElements.length; i++){
        listOfElements[i].style.display = "none";
    }
    
    displayCharHira.style.display = "flex";
    document.getElementById("dRomajiHira").innerHTML = dicHira[eleToDisplay.id].romaji;
    document.getElementById("dPronunciationHira").innerHTML = dicHira[eleToDisplay.id].pronunciation;
    document.getElementById("dNotesHira").value = dicHira[eleToDisplay.id].notes;
}

export async function editNotes(dictType,romaji, newNotes){
    // console.log(`romaji: ${romaji}, newNotes: ${newNotes}`);
    console.log(`editNotes:${dicHira[romaji].notes} `);
    console.log(typeof newNotes);
    // console.log(`editNotes:${dicKata} `);
    if(dictType == "hira")
        dicHira[romaji].notes = newNotes;

    else if(dictType == "kata")
        dicKata[romaji].notes = newNotes;

    console.log(`editNotes 2:${dicHira[romaji].notes} `);
    // console.log(`editNotes 2:${dicKata} `);

    await window.electronApi.setNotes(dictType, romaji, newNotes);
    
    update();

    //find a way to display the new changes
}

export async function update(){
    for(var key in dicHira){
       const romajiEle = document.getElementById(`dRomaji${key}`);
       romajiEle.innerText = `${dicHira[key].romaji}` 
       
       const pronunEle = document.getElementById(`dPronun${key}`);
       pronunEle.innerText = `${dicHira[key].pronunciation}`

       const notesEle = document.getElementById(`dNotes${key}`);
       notesEle.innerText = `${dicHira[key].notes}`
    }

}


// init();
