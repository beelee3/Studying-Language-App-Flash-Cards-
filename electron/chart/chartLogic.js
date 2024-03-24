// import { dictHira, dictKata } from "../appHandler";

var dicKata;
var dicHira;
const imgAddon = `../.`

const dRomaji = `dRomaji`;
const dPronun = `dPronun`;
const dNotes = `dNotes`;
const hira = `hira`;
const kata = `kata`;

export const displayCharHira = document.getElementById("dCharHira");
export const displayCharKata = document.getElementById("dCharKata");

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
    displayCharKata.style.display = "none";
    display();
    noteHandler();
 }

 export function display(){
    var targetDiv = document.getElementById("dHira");

    for(var key in dicHira){
        //this is the container for the whole character Element
        const divElement  = document.createElement("div");
        divElement.className = "centerV centerH character";
        divElement.id = `${hira}_${key}`;

        //container of the character content
        const divCharacter = document.createElement("div");

        //romaji element block
        const paraRom  = document.createElement("p");
        paraRom.innerText = "Romaji: ";
        const romSpan = document.createElement("span");
        romSpan.className = "boldThis"
        romSpan.id = `${dRomaji}_${hira}_${key}`;
        romSpan.innerText = `${dicHira[key].romaji}`;
        //append
        divCharacter.appendChild(paraRom);
        paraRom.appendChild(romSpan);

        //pronunciation element block
        const paraPro  = document.createElement("p");
        paraPro.innerText = "Pronunciation: ";
        const proSpan = document.createElement("span");
        proSpan.className = "boldThis"
        proSpan.id = `${dPronun}_${hira}_${key}`;
        proSpan.innerText = `${dicHira[key].pronunciation}`
        //append
        divCharacter.appendChild(paraPro);
        paraPro.appendChild(proSpan);

        //note element block
        const paraNote  = document.createElement("p");
        paraNote.innerText = "Notes: ";
        const noteSpan = document.createElement("span");
        noteSpan.className = "boldThis"
        noteSpan.id = `${dNotes}_${hira}_${key}`;
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
    }

    targetDiv = document.getElementById("dKata");
    for(var key in dicKata){
        //this is the container for the whole character Element
        const divElement  = document.createElement("div");
        divElement.className = "centerV centerH character";
        divElement.id = `${kata}_${key}`;

        //container of the character content
        const divCharacter = document.createElement("div");

        //romaji element block
        const paraRom  = document.createElement("p");
        paraRom.innerText = "Romaji: ";
        const romSpan = document.createElement("span");
        romSpan.className = "boldThis"
        romSpan.id = `${dRomaji}_${kata}_${key}`;
        romSpan.innerText = `${dicKata[key].romaji}`;
        //append
        divCharacter.appendChild(paraRom);
        paraRom.appendChild(romSpan);

        //pronunciation element block
        const paraPro  = document.createElement("p");
        paraPro.innerText = "Pronunciation: ";
        const proSpan = document.createElement("span");
        proSpan.className = "boldThis"
        proSpan.id = `${dPronun}_${kata}_${key}`;
        proSpan.innerText = `${dicKata[key].pronunciation}`
        //append
        divCharacter.appendChild(paraPro);
        paraPro.appendChild(proSpan);

        //note element block
        const paraNote  = document.createElement("p");
        paraNote.innerText = "Notes: ";
        const noteSpan = document.createElement("span");
        noteSpan.className = "boldThis"
        noteSpan.id = `${dNotes}_${kata}_${key}`;
        noteSpan.innerText = `${dicKata[key].notes}`;
        //append
        divCharacter.appendChild(paraNote);
        paraNote.appendChild(noteSpan);
        

        //content that goes into p tag
        const nodeImg = document.createElement("img")
        nodeImg.src = imgAddon+dicKata[key].imgSrc;
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



    const targetDiv2 = document.getElementById("dKata");
    const targetDivChildren2 = targetDiv2.querySelectorAll('.character');
    displayCharKata.style.display = "none";
    for(let i=0; i<targetDivChildren2.length; i++){
        targetDivChildren2[i].style.display = "flex";
    }
}


function noteHandler(){
    var targetDiv = document.getElementById("dHira");
    var targetDivChildren = targetDiv.querySelectorAll('.character');
    console.log(targetDivChildren);

    for(let i = 0; i < targetDivChildren.length; i++){
        targetDivChildren[i].addEventListener('click',function(){
            //this is important, without this the function is trying to call data that hasnt been created yet
            if(this === undefined){
                return false;
            }
            // this.style.display = "none";
            console.log(`was clicked: ${this.id}`);
            toggleOthers(this, targetDivChildren,targetDiv.id);
        });
    }

    var targetDiv2 = document.getElementById("dKata");
    var targetDivChildren2 = targetDiv2.querySelectorAll('.character');

    for(let i = 0; i < targetDivChildren2.length; i++){
        targetDivChildren2[i].addEventListener('click',function(){
            //this is important, without this the function is trying to call data that hasnt been created yet
            if(this === undefined){
                return false;
            }
            // this.style.display = "none";
            console.log(`was clicked: ${this.id}`);
            toggleOthers(this, targetDivChildren2, targetDiv2.id);
        });
    }


    
}


export function toggleOthers(eleToDisplay, listOfElements, parentId){
    console.log(`toggle others`);
    for(let i = 0; i < listOfElements.length; i++){
        listOfElements[i].style.display = "none";
    }
    var tempArr = eleToDisplay.id.split("_");
    var newEleId = tempArr[1];
    
    var tempDic = {};
    if(parentId == "dKata"){
        tempDic = dicKata;
        displayCharKata.style.display = "flex";
    }
    else if (parentId == "dHira"){
        tempDic = dicHira;
        displayCharHira.style.display = "flex";
    }

    document.getElementById(`imgChart_${parentId}`).src = imgAddon + tempDic[newEleId].imgSrc;
    document.getElementById(`Romaji_${parentId}`).innerHTML = tempDic[newEleId].romaji;
    document.getElementById(`Pronunciation_${parentId}`).innerHTML = tempDic[newEleId].pronunciation;
    document.getElementById(`Notes_${parentId}`).value = tempDic[newEleId].notes;


    // document.getElementById(`imgChart_${parentId}`).src = imgAddon + dicHira[newEleId].imgSrc;
    // document.getElementById(`Romaji_${parentId}`).innerHTML = dicHira[newEleId].romaji;
    // document.getElementById(`Pronunciation_${parentId}`).innerHTML = dicHira[newEleId].pronunciation;
    // document.getElementById(`Notes_${parentId}`).value = dicHira[newEleId].notes;
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
       const romajiEle = document.getElementById(`${dRomaji}_${hira}_${key}`);
       romajiEle.innerText = `${dicHira[key].romaji}`;
       
       const pronunEle = document.getElementById(`${dPronun}_${hira}_${key}`);
       pronunEle.innerText = `${dicHira[key].pronunciation}`;

       const notesEle = document.getElementById(`${dNotes}_${hira}_${key}`);
       notesEle.innerText = `${dicHira[key].notes}`;
    }
    
    for(var key in dicKata){
       const romajiEle = document.getElementById(`${dRomaji}_${kata}_${key}`);
       romajiEle.innerText = `${dicKata[key].romaji}`;
       
       const pronunEle = document.getElementById(`${dPronun}_${kata}_${key}`);
       pronunEle.innerText = `${dicKata[key].pronunciation}`;

       const notesEle = document.getElementById(`${dNotes}_${kata}_${key}`);
       notesEle.innerText = `${dicKata[key].notes}`;
    }

}


// init();
