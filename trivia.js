

document.addEventListener("DOMContentLoaded", () =>{
    const playBtn = document.getElementById("playBtn");
    const addBtn = document.getElementById("addBtn");
    const homeScreen = document.getElementById("home");
    const addQuestionScreen = document.getElementById("addQ")
    const triviaScreen = document.getElementById("trivia");
    const triviaRound = document.getElementById("roundP")
    const results = document.getElementById("results");
    const cancelQuestionBtn = document.getElementById("cancelAdd");
    const answer1Btn = document.getElementById("answer1");
    const answer2Btn = document.getElementById("answer2");
    const answer3Btn = document.getElementById("answer3");
    const answer4Btn = document.getElementById("answer4");
    const answerBtns = [answer1Btn,answer2Btn,answer3Btn,answer4Btn];
    const triviaImg = document.getElementById("catImg");
    const triviaQuestion = document.getElementById("question");
    const userScore = document.getElementById("userScore");
    const playAgainBtn = document.getElementById("playAgain");
    const returnMenuBtn = document.getElementById("returnMenu");

    const addQForm = document.getElementById("addQForm");
    const addQuestionInput = document.getElementById("addQuestion");
    const trueAns = document.getElementById("trueAns");
    const falseAns1 = document.getElementById("falseAns1");
    const falseAns2 = document.getElementById("falseAns2");
    const falseAns3 = document.getElementById("falseAns3");

    const medalImg = document.getElementById("medalImg");
    const timeModeBtn = document.getElementById("timeModeBtn");
    const roundTimeDisplay = document.getElementById("roundTime");

    const addQFields = [addQuestionInput, trueAns, falseAns1, falseAns2, falseAns3];
        addQFields.forEach(field =>{
            const span = document.createElement("span")
            span.textContent = "";
            field.insertAdjacentElement("afterend", span);
        })
    
    const catImages = [
        "catIMGS/cat1.png",
        "catIMGS/cat2.png",
        "catIMGS/cat3.PNG",
        "catIMGS/cat4.png",
        "catIMGS/cat5.png",
        "catIMGS/cat6.png",
        "catIMGS/cat7.png",
        "catIMGS/cat8.png",
        "catIMGS/cat9.png",
        "catIMGS/cat10.png",
        "catIMGS/cat11.png",
        "catIMGS/cat12.png",
        "catIMGS/cat13.png",
        "catIMGS/cat14.png",
        "catIMGS/cat15.png",
        "catIMGS/cat16.png"
        ];
    

    const questionPool = [
        {
            question: "Which Alaskan town had a cat as its mayor for almost 20 years?",
            correct: "Talkeetna, Alaska",
            wrong: ["Juneau, Alaska", "Fairbanks, Alaska", "Anchorage, Alaska"]
        },
        {
            question: "Roughly how many pet cats live in the United States?",
            correct: "About 88 million",
            wrong: ["23 million", "4 million", "85 million"]
        },
        {
            question: "When was the first known cat video recorded?",
            correct: "1894",
            wrong: ["1915", "1942", "1888"]
        },
        {
            question: "Usually, how many kittens are usually born in a single litter?",
            correct: "3 to 4 kittens",
            wrong: ["Exactly 1", "6 to 8 kittens", "10 or more kittens"]
        },
        {
            question: "Which of these words can refer to a group of kittens?",
            correct: "A kindle",
            wrong: ["A pack", "A flock", "A school"]
        },
        {
            question: "What color eyes are all kittens born with?",
            correct: "Blue",
            wrong: ["Green", "Yellow", "Brown"]
        },
        {
            question: "What was the name of the first cat sent into space?",
            correct: "Félicette",
            wrong: ["Suki", "Sage", "Tobi"],
        },
        {
            question: "What is the main purpose a cat's tail serves?",
            correct: "Helping with balance and communication",
            wrong: [
                "Storing extra food",
                "Keeping their ears warm",
                "Help clean themselves"
            ],
        },
        {
            question: "Which cat breed is traditionally given to newlyweds for good luck?",
            correct: "Korat",
            wrong: ["Siamese", "Burmese", "Bengal"],
        },
        {
            question: "Which smell do many cats dislike so much that it keeps them away?",
            correct: "Oranges",
            wrong: ["Chicken Nuggets", "Lavender", "Cheese"],
        },
        {
            question: "Which part of a cat's body is as unique as a human fingerprint?",
            correct: "Its nose",
            wrong: ["Its paws", "Its whiskers", "Its ears"],
        },
        {
            question: "Which cats are more likely to be left-pawed?",
            correct: "Male cats",
            wrong: ["Female cats", "Both are just as likely", "Only new born kittens"],
        },
        {
            question: "Which taste can cats NOT detect?",
            correct: "Sweet",
            wrong: ["Salty", "Sour", "Bitter"],
        },
        {
            question: "Which cat breed is often called “the gentle giant”?",
            correct: "Maine Coon",
            wrong: ["Sphynx", "Tiger", "Jaguar"],
        },
        {
            question: "What is the name for an extreme fear of cats?",
            correct: "Ailurophobia",
            wrong: ["Arachnophobia", "Acrophobia", "Felinophobia"],
        }
    ];

    
    let currentRound = 0;
    let score = 0;
    let currentGameQuestions = [];
    let currentGameImages = [];
    let currentAnsIndex = null;
    let timedMode = false;
    let timerId = null;
    let timeLeft = 10;

    function shuffleArr(arr){
        for(let i = arr.length-1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function startTrivia(mode){
        const questions = [...questionPool];
        shuffleArr(questions)
        currentGameQuestions = questions.slice(0,10);

        const catGameImages = [...catImages];
        shuffleArr(catGameImages);
        currentGameImages = catGameImages.slice(0, currentGameQuestions.length);


        currentRound = 0;
        score = 0;
        timedMode = mode;
        
    }

    function showTriviaQuestions(){
        const currentQuestion = currentGameQuestions[currentRound];
        triviaRound.textContent =`Question ${currentRound + 1} / ${currentGameQuestions.length}`
        triviaQuestion.textContent = currentQuestion.question;
        triviaImg.src = currentGameImages[currentRound]
        const possibleAnswers = [currentQuestion.correct, ...currentQuestion.wrong];
        shuffleArr(possibleAnswers);
        currentAnsIndex = possibleAnswers.indexOf(currentQuestion.correct);
        answerBtns.forEach((triviaBtn,i) => {
            triviaBtn.textContent = possibleAnswers[i];
        });

        if(timedMode){
            roundTimeDisplay.style.display = "block";
            startTime();
        } else{
            clearInterval(timerId);
            roundTimeDisplay.style.display ="none";
        }
    }

    function showMedals(){
        const totalQuestions = currentGameQuestions.length
        if (score <= 3) {
            userScore.textContent = `${score} / ${totalQuestions}`;
            medalImg.src = "medals/bronzemedal.png";
            userScore.textContent = `You answered ${score} / ${totalQuestions} questions correctly. Winning a bronze medal!`;
        } else if (score <= 7) {
            medalImg.src = "medals/silvermedal.png";
            userScore.textContent = `You answered ${score} / ${totalQuestions} questions correctly. Winning a silver medal!`;
        } else {
            medalImg.src = "medals/goldmedal.png";
            userScore.textContent = `You answered ${score} / ${totalQuestions} questions correctly. Winning a gold medal!`;
        }
    }
    

    function displayScreen(currentScreen){
        homeScreen.style.display = "none";
        addQuestionScreen.style.display = "none";
        triviaScreen.style.display = "none";
        results.style.display = "none";

        if(currentScreen === "home"){
            homeScreen.style.display = "flex";
        }else if (currentScreen === "addQ"){
            addQuestionScreen.style.display = "flex";
        }else if(currentScreen === "trivia"){
            triviaScreen.style.display = "block";
        }else if(currentScreen === "results"){
            results.style.display = "block"
        }
    }

    function startTime(){
        clearInterval(timerId);
        
        timeLeft = 10;
        roundTimeDisplay.textContent = `Time: ${timeLeft}s`


        timerId = setInterval(() =>{
            timeLeft--;
            roundTimeDisplay.textContent = `Time: ${timeLeft}s`

            if(timeLeft <= 0){
                clearInterval(timerId);
                currentRound++;
                if (currentRound < currentGameQuestions.length) {
                    showTriviaQuestions();
                } else {
                    displayScreen("results")
                    showMedals()
                    }
                }
            },1000);
        }



    playBtn.addEventListener("click", () =>  {
        
        displayScreen("trivia");
        startTrivia(false);
        showTriviaQuestions();
    });

    timeModeBtn.addEventListener("click", () =>{
        
        displayScreen("trivia");
        startTrivia(true);
        showTriviaQuestions();
    });

    addBtn.addEventListener("click", () =>  {
        displayScreen("addQ");
    });

    cancelQuestionBtn.addEventListener("click", () =>  {
        displayScreen("home");
    });

    playAgainBtn.addEventListener("click", () => {
        displayScreen("trivia");
        startTrivia(timedMode);
        showTriviaQuestions();

    });

    returnMenuBtn.addEventListener("click", () => {
        displayScreen("home");
    });

    answerBtns.forEach((Btn,i) =>{
        Btn.addEventListener("click", () =>{

            clearInterval(timerId)

            if(i === currentAnsIndex){
                score++;
            }
            currentRound ++

            if(currentRound < currentGameQuestions.length){
                showTriviaQuestions()
            }else{
                displayScreen("results")
                showMedals(score)
            }
        })
    })

    addQForm.addEventListener("submit", (e) =>{
        e.preventDefault();

        let valid = true;

        addQFields.forEach(field =>{
            const span = field.nextElementSibling;
            if(span){
                span.textContent = "";
            }
        });

        const newQuestion = addQuestionInput.value.trim()
        const correctAns = trueAns.value.trim();
        const false1 = falseAns1.value.trim();
        const false2 = falseAns2.value.trim();
        const false3 = falseAns3.value.trim();
        
        if(!newQuestion){
            valid = false;
            addQuestionInput.nextElementSibling.textContent = "A question must be entered.";
        }

        if(!correctAns){
            valid = false;
            trueAns.nextElementSibling.textContent = "You must have an answer.";
        }

        if(!false1 || !false2 || !false3){
            valid = false;
            falseAns1.nextElementSibling.textContent = "Please provide all false answers";
        }

        if(!valid){
            return;
        }

        const userQuestion = {
            question:newQuestion,
            correct:correctAns,
            wrong:[false1,false2,false3],
        }

        questionPool.push(userQuestion);

        addQForm.reset();

        displayScreen("home");

    })


})