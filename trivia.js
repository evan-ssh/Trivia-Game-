

document.addEventListener("DOMContentLoaded", () =>{
    const playBtn = document.getElementById("playBtn");
    const addBtn = document.getElementById("addBtn");
    const homeScreen = document.getElementById("home");
    const addQuestionScreen = document.getElementById("addQ")
    const triviaScreen = document.getElementById("trivia");
    const results = document.getElementById("results");
    const cancelQuestionBtn = document.getElementById("cancelAdd");

    playBtn.addEventListener("click", () =>  {
        homeScreen.style.display = "none";
        triviaScreen.style.display = "block";
        
    })

    addBtn.addEventListener("click", () =>  {
        homeScreen.style.display = "none";
        addQuestionScreen.style.display = "block";        
    })

    cancelQuestionBtn.addEventListener("click", () =>  {
        homeScreen.style.display = "block";
        addQuestionScreen.style.display = "none";
        
    })
})