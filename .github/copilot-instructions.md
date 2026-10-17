# Repository instructions

## Build and test

- Use Node.js 20 or newer. The project has no install or build step.
- Run the test suite from the repository root with `npm test`.
- Run one test by name with Node's built-in test runner, for example:
  `node --test --test-name-pattern="isCorrect returns true for the right answer" tests/quiz.test.js`
- Start the app with `npm start`; it serves `src/` at `http://localhost:8080`.

The starter intentionally has one failing test: `getGrade gives an A for exactly 90%`. The workshop's debug chapter fixes this grade-boundary bug; don't remove or weaken the test to make the starter suite pass.

## Architecture

- This is a dependency-free, vanilla JavaScript quiz served as static files; there is no bundler or framework.
- `src/questions.js` owns the question data, `src/quiz.js` contains DOM-free quiz logic, and `src/app.js` connects that logic to the page. Keep the script order in `src/index.html` (`questions.js`, `quiz.js`, then `app.js`): later scripts rely on globals defined earlier.
- `src/quiz.js` and `src/questions.js` expose their browser globals while conditionally exporting the same APIs through CommonJS for Node tests.
- The root `index.html` redirects GitHub Pages visitors to `src/index.html`.
- `tests/quiz.test.js` tests quiz logic and `tests/questions.test.js` validates question data with Node's built-in test runner.

## Project-specific conventions

- Keep core quiz logic in `src/quiz.js` free of browser/DOM code so it remains directly testable in Node.
- Each question in `src/questions.js` has exactly four options; `answer` is the zero-based index of the correct option. The data tests enforce this shape and require unique question text.
- The three guides in [`workshops/`](../workshops/) describe the same starter app for VS Code, Copilot CLI, and the Copilot app. When changing the shared starter behavior or its commands, keep the applicable guide checkpoints consistent; see [`README.md`](../README.md) for the workshop overview.
- [`.vscode/mcp.json`](../.vscode/mcp.json) configures GitHub MCP for issue and pull-request workflows and Playwright MCP for browser interaction with the quiz.
