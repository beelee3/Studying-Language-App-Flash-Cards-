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

    // console.log(`display function`);
    // for(var key in dicHira){
    //     console.log(`Romaji: ${dicHira[key].romaji}  Pronunciation: ${dicHira[key].pronunciation}  Notes: ${dicHira[key].notes}`);
    // }

    for(var key in dicHira){
        //creating p tag
        console.log(`123123`);
        console.log(`display: ${dicHira[key]}`);

        const paraElement  = document.createElement("p");
        paraElement.className = "centerV";

        //content that goes into p tag
        const nodeImg = document.createElement("img")
            nodeImg.src = imgAddon+dicHira[key].imgSrc;
            nodeImg.id = "imgChart";

        const node  = document.createTextNode(`Romaji: [${dicHira[key].romaji}]  Pronunciation: [${dicHira[key].pronunciation}] \n Notes: [${dicHira[key].notes}]`);

        //append p contents into p
        paraElement.appendChild(nodeImg);
        paraElement.appendChild(node);

        //append p into targeted div
        targetDiv.appendChild(paraElement);
    }
}

/*<p class="centerH centerV">
    <img src="../../src/pictures/hiragana/chi-chi-h.png" id="characterImg" class="imgChart">
    Romaji: X  Pronunciation: X  Notes: X
 </p> */

function prototype(){
    var targetDiv = document.getElementById("dHira");
    const paraE = document.createElement("p");
        paraE.className = "centerH centerV";

    const imgNode = document.createElement("img");
        imgNode.id = "imgChart";
        imgNode.src = "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg";

    const node = document.createTextNode("woah hello there");
   
    paraE.appendChild(imgNode);
    paraE.appendChild(node);

    targetDiv.appendChild(paraE);
}

init();

// prototype();
