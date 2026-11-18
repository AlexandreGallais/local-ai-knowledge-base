# Common rules

These rules apply in every project that holds `.agents/`. The project's `AGENTS.md` adds its own rules.
Each brick of `.agents/mcp/` adds the rules of its documentation server.

## Language

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. Write code, comments, file content and commit messages in English.

## Before you write code

3. Read the versions the project uses in its build files (`package.json`, `*.csproj`, `Cargo.toml`, `pom.xml`, `pyproject.toml`...). Write only what these versions allow.
4. When your memory of an API, an option or a command is not sure, look it up with the documentation servers of `.agents/mcp/`: `search_docs`, then `read_doc` on one section.
5. When a task matches a skill of `.agents/skills/`, load that skill before you start.
6. Before a calculation (an angle, a matrix, a rounding), work it out step by step, then check it in a test on one value worked by hand.
7. When a complex task matches no skill, ask the user how to do it with the question tool. Then save the answer as a project skill with the skill `write-skill`.

## Commands

8. Run every command yourself, installs included. Never ask the user to run a command. When OpenCode asks the user to approve it, wait for the answer, then go on.
9. Before a command that cannot be undone (a push, a new branch, `rm -rf`, `git reset --hard`), say in one line why you need it.
10. Work on the current branch, without a worktree, unless the user asks otherwise.

## Finish

11. Say "done" only after the build and the tests of the project end with zero errors.
12. Stop after 3 failed attempts on the same error. Show the error to the user.
13. When you are stuck or need a choice of the user, ask with the question tool, with options, rather than guess.
14. Never write tool-call tags or thinking tags as text. Name them with words.
