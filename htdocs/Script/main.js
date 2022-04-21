const restartBtn = document.getElementById("Restart");
const prevBtn = document.getElementById("Prev");
const nextBtn = document.getElementById("Next");
const submitBtn = document.getElementById("Submit");
const trueBtn = document.getElementById("True");
const falseBtn1 = document.getElementById("False");
const falseBtn2 = document.getElementById("False");
const userScore = document.getElementById("user-score");
const totalScore = document.getElementById("total-score");

let currentQuestion = 0;
var score = 0;

let questions = [
    {
        question: "Toto je otázka č. 1?",
        answers: [
            {option:"odpoved1", answer:true},
            {option:"odpoved2", answer:false}
            {option:"odpoved3", answer:false}
        ]
    },
    {
        question: "Toto je otázka č. 2?",
        answers: [
            {option:"odpoved1", answer:true},
            {option:"odpoved2", answer:false}
            {option:"odpoved3", answer:false}
        ]
    },
    {
        question: "Toto je otázka č. 3?",
        answers: [
            {option:"odpoved1", answer:true},
            {option:"odpoved2", answer:false}
            {option:"odpoved3", answer:false}
        ]
    },
]

restartBtn.addEventListener("click", restart);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
submitBtn.addEventListener("click", submit);

function beginQuiz(){
    currentQuestion = 0;
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano=0;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
    
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    falseBtn1.innerHTML = questions[currentQuestion].answers[1].option;
    trueBtn.onclick = () => {
        let ano=1;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
    
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    falseBtn2.innerHTML = questions[currentQuestion].answers[1].option;
    trueBtn.onclick = () => {
        let ano=1;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
    
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    prevBtn.classList.add("hide");
}

beginQuiz();

function restart(){
    currentQuestion = 0;
    prevBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");
    submitBtn.classList.remove("hide");
    trueBtn.classList.remove("hide");
    falseBtn1.classList.remove("hide");
    falseBtn2.classList.remove("hide");
    score = 0;
    userScore.innerHTML = score;
    beginQuiz();
}

function next(){
    currentQuestion++;
    if(currentQuestion>2){
        prevBtn.classList.add("hide");
        nextBtn.classList.remove("hide");
    }
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.classList.add("hide");
    trueBtn.onclick = () => {
        let ano = 0;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    questionText.innerHTML = questions[currentQuestion].answers[1].option;
    falseBtn1.classList.add("hide");
    falseBtn1.onclick = () => {
        let ano = 1;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    questionText.innerHTML = questions[currentQuestion].answers[1].option;
    falseBtn2.classList.add("hide");
    falseBtn2.onclick = () => {
        let ano = 1;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    prevBtn.classList.remove("hide");
}

function prev(){
    currentQuestion--;
    if(currentQuestion<=0){
        prevBtn.classList.add("hide");
        nextBtn.classList.remove("hide");
    }
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano=0;
        if(questions)[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    falseBtn1.innerHTML = questions[currentQuestion].answers[1].option;
    falseBtn1.onclick = () => {
        let ano=1;
        if(questions)[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    falseBtn2.innerHTML = questions[currentQuestion].answers[1].option;
    falseBtn2.onclick = () => {
        let ano=1;
        if(questions)[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }

    nextBtn.classList.remove("hide");
}

function submit(){
    prevBtn.classList.add("hide");
    nextBtn.classList.add("hide");
    submitBtn.classList.add("hide");
    trueBtn.classList.add("hide");
    falseBtn1.classList.add("hide");
    falseBtn2.classList.add("hide");
    questionText.innerHTML = "Quiz submitted!"

}