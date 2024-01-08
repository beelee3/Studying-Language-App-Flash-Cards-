const chartButton = document.getElementById("chart");
chartButton.addEventListener('click', async ()=>{
    window.electronApi.getChart();
});


