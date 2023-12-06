var dicKata;
var dicHira;
const imgAddon = `../.`



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
        divElement.className = "centerV centerH";
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


init();

