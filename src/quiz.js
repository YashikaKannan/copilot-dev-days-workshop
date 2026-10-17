// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

/**
 * Returns the message shown for a resolved question.
 */
function getFeedbackMessage(outcome) {
  switch (outcome) {
    case "correct":
      return "Correct!";
    case "incorrect":
      return "Not quite. The correct answer is highlighted.";
    case "timeout":
      return "Time's up!";
    default:
      throw new TypeError("outcome must be correct, incorrect, or timeout");
  }
}

/**
 * Formats a non-negative time in seconds, rounding partial seconds up.
 */
function formatTimeLeft(seconds) {
  if (typeof seconds !== "number" || !Number.isFinite(seconds)) {
    throw new TypeError("seconds must be a finite number");
  }
  if (seconds < 0) {
    throw new RangeError("seconds must not be negative");
  }
  return `⏱ ${Math.ceil(seconds)}s`;
}

/**
 * Creates the initial state for a quiz.
 */
function createQuiz(questions) {
  return {
    questions: [...questions],
    current: 0,
    score: 0,
    questionResolved: false,
  };
}

/**
 * Resolves the current question and returns the updated state and outcome.
 */
function answerQuestion(state, selectedIndex) {
  const question = state.questions[state.current];
  const correct = isCorrect(question, selectedIndex);
  return {
    state: {
      ...state,
      score: state.score + (correct ? 1 : 0),
      questionResolved: true,
    },
    correct,
  };
}

/**
 * Marks the current question resolved without changing the score.
 */
function skipQuestion(state) {
  return { ...state, questionResolved: true };
}

/**
 * Advances to the next question.
 */
function advanceQuestion(state) {
  return {
    ...state,
    current: state.current + 1,
    questionResolved: false,
  };
}

/**
 * Returns whether the quiz has no more questions.
 */
function isQuizFinished(state) {
  return state.current >= state.questions.length;
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    shuffle,
    isCorrect,
    calculatePercentage,
    getGrade,
    getFeedbackMessage,
    formatTimeLeft,
    createQuiz,
    answerQuestion,
    skipQuestion,
    advanceQuestion,
    isQuizFinished,
  };
}
