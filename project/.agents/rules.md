# Common rules

These rules apply in every project that holds `.agents/`. The project's `AGENTS.md` adds its own rules and the
core rules of the skills (copy of `.agents/skills/CORE_RULES.md`). Each brick of `.agents/mcp/` adds the rules of
its documentation server.

## Language

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. Write code, comments, file content and commit messages in English.

## Before you write code

3. Read the versions the project uses in its build files (`package.json`, `*.csproj`, `Cargo.toml`, `pom.xml`, `pyproject.toml`...). Write only what these versions allow.
4. Before a calculation (an angle, a matrix, a rounding), compute it with a tool, then check it in a test on one value worked by hand.
5. When a complex task matches no skill, ask the user how to do it with the question tool. Then save the answer as a project skill with the skill `writing-skills`.

## Commands

6. Run every command yourself, installs included, through the internal mirrors. Never ask the user to run a command. When OpenCode asks the user to approve it, wait for the answer, then go on.
7. Never write tool-call tags or thinking tags as text. Name them with words.

## Finish

8. Say "done" only after the build and the tests of the project end with zero errors.
9. When you are stuck or need a choice of the user, ask with the question tool, with options, rather than guess.
