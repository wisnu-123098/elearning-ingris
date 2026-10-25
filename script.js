
/* ===== DATA KOSAKATA ===== */
const vocabulary = [
    {
        english: "Apple",
        indonesian: "Apel",
        sentence: "I eat an apple.",
        translation: "Saya makan sebuah apel."
    },
    {
        english: "Book",
        indonesian: "Buku",
        sentence: "This is my book.",
        translation: "Ini buku saya."
    },
    {
        english: "Water",
        indonesian: "Air",
        sentence: "I drink water.",
        translation: "Saya minum air."
    },
    {
        english: "Friend",
        indonesian: "Teman",
        sentence: "She is my friend.",
        translation: "Dia teman saya."
    },
    {
        english: "School",
        indonesian: "Sekolah",
        sentence: "I go to school.",
        translation: "Saya pergi ke sekolah."
    },
    {
        english: "Beautiful",
        indonesian: "Cantik / indah",
        sentence: "The garden is beautiful.",
        translation: "Taman itu indah."
    },
    {
        english: "Happy",
        indonesian: "Senang",
        sentence: "I am happy today.",
        translation: "Saya senang hari ini."
    },
    {
        english: "Learn",
        indonesian: "Belajar",
        sentence: "I learn English every day.",
        translation: "Saya belajar bahasa Inggris setiap hari."
    }
];

/* ===== FITUR KOSAKATA ===== */
let currentIndex = 0;

const wordNumber = document.getElementById("word-number");
const englishWord = document.getElementById("english-word");
const indonesianWord = document.getElementById("indonesian-word");
const exampleSentence = document.getElementById("example-sentence");
const exampleTranslation = document.getElementById("example-translation");

function showWord() {
    const word = vocabulary[currentIndex];

    wordNumber.textContent =
        `Kata ${currentIndex + 1} dari ${vocabulary.length}`;

    englishWord.textContent = word.english;
    indonesianWord.textContent = word.indonesian;
    exampleSentence.textContent = word.sentence;
    exampleTranslation.textContent = word.translation;
}

document.getElementById("next-word").addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= vocabulary.length) {
        currentIndex = 0;
    }

    showWord();
});

/* ===== FITUR SUARA ===== */
document.getElementById("speak-button").addEventListener("click", function () {
    if (!("speechSynthesis" in window)) {
        alert("Browser kamu belum mendukung fitur suara.");
        return;
    }

    window.speechSynthesis.cancel();

    const word = vocabulary[currentIndex];
    const speech = new SpeechSynthesisUtterance(
        word.english + ". " + word.sentence
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
});

/* ===== TOMBOL MULAI BELAJAR ===== */
document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("vocabulary").scrollIntoView({
        behavior: "smooth"
    });
});

/* ===== DATA KUIS ===== */
const questions = [
    {
        question: 'Apa arti kata "Book"?',
        options: ["Pensil", "Buku", "Meja", "Pintu"],
        answer: 1,
        explanation: "Book berarti buku."
    },
    {
        question: 'Apa arti kata "Apple"?',
        options: ["Jeruk", "Pisang", "Apel", "Mangga"],
        answer: 2,
        explanation: "Apple berarti apel."
    },
    {
        question: "Lengkapi kalimat: I ___ a student.",
        options: ["is", "are", "am", "be"],
        answer: 2,
        explanation: "Subjek I menggunakan to be am."
    },
    {
        question: "Apa arti kata Beautiful?",
        options: ["Sedih", "Cantik / indah", "Kecil", "Cepat"],
        answer: 1,
        explanation: "Beautiful berarti cantik atau indah."
    },
    {
        question: "Pilih kalimat yang benar.",
        options: [
            "She are happy.",
            "She am happy.",
            "She is happy.",
            "She be happy."
        ],
        answer: 2,
        explanation: "She menggunakan to be is."
    }
];

/* ===== VARIABEL KUIS ===== */
let questionIndex = 0;
let score = 0;
let hasAnswered = false;

const questionNumber = document.getElementById("question-number");
const scoreText = document.getElementById("score");
const questionText = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("feedback");
const nextQuestionButton = document.getElementById("next-question");
const progressBar = document.getElementById("progress-bar");

/* ===== MENAMPILKAN SOAL ===== */
function showQuestion() {
    hasAnswered = false;

    const question = questions[questionIndex];

    questionNumber.textContent =
        `Soal ${questionIndex + 1} dari ${questions.length}`;

    questionText.textContent = question.question;
    scoreText.textContent = `Skor: ${score}`;

    feedback.textContent = "";
    feedback.style.color = "";

    progressBar.style.width =
        `${(questionIndex / questions.length) * 100}%`;

    nextQuestionButton.disabled = true;
    nextQuestionButton.textContent =
        questionIndex === questions.length - 1
            ? "Lihat Hasil →"
            : "Soal Berikutnya →";

    answerOptions.innerHTML = "";

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "option";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        answerOptions.appendChild(button);
    });
}

/* ===== MEMERIKSA JAWABAN ===== */
function checkAnswer(selectedIndex) {
    if (hasAnswered) {
        return;
    }

    hasAnswered = true;

    const question = questions[questionIndex];
    const buttons = answerOptions.querySelectorAll(".option");

    buttons.forEach(function (button, index) {
        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }

        if (
            index === selectedIndex &&
            selectedIndex !== question.answer
        ) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === question.answer) {
        score++;

        feedback.textContent =
            "Benar! " + question.explanation;

        feedback.style.color = "#15803d";
    } else {
        feedback.textContent =
            "Belum tepat. " + question.explanation;

        feedback.style.color = "#b91c1c";
    }

    scoreText.textContent = `Skor: ${score}`;

    progressBar.style.width =
        `${((questionIndex + 1) / questions.length) * 100}%`;

    nextQuestionButton.disabled = false;
}

/* ===== SOAL BERIKUTNYA DAN HASIL ===== */
nextQuestionButton.addEventListener("click", function () {
    if (!hasAnswered) {
        return;
    }

    if (questionIndex < questions.length - 1) {
        questionIndex++;
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    const finalScore = Math.round(
        (score / questions.length) * 100
    );

    questionNumber.textContent = "Kuis selesai!";
    questionText.textContent = `Nilai kamu: ${finalScore} / 100`;

    answerOptions.innerHTML = "";

    const resultMessage = document.createElement("p");

    if (finalScore === 100) {
        resultMessage.textContent =
            "Hebat! Semua jawaban kamu benar.";
    } else if (finalScore >= 60) {
        resultMessage.textContent =
            "Bagus! Terus belajar agar semakin mahir.";
    } else {
        resultMessage.textContent =
            "Tetap semangat! Pelajari kembali materi dasarnya.";
    }

    answerOptions.appendChild(resultMessage);

    feedback.textContent =
        `Jawaban benar: ${score} dari ${questions.length} soal.`;

    nextQuestionButton.textContent = "Ulangi Kuis";
    nextQuestionButton.disabled = false;

    progressBar.style.width = "100%";

    // Aktifkan mode tombol ulangi
    nextQuestionButton.onclick = function () {
        questionIndex = 0;
        score = 0;
        hasAnswered = false;

        nextQuestionButton.onclick = null;
        showQuestion();
    };
}

/* ===== JALANKAN SAAT HALAMAN DIBUKA ===== */
showWord();
showQuestion();
