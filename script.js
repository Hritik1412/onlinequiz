const questions = [
    {
        question: "Which is the largest animal in the world?", 
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the largest country in the world?", 
        answers: [
            {text: "China", correct: false},
            {text: "Russia", correct: true},
            {text: "Egypt", correct: false},
            {text: "Canada", correct: false},
        ]
    },
    {
        question: "Which is the hardest metal on Earth?", 
        answers: [
            {text: "Chromium", correct: false},
            {text: "Iron", correct: false},
            {text: "Gold", correct: false},
            {text: "Titanium", correct: true},
        ]
    },
    {
        question: "Which is the longest river in the world?", 
        answers: [
            {text: "Yangtze River", correct: false},
            {text: "Amazon River", correct: false},
            {text: "Nile River", correct: true},
            {text: "Sindhu River", correct: false},
        ]
    },
    {
        question: "Which is the deepest lake in the world?", 
        answers: [
            {text: "Lake Malawi", correct: false},
            {text: "Lake Victoria", correct: false},
            {text: "Lake Superior", correct: false},
            {text: "Lake Baikal", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?", 
        answers: [
            {text: "Asia", correct: false},
            {text: "Africa", correct: false},
            {text: "Australia", correct: true},
            {text: "Europe", correct: false},
        ]
    },
    {
        question: "Which is the Longest Railway in the world?", 
        answers: [
            {text: "Beijing-Guangzhou", correct: false},
            {text: "Trans-Siberian", correct: true},
            {text: "Canberra-Parth", correct: false},
            {text: "Dibrugarh-Kanyakumari", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
