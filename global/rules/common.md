# Common rules

These rules apply in every project. The project's `AGENTS.md` adds its own rules.

## Where things are

1. The global base is outside the repository, read-only, at `/opt/local-ai-base`. Its documents, skills and tools are not in the project: this is normal, never an error. Never copy them into the project.
2. Answer in the language of the user's question. Never mix two languages in one answer. Write code, comments, file content and commit messages in English.

## Before you write code

3. Read the versions in `package.json` (`typescript`, `@angular/core` when there is one). Write only what these versions allow.
4. Write TypeScript, never plain JavaScript. Tool configuration files are the only exception.
5. Use Angular only when the project has it or the user asks for it. For a plain TypeScript project, use Vite, Vitest and Node.
6. When a task matches a skill, load that skill before you start.
7. Look up an API with the `docs` tools: search, then read one section. Trust the documentation more than your memory.
8. Read code with the `code` tools: the outline of a file, then one function. A whole folder or a file over 2,000 lines wastes tokens.
9. Open a heavy file (`.xd`, `.pdf`, `.docx`, `.xlsx`, `.pptx`, images, archives) with the `parse` tools: the outline first, then one part. Read raw, it costs thousands of tokens and gives no structure.
10. Calculate geometry and maths with the `geometry` tools: they are tested, your head is not.

## While you write

11. When the project has the strict lint of the base (a folder `.agents/lint/`), every file you write is formatted at once and the write result lists the lint errors left. Fix every one of them.
12. When a complex task matches no document and no skill, ask the user how to do it, with choices. Then save the answer as a project skill with the skill `write-project-skill`.

## Commands

13. You may run any command. The tools of the base are better than raw commands for their job: prefer them.
14. Install the packages the work needs yourself: `npm install --save-dev --save-exact <name>@<version>`. OpenCode asks the user to approve it: wait for the answer, then go on.
15. A command that cannot be undone (an install, a push, a new branch, `rm -rf`, `git reset --hard`) asks the user first. Say in one line why you need it.
16. The web is closed: no search, no download besides `npm install`. Find the answer in the `docs` tools and in the installed packages.
17. Work on the current branch, without a worktree, unless the user asks otherwise.

## Finish

18. Say "done" only after the build and the tests of the project end with zero errors, and the lint when it has one.
19. Stop after 3 failed attempts on the same error. Show the error to the user.
20. When you are stuck, ask the user rather than guess.
21. Never write tool-call tags or thinking tags as text. Name them with words.
