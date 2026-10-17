// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
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
} = require("../src/quiz.js");

test("createQuiz initializes an independent state when given questions", () => {
  const questions = [{ answer: 1 }];
  const state = createQuiz(questions);

  assert.deepEqual(state, {
    questions,
    current: 0,
    score: 0,
    questionResolved: false,
  });
  assert.notEqual(state.questions, questions);
});

test("createQuiz initializes an empty quiz when given no questions", () => {
  assert.equal(isQuizFinished(createQuiz([])), true);
});

test("answerQuestion increments the score when the answer is correct", () => {
  const initialState = createQuiz([{ answer: 1 }]);
  const result = answerQuestion(initialState, 1);

  assert.equal(result.correct, true);
  assert.equal(result.state.score, 1);
  assert.equal(result.state.questionResolved, true);
  assert.equal(initialState.score, 0);
  assert.equal(initialState.questionResolved, false);
});

test("answerQuestion leaves the score unchanged when the answer is incorrect", () => {
  const initialState = createQuiz([{ answer: 1 }]);
  const result = answerQuestion(initialState, 0);

  assert.equal(result.correct, false);
  assert.equal(result.state.score, 0);
  assert.equal(result.state.questionResolved, true);
  assert.equal(initialState.questionResolved, false);
});

test("skipQuestion resolves the question without changing the score", () => {
  const initialState = createQuiz([{ answer: 1 }]);
  const resolvedState = skipQuestion(initialState);

  assert.equal(resolvedState.questionResolved, true);
  assert.equal(resolvedState.score, 0);
  assert.equal(initialState.questionResolved, false);
});

test("advanceQuestion moves to the next unresolved question", () => {
  const initialState = answerQuestion(createQuiz([{ answer: 1 }, { answer: 0 }]), 1).state;
  const nextState = advanceQuestion(initialState);

  assert.equal(nextState.current, 1);
  assert.equal(nextState.questionResolved, false);
  assert.equal(initialState.current, 0);
  assert.equal(initialState.questionResolved, true);
});

test("isQuizFinished returns false before the last question is advanced", () => {
  assert.equal(isQuizFinished(createQuiz([{ answer: 0 }])), false);
});

test("isQuizFinished returns true after advancing past the last question", () => {
  const finished = advanceQuestion(createQuiz([{ answer: 0 }]));

  assert.equal(isQuizFinished(finished), true);
});

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade gives an A for exactly 90%", () => {
  assert.equal(getGrade(90), "A");
});

test("getGrade gives a B for exactly 75%", () => {
  assert.equal(getGrade(75), "B");
});

test("getGrade gives a C for exactly 50%", () => {
  assert.equal(getGrade(50), "C");
});

test("getGrade uses the lower grade just below each boundary", () => {
  assert.equal(getGrade(89), "B");
  assert.equal(getGrade(74), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns the message for each question outcome", () => {
  assert.equal(getFeedbackMessage("correct"), "Correct!");
  assert.equal(
    getFeedbackMessage("incorrect"),
    "Not quite. The correct answer is highlighted."
  );
  assert.equal(getFeedbackMessage("timeout"), "Time's up!");
});

test("getFeedbackMessage rejects an unknown outcome", () => {
  assert.throws(() => getFeedbackMessage("unknown"), TypeError);
});

test("formatTimeLeft formats positive seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft formats zero seconds", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});

test("formatTimeLeft rounds partial seconds up", () => {
  assert.equal(formatTimeLeft(4.2), "⏱ 5s");
});

test("formatTimeLeft rounds any positive fraction up to one second", () => {
  assert.equal(formatTimeLeft(0.1), "⏱ 1s");
});

test("formatTimeLeft rejects null", () => {
  assert.throws(() => formatTimeLeft(null), TypeError);
});

test("formatTimeLeft rejects a missing value", () => {
  assert.throws(() => formatTimeLeft(), TypeError);
});

test("formatTimeLeft rejects negative seconds", () => {
  assert.throws(() => formatTimeLeft(-1), RangeError);
});

test("formatTimeLeft rejects non-finite seconds", () => {
  assert.throws(() => formatTimeLeft(Infinity), TypeError);
  assert.throws(() => formatTimeLeft(NaN), TypeError);
});
