// getting all reuqired elements
const start_btn = document.querySelector(".start-btn button");
const rule_box = document.querySelector(".rule-box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const question_box = document.querySelector(".question-box");
const option_list = document.querySelector(".option-list");
const top_header = document.querySelector(".top-header");
const timeCount = top_header.querySelector(".timer .timer-sec");
const timeLine = document.querySelector(".time-line");
const timeOff = document.querySelector(".timer-text");
const leaderboard = document.querySelector(".leaderboard");
const highscore_box = document.querySelector(".highScore-box");
const highScoresList = document.querySelector("#highScoresList");
const go_home_btn = document.querySelector(".go-home");
const clear_highscores_btn = document.querySelector(".clear-highscores");
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 10;

let que_count = 0;
let que_num = 1;
let counter;
let counterLine;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;
let reset = false;

const next_btn = question_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


// If View HighScores is Clicked
leaderboard.onclick = () => {
    highscore_box.classList.add("activehighScore");
    highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");
}


// If Start Quiz Button is Clicked
start_btn.onclick = () => {
    rule_box.classList.add("activeInfo"); // show the rule box
}

// If Exit Button is Clicked
exit_btn.onclick = () => {
    rule_box.classList.remove("activeInfo"); // hide the rule box
}

// If Continue Button is Clicked
continue_btn.onclick = () => {
    rule_box.classList.remove("activeInfo"); // hide the rule box
    question_box.classList.add("activeQuestion"); // show the Question box
    showQuestions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
}

// If Go Back Button is clicked
go_home_btn.onclick = () => {
    reset = true;
    highscore_box.classList.remove("activehighScore"); // hide highscore box
}


username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// If Save Your Score Button is Clicked
saveScoreBtn.onclick = (event) => {
    event.preventDefault();
    const score = {
        score: userScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    result_box.classList.remove("activeResult");
    highscore_box.classList.add("activehighScore");

    highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");
}

// when replay quiz is clicked
restart_quiz.onclick= () => {
    question_box.classList.add("activeQuestion");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_num = 1;
    let timeValue = 10;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
}

// if quit quiz is clicked
quit_quiz.onclick= () => {
    window.location.reload();
}

// If Next Button is Clicked
next_btn.onclick = () => {
    if(que_count < questions.length - 1) {
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed")
        showResultBox();
    }
}

// getting questiions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que-text");
    let que_tag = '<span>'+ questions[index].num + ". " + questions[index].question +'</span>';
    let option_tag =  '<div class="option">' + questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // if answers is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // once user selected, disable all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    rule_box.classList.remove("activeInfo"); // hide the rule box
    question_box.classList.remove("activeQuestion"); // hide the Question box
    result_box.classList.add("activeResult"); // show the Result box
    const scoreText = result_box.querySelector(".score-text");
    if(userScore > 7) {
        let scoreTag = '<span>and congrats!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 3) {
        let scoreTag = '<span>and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 14);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 799) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    const que_counter = question_box.querySelector(".total-que");
    let QueCounterTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    que_counter.innerHTML = QueCounterTag;
}

