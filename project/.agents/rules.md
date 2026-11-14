# Common rules

These rules apply in every project that holds `.agents/`. The project's `AGENTS.md` adds its own rules.
Each brick of `.agents/mcp/` adds the rules of its MCP server.

## Language

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. Write code, comments, file content and commit messages in English.

## Before you write code

3. Read the versions in `package.json` (`typescript`, `@angular/core` when there is one). Write only what these versions allow.
4. Write TypeScript, never plain JavaScript. Tool configuration files are the only exception.
5. Use Angular only when the project has it or the user asks for it.
6. When a task matches a skill of `.agents/skills/`, load that skill before you start.
7. Before a calculation (an angle, a matrix, a rounding), work it out step by step, then check it in a test on one value worked by hand.
8. When a complex task matches no skill, ask the user how to do it with the question tool. Then save the answer as a project skill with the skill `write-skill`.

## Format and lint

9. Each TypeScript, JavaScript, HTML, JSON, CSS or SCSS file you write is formatted at once, by ESLint, Prettier and Stylelint. A file that changes after you write it is the format, not an error: read it again before you edit it.
10. After you write code, run `npm run lint` and fix every error it gives. Before you say "done", run `npm run check` until it ends with zero errors.
11. Fix the code, never the rule: no `eslint-disable` comment, no change to the configs, to `lint/` or to `lint/settings.mjs`, unless the user asks for it.
12. For a rule you do not know, look its id up in the documentation before you change the code.
13. When the lint says a theme is skipped because a package is missing, run `npm install`.

## Commands

14. Run every command yourself, installs included. Never ask the user to run a command. When OpenCode asks the user to approve it, wait for the answer, then go on.
15. Before a command that cannot be undone (a push, a new branch, `rm -rf`, `git reset --hard`), say in one line why you need it.
16. Work on the current branch, without a worktree, unless the user asks otherwise.

## Finish

17. Say "done" only after `npm run check`, the build and the tests of the project end with zero errors.
18. Stop after 3 failed attempts on the same error. Show the error to the user.
19. When you are stuck or need a choice of the user, ask with the question tool, with options, rather than guess.
20. Never write tool-call tags or thinking tags as text. Name them with words.
