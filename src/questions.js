// Quiz questions.
// "answer" is the index (starting at 0) of the correct option.
const QUESTIONS = [
  {
    question: "Which command creates a new Git branch and switches to it?",
    options: ["git branch -d", "git switch -c", "git merge", "git push -u"],
    answer: 1,
  },
  {
    question: "Which file does GitHub show as a repository's front page?",
    options: ["index.txt", "README.md", "HOME.md", "about.html"],
    answer: 1,
  },
  {
    question: "What does PR stand for on GitHub?",
    options: ["Pull request", "Push release", "Project review", "Public repository"],
    answer: 0,
  },
  {
    question: "In GitHub Copilot, which key accepts an inline suggestion?",
    options: ["Enter", "Esc", "Tab", "Shift"],
    answer: 2,
  },
  {
    question: "Which file gives Copilot custom instructions for a repository?",
    options: [".github/copilot-instructions.md", "copilot.json", ".vscode/ai.txt", "package.json"],
    answer: 0,
  },
  {
    question: "What does `git clone` do?",
    options: [
      "Deletes a repository",
      "Copies a remote repository to your computer",
      "Creates a new branch",
      "Merges two branches",
    ],
    answer: 1,
  },
  {
    question: "Which Git command stages a specific file?",
    options: ["git add <file>", "git commit <file>", "git push <file>", "git fetch <file>"],
    answer: 0,
  },
  {
    question: "Which Git command records staged changes in repository history?",
    options: ["git status", "git commit", "git diff", "git init"],
    answer: 1,
  },
  {
    question: "What does `git status` show?",
    options: [
      "The remote repository's issue list",
      "The latest release notes",
      "The state of the working tree and staging area",
      "A list of all repository contributors",
    ],
    answer: 2,
  },
  {
    question: "Which GitHub feature tracks tasks, enhancements, and bugs?",
    options: ["Discussions", "Actions", "Projects", "Issues"],
    answer: 3,
  },
  {
    question: "Which file commonly explains how to contribute to a repository?",
    options: ["CONTRIBUTING.md", "LICENSE", "package-lock.json", "CHANGELOG"],
    answer: 0,
  },
  {
    question: "Which Git command downloads remote changes without merging them?",
    options: ["git pull", "git fetch", "git push", "git checkout"],
    answer: 1,
  },
  {
    question: "What is a fork on GitHub?",
    options: [
      "A snapshot of a repository's issue list",
      "A branch protected from deletion",
      "A personal copy of another user's repository",
      "A release built from a tag",
    ],
    answer: 2,
  },
  {
    question: "Which file typically lists a Node.js project's scripts and dependencies?",
    options: ["README.md", "tsconfig.json", "index.html", "package.json"],
    answer: 3,
  },
  {
    question: "What does `git merge` do?",
    options: [
      "Combines changes from different branches",
      "Deletes a remote repository",
      "Stages files for a commit",
      "Creates a copy of a repository",
    ],
    answer: 0,
  },
  {
    question: "Which Copilot feature suggests code as you type?",
    options: ["Repository insights", "Inline suggestions", "Pull request reviews", "GitHub Issues"],
    answer: 1,
  },
  {
    question: "Which file is commonly used to define a GitHub Actions workflow?",
    options: [".github/workflows/ci.yml", "Dockerfile", ".gitignore", "README.md"],
    answer: 0,
  },
  {
    question: "Which YAML key triggers a workflow on code pushes?",
    options: ["run:", "on:", "jobs:", "steps:"],
    answer: 1,
  },
  {
    question: "What does a GitHub Actions job do?",
    options: [
      "Runs one or more steps in an environment",
      "Deletes the repository",
      "Creates a branch",
      "Copies files to a server",
    ],
    answer: 0,
  },
  {
    question: "What does the `on:` key in a workflow do?",
    options: [
      "It installs dependencies",
      "It defines environment variables",
      "It specifies which events trigger the workflow",
      "It creates a Docker image",
    ],
    answer: 2,
  },
  {
    question: "Which action is commonly used to check out the repository contents in a workflow job?",
    options: [
      "actions/setup-node@v4",
      "docker/build-push-action@v5",
      "actions/cache@v4",
      "actions/checkout@v4",
    ],
    answer: 3,
  },
];

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS };
}
