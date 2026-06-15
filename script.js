let playerXP =
    Number(localStorage.getItem("playerXP")) || 1840;

const bots = [

    {
        name: "BudgetBoss",
        xp: 1790
    },

    {
        name: "CryptoCrab",
        xp: 1720
    },

    {
        name: "StockShark",
        xp: 1680
    },

    {
        name: "PennyPincher",
        xp: 1600
    }

];

function updateLeaderboard() {

    const leaderboard = [

        {
            name: "You",
            xp: playerXP
        },

        ...bots

    ];

    leaderboard.sort((a,b) => b.xp - a.xp);

    const list =
        document.getElementById(
            "leaderboardList"
        );

    if(!list) return;

    list.innerHTML = "";

    leaderboard.forEach(player => {

        const li =
            document.createElement("li");

        li.innerText =
            `${player.name} - ${player.xp} XP`;

        list.appendChild(li);

    });
}

updateLeaderboard();

/* BOT XP */

setInterval(() => {

    bots.forEach(bot => {

        bot.xp +=
        Math.floor(
            Math.random() * 51
        ) + 10;

    });

    updateLeaderboard();

}, 30000);

/* SIDEBAR TABS */

function showTab(tab) {

    document.getElementById(
        "learnPage"
    ).style.display = "none";

    document.getElementById(
        "questsPage"
    ).style.display = "none";

    document.getElementById(
        "leaderboardPage"
    ).style.display = "none";

    document.getElementById(
        "profilePage"
    ).style.display = "none";

    document.getElementById(
        tab
    ).style.display = "block";

}
const lessonsData = {
  inflation: {
    slides: [
      "📈 Inflation means prices go up over time.",
      "💸 This means your money buys less in the future."
    ],
    questions: [
      {
        q: "What does inflation mainly mean?",
        a: ["Prices rise over time", "Money becomes more valuable", "Wages always increase", "Taxes increase"],
        correct: 0
      },
      {
        q: "Why can $50 buy less over time?",
        a: ["Inflation reduces value", "Stores cheat customers", "Money shrinks", "Banks reduce balances"],
        correct: 0
      }
    ]
  },

  interest: {
    slides: [
      "💰 Interest is the cost of borrowing money.",
      "📊 Compound interest grows faster over time."
    ],
    questions: [
      {
        q: "What is compound interest?",
        a: [
          "Interest on original money only",
          "Interest on interest + original money",
          "A bank fee",
          "A tax discount"
        ],
        correct: 1
      },
      {
        q: "Why is minimum repayment risky?",
        a: [
          "Debt disappears faster",
          "You pay more interest over time",
          "It removes your credit card",
          "It increases wages"
        ],
        correct: 1
      }
    ]
  }
};
let currentLesson = null;
let slideIndex = 0;
let questionIndex = 0;

function startLesson(name){
    currentLesson = lessonsData[name];
    slideIndex = 0;
    questionIndex = 0;

    document.getElementById("infoSlides").style.display = "block";
    document.getElementById("questionArea").style.display = "none";

    showSlide();
}
function showSlide(){
    document.getElementById("slide1").textContent =
        currentLesson.slides[slideIndex] || "";

    document.getElementById("slide2").textContent =
        currentLesson.slides[slideIndex + 1] || "";
}
function nextSlide(){
    slideIndex += 2;

    if(slideIndex >= currentLesson.slides.length){
        startQuiz();
    } else {
        showSlide();
    }
}
function startQuiz(){
    document.getElementById("infoSlides").style.display = "none";
    document.getElementById("questionArea").style.display = "block";

    loadQuestion();
}
function loadQuestion(){
    const q = currentLesson.questions[questionIndex];

    document.getElementById("question").textContent = q.q;

    const answers = document.querySelectorAll(".answerBtn");

    answers.forEach((btn,i)=>{
        btn.textContent = q.a[i];
        btn.onclick = () => checkAnswer(i);
    });
}
function checkAnswer(i){
    const q = currentLesson.questions[questionIndex];

    if(i === q.correct){
        playerXP += 20;
        koins += 50;
        alert("Correct! +XP +Koins");
    } else {
        alert("Wrong!");
    }

    questionIndex++;

    if(questionIndex >= currentLesson.questions.length){
        endLesson();
    } else {
        loadQuestion();
    }

    save();
    updateUI();
}
function endLesson(){
    alert("Lesson complete!");
    completeLesson();
}

