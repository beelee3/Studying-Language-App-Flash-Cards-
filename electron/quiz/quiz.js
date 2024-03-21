import {
    mainSelector, 
    init,
    selectorIterator,
    select_hiragana,
    select_katakana,
    iterator_decrement,
    iterator_increment,
    iterator_reset,
    displayInfo,
    toggleOffInfo,
    toggleOnInfo,
    checkAnswer,
    gradeAnswer,
    hideGradeAnswer,
    showGradeAnswer,
    clearText,
    rngSelection,
    random_iterator,
} 
    from "./quizLogic.js"



const hiraganaButton = document.getElementById('hiragana_quiz');
hiraganaButton.addEventListener('click', async ()=>{
    select_hiragana();
    iterator_reset();
    displayInfo();
});

const katakanaButton = document.getElementById('katakana_quiz');
katakanaButton.addEventListener('click', async ()=>{
    select_katakana();
    iterator_reset();
    displayInfo();
});

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', async ()=>{
    //submit funcitonality
    //compares data from the text field and compare it with the data from the dicitonary

    let input_romaji = document.getElementById("romaji_answer").value;
    let input_pronunciation = document.getElementById("pronunciation_answer").value;
    
    input_pronunciation = input_pronunciation.toLowerCase();
    input_romaji = input_romaji.toLowerCase();

    console.log(checkAnswer(input_romaji, input_pronunciation));
    var answer_bool = checkAnswer(input_romaji, input_pronunciation);

    gradeAnswer(answer_bool);
    showGradeAnswer();
    toggleOnInfo();
});

const backButton = document.getElementById('back');
backButton.addEventListener('click', async ()=>{
    iterator_decrement();
    displayInfo();

    clearText();
    hideGradeAnswer();
    toggleOffInfo();
});

// const randomButton = document.getElementById('random');
// randomButton.addEventListener('click', async ()=>{
//     random_iterator();
//     displayInfo();

//     clearText();
//     hideGradeAnswer();
//     toggleOffInfo();
// });

const nextButton = document.getElementById('next');
nextButton.addEventListener('click', async ()=>{
    iterator_increment();
    displayInfo();


    clearText();
    hideGradeAnswer();
    toggleOffInfo();
});




init();
