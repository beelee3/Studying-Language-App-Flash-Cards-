var dicKata;
var dicHira;
const imgAddon = `../.`

export const displayCharHira = document.getElementById("dCharHira")

export var currentToggleState;
export var importedArrayHira = [], importedArrayKata = [];

const ToggleState = {
    all:'all',
    a: 'a',
    i: 'i',
    u: 'u',
    e: 'e',
    o: 'o',
};


export async function init(){
    console.log(` chart.js`); 
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

            // <p>
            //     Romaji:
            //     <div class="romaji" id="dRomajiHira">romaji</div>
            // </p>

            // <p>
            //     Pronunciation:
            //     <div class="pronunciation" id="dPronunciationHira">pronunciation</div>
            // </p>

            // <p>
            //     Notes: 
            //     <textarea class="notes" id="dNotesHira" rows="8" cols="25"> </textarea>
            //     <button id="submitEdit">Submit Edit</button>
            // </p>
}
// init();
