

document.addEventListener("DOMContentLoaded", () =>{
    const playBtn = document.getElementById("playBtn");
    const addBtn = document.getElementById("addBtn");
    const homeScreen = document.getElementById("home");
    const addQuestionScreen = document.getElementById("addQ")
    const triviaScreen = document.getElementById("trivia");
    const results = document.getElementById("results");
    const cancelQuestionBtn = document.getElementById("cancelAdd");
    const answer1Btn = document.getElementById("answer1");
    const answer2Btn = document.getElementById("answer2");
    const answer3Btn = document.getElementById("answer3");
    const answer4Btn = document.getElementById("answer4");
    const triviaImg = document.getElementById("catImg");
    const triviaQuestion = document.getElementById("question");


    const answerBtns = [answer1Btn,answer2Btn,answer3Btn,answer4Btn];

    const questionPool = [
        {
            question: "Which Alaskan town had a cat as its mayor for almost 20 years?",
            correct: "Talkeetna, Alaska",
            wrong: ["Juneau, Alaska", "Fairbanks, Alaska", "Anchorage, Alaska"],
            img: "images/cat1.jpg"
        },
        {
            question: "Roughly how many pet cats live in the United States?",
            correct: "About 88 million",
            wrong: ["23 million", "4 million", "85 million"],
            img: "images/cat2.jpg"
        },
        {
            question: "When was the first known cat video recorded?",
            correct: "1894",
            wrong: ["1915", "1942", "1888"],
            img: "images/cat3.jpg"
        },
        {
            question: "Usually, how many kittens are usually born in a single litter?",
            correct: "3 to 4 kittens",
            wrong: ["Exactly 1", "6 to 8 kittens", "10 or more kittens"],
            img: "images/cat4.jpg"
        },
        {
            question: "Which of these words can refer to a group of kittens?",
            correct: "A kindle",
            wrong: ["A pack", "A flock", "A school"],
            img: "images/cat5.jpg"
        },
        {
            question: "What color eyes are all kittens born with?",
            correct: "Blue",
            wrong: ["Green", "Yellow", "Brown"],
            img: "images/cat6.jpg"
        },
        {
            question: "What was the name of the first cat sent into space?",
            correct: "Félicette",
            wrong: ["Suki", "Sage", "Tobi"],
            img: "images/cat7.jpg"
        },
        {
            question: "What is the main prupose a cat's tail serves?",
            correct: "Helping with balance and communication",
            wrong: [
                "Storing extra food",
                "Keeping their ears warm",
                "Help clean themselves"
            ],
            img: "images/cat8.jpg"
        },
        {
            question: "Which cat breed is traditionally given to newlyweds for good luck?",
            correct: "Korat",
            wrong: ["Siamese", "Burmese", "Bengal"],
            img: "images/cat9.jpg"
        },
        {
            question: "Which smell do many cats dislike so much that it keeps them away?",
            correct: "Oranges",
            wrong: ["Chicken Nuggets", "Lavender", "Cheese"],
            img: "images/cat10.jpg"
        },
        {
            question: "Which part of a cat's body is as unique as a human fingerprint?",
            correct: "Its nose",
            wrong: ["Its paws", "Its whiskers", "Its ears"],
            img: "images/cat11.jpg"
        },
        {
            question: "Which cats are more likely to be left-pawed?",
            correct: "Male cats",
            wrong: ["Female cats", "Both are just as likely", "Only new born kittens"],
            img: "images/cat12.jpg"
        },
        {
            question: "Which taste can cats NOT detect?",
            correct: "Sweet",
            wrong: ["Salty", "Sour", "Bitter"],
            img: "images/cat13.jpg"
        },
        {
            question: "Which cat breed is often called “the gentle giant”?",
            correct: "Maine Coon",
            wrong: ["Sphynx", "Tiger", "Jaguar"],
            img: "images/cat14.jpg"
        },
        {
            question: "What is the name for an extreme fear of cats?",
            correct: "Ailurophobia",
            wrong: ["Arachnophobia", "Acrophobia", "Felinophobia"],
            img: "images/cat15.jpg"
        }
    ];

    
    let currentRound = 0;
    let score = 0;
    let currentGameQuestions = []
    let currentAnsIndex = null

    function shuffleArr(arr){
        for(let i = arr.length-1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function startTrivia(){
        const questions = [...questionPool];
        shuffleArr(questions)
        currentGameQuestions = questions.slice(0,10);
        currentRound = 0;
        score = 0;
        
    }

    function showTriviaQuestions(){
        const currentQuestion = currentGameQuestions[currentRound];
        triviaQuestion.textContent = currentQuestion.question;
        const possibleAnswers = [currentQuestion.correct, ...currentQuestion.wrong];
        shuffleArr(possibleAnswers);
        currentAnsIndex = possibleAnswers.indexOf(currentQuestion.correct);
        answerBtns.forEach((triviaBtn,i) => {
            triviaBtn.textContent = possibleAnswers[i];
        });
    }
    



    playBtn.addEventListener("click", () =>  {
        homeScreen.style.display = "none";
        triviaScreen.style.display = "block";
        
        startTrivia();
        showTriviaQuestions();
    })

    addBtn.addEventListener("click", () =>  {
        homeScreen.style.display = "none";
        addQuestionScreen.style.display = "block";        
    })

    cancelQuestionBtn.addEventListener("click", () =>  {
        homeScreen.style.display = "block";
        addQuestionScreen.style.display = "none";
        
    })

    answerBtns.forEach((Btn,i) =>{
        Btn.addEventListener("click", () =>{
            if(i === currentAnsIndex){
                score++;
            }
            currentRound ++

            if(currentRound < currentGameQuestions.length){
                showTriviaQuestions()
            }else{
                triviaScreen.style.display = "none";
                results.style.display = "block";
            }


        })
    })
})