document.getElementById("quitBtn").onclick = () => {

    if (confirm("Quit this lesson? Progress from this lesson won't be saved.")) {
        window.location.href = "index.html";
    }

};/* ========================= */
/* STATE */
/* ========================= */

let slideIndex = 0;
let currentQuestion = 0;
let earnedXP = 0;
let earnedKoins = 0;

/* ========================= */
/* START LESSON */
/* ========================= */

window.onload = () => {
    startLesson();
};

function startLesson() {
    document.getElementById("lessonSlides").style.display = "block";
    document.getElementById("question").style.display = "none";
    document.getElementById("answers").style.display = "none";

    document.getElementById("mascot").src = "mascot.gif";

    showSlides();
}

/* ========================= */
/* SLIDES */
/* ========================= */

function showSlides() {
    document.getElementById("slide1").textContent =
        lesson.slides[slideIndex] || "";

    document.getElementById("slide2").textContent =
        lesson.slides[slideIndex + 1] || "";
}

document.getElementById("nextBtn").onclick = () => {
    slideIndex += 2;

    if (slideIndex >= lesson.slides.length) {
        startQuiz();
    } else {
        showSlides();
    }
};

/* ========================= */
/* QUIZ */
/* ========================= */

function startQuiz() {
    document.getElementById("lessonSlides").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("answers").style.display = "grid";

    showQuestion();
}

function showQuestion() {
    document.getElementById("continueBtn").style.display = "none";

    const q = lesson.questions[currentQuestion];
    document.getElementById("question").textContent = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.className = "answerBtn";

        btn.onclick = () => checkAnswer(answer, q.correct, btn);
        answersDiv.appendChild(btn);
    });
}

/* ========================= */
/* ANSWERS */
/* ========================= */

function checkAnswer(answer, correct, btn) {
    const mascot = document.getElementById("mascot");

    document.querySelectorAll(".answerBtn").forEach(b => b.disabled = true);

    if (answer === correct) {
        btn.style.background = "#58cc02";
        earnedXP += 10;
        earnedKoins += 1;
        mascot.src = "happy.gif";
        document.getElementById("correctSound").play();
    } else {
        btn.style.background = "#ff4b4b";
        mascot.src = "sad.gif";
        document.getElementById("wrongSound").play();
    }

    document.getElementById("continueBtn").style.display = "block";
}

/* ========================= */
/* NEXT QUESTION */
/* ========================= */

document.getElementById("continueBtn").onclick = () => {
    currentQuestion++;
    document.getElementById("mascot").src = "mascot.gif";

    if (currentQuestion < lesson.questions.length) {
        showQuestion();
    } else {
        finishLesson();
    }
};

/* ========================= */
/* FINISH */
/* ========================= */

function finishLesson() {
    localStorage.setItem("earnedXP", earnedXP);
    localStorage.setItem("earnedKoins", earnedKoins);

    window.location.href = "complete.html";
}

/* ========================= */
/* QUIT BUTTON */
/* ========================= */

window.addEventListener("load", () => {
    const quitBtn = document.getElementById("quitBtn");

    quitBtn.style.position = "absolute";
    quitBtn.style.top = "20px";
    quitBtn.style.left = "20px";
    quitBtn.style.fontSize = "24px";
    quitBtn.style.background = "transparent";
    quitBtn.style.border = "none";
    quitBtn.style.color = "white";
    quitBtn.style.cursor = "pointer";

    quitBtn.onclick = () => {
        const leave = confirm("Leave this lesson?\n\nProgress will be lost.");
        if (leave) window.location.href = "index.html";
    };
});