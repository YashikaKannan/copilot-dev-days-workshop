// UI code: connects the quiz logic (quiz.js) to the page (index.html).

const QUESTION_TIME_LIMIT_SECONDS = 15;
const QUESTION_TIME_LIMIT_MS = QUESTION_TIME_LIMIT_SECONDS * 1000;
const state = {
  questions: [],
  current: 0,
  score: 0,
  timerId: null,
  deadline: null,
  questionResolved: false,
};

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress");
const timeLeftText = document.getElementById("time-left");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const gradeText = document.getElementById("grade-text");

function showScreen(screenToShow) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function stopQuestionTimer() {
  if (state.timerId !== null) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  state.deadline = null;
}

function startQuiz() {
  stopQuestionTimer();
  state.questions = shuffle(QUESTIONS);
  state.current = 0;
  state.score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  stopQuestionTimer();
  state.questionResolved = false;
  const question = state.questions[state.current];
  progressText.textContent = `Question ${state.current + 1} of ${state.questions.length}`;
  questionText.textContent = question.question;
  feedbackText.textContent = "";
  nextButton.hidden = true;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, button));
    item.appendChild(button);
    optionsList.appendChild(item);
  });

  startQuestionTimer();
}

function startQuestionTimer() {
  state.deadline = Date.now() + QUESTION_TIME_LIMIT_MS;

  function updateCountdown() {
    const remainingMs = state.deadline - Date.now();
    const remainingSeconds = Math.ceil(Math.max(0, remainingMs) / 1000);
    timeLeftText.textContent = formatTimeLeft(remainingSeconds);
    timeLeftText.classList.toggle("urgent", remainingSeconds <= 5);

    if (remainingMs <= 0) {
      timeExpired();
    }
  }

  updateCountdown();
  state.timerId = setInterval(updateCountdown, 250);
}

function selectAnswer(selectedIndex, selectedButton) {
  if (state.questionResolved) return;
  if (Date.now() >= state.deadline) {
    timeExpired();
    return;
  }

  state.questionResolved = true;
  stopQuestionTimer();
  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));

  if (isCorrect(question, selectedIndex)) {
    state.score++;
    selectedButton.classList.add("correct");
    feedbackText.textContent = getFeedbackMessage("correct");
  } else {
    selectedButton.classList.add("wrong");
    buttons[question.answer].classList.add("correct");
    feedbackText.textContent = getFeedbackMessage("incorrect");
  }

  nextButton.hidden = false;
  nextButton.focus();
}

function timeExpired() {
  if (state.questionResolved) return;

  state.questionResolved = true;
  stopQuestionTimer();
  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
  buttons[question.answer].classList.add("correct");
  feedbackText.textContent = getFeedbackMessage("timeout");
  nextButton.hidden = false;
  nextButton.focus();
}

function nextQuestion() {
  state.current++;
  if (state.current < state.questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const total = state.questions.length;
  const percentage = calculatePercentage(state.score, total);
  scoreText.textContent = `You scored ${state.score} out of ${total} (${percentage}%)`;
  gradeText.textContent = `Grade: ${getGrade(percentage)}`;
  showScreen(resultScreen);
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
