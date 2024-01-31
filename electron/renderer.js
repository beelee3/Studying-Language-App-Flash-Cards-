const chartButton = document.getElementById("chart");
chartButton.addEventListener('click', async ()=>{
    console.log(`clicked on chart`);
    window.electronApi.getChart();
});

const quizButton = document.getElementById("quiz");
quizButton.addEventListener('click', async ()=>{
    console.log(`clicked on quiz`)
    window.electronApi.getQuiz();
});


