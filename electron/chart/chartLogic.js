import { dictHira } from "../appHandler";

export const displayChar = document.getElementById("dCharHira");

var dicKata;
var dicHira;
const imgAddon = `../.`
var importedArrayHira = [], importedArrayKata = [];


export async function init(){
    console.log(`chart.js`); 
    dicKata =  await window.electronApi.getDictKata();
    dicHira =  await window.electronApi.getDictHira();

    console.log(dicHira);
    console.log(dicKata);

    displayChar.style.display = "none";

    display();
    noteHandler();
 }

export function display(){
    var targetDiv = document.getElementById("dHira");

    for(var key in dicHira){
        // const divElement  = document.createElement("div");
        const divElement  = document.createElement("div");
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
        node2.className = "pronunciation";

        const node3  = document.createElement("p");
        node3.textContent = `Notes: [${dicHira[key].notes}]`;
        node3.className = "notes";

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

//Toggling stuff
export function showAll(){
    //show all elements in the chart
    const targetDiv = document.getElementById("dHira");
    const targetDivChildren = targetDiv.querySelectorAll('.character');
    displayChar.style.display = "none";
    for(let i=0; i<targetDivChildren.length; i++){
        targetDivChildren[i].style.display = "flex";
    }
}


//if you click on a character div, it will expand the div and show the notes
export function noteHandler(){
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
            toggleOthersOff(this, targetDivChildren);
            console.log(`was clicked: ${this.id}`);
        });
    }
}

export function toggleOthersOff(elementToDisplay, listOfElements){
    console.log(`toggle others off: ${elementToDisplay.id}`)
    console.log(listOfElements)
    for(let x=0; x<listOfElements.length; x++){

        // //hide everything but the element to display
        // if(String(listOfElements[x].id) != String(elementToDisplay.id)){
        //     document.getElementById(String(listOfElements[x].id)).style.display = "none";
        //     continue;
        // }
        // document.getElementById(String(listOfElements[x].id)).style.display = "flex";
        document.getElementById(listOfElements[x].id).style.display = "none";
            
    }
    displayChar.style.display = "flex";
    // document.getElementById("dRomajiHira").innerHTML = `Romaji: \n [${dicHira[elementToDisplay.id].romaji}]`;
    // document.getElementById("dPronunciationHira").innerHTML = `Pronunciation: \n [${dicHira[elementToDisplay.id].pronunciation}]`;
    document.getElementById("dRomajiHira").innerHTML = `${dicHira[elementToDisplay.id].romaji}`;
    document.getElementById("dPronunciationHira").innerHTML = `${dicHira[elementToDisplay.id].pronunciation}`;
    document.getElementById("dNotesHira").value = dicHira[elementToDisplay.id].notes;
    
}

export async function updateNotes(romaji, textContents){
    console.log(`sending over ${romaji} \nTextContents: ${textContents}`);

    //call for invoke process call
        //send over the text content with the dictionary key
            //the notes get updated
        //send the updated data back to chart js;

    //window.electronApi.submitNotes()
    
    await window.electronApi.setNotes("hira",romaji,textContents);

    dictHira = await window.electronApi.getDictHira();
    console.log(dictHira);
}