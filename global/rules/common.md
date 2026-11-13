# Common rules

These rules apply in every project. The project's `AGENTS.md` adds its own rules.

## Where things are

1. The global base is outside the repository, read-only, at `/opt/local-ai-base`. Its documents, skills and tools are not in the project: this is normal, never an error. Never copy them into the project.
2. The project holds only `AGENTS.md` and `.agents/`. `.agents/profile.json` gives the profile of the project and its versions. `.agents/work/` holds your work files; Git ignores it.
3. Answer in the language of the user's question. Never mix two languages in one answer. Write code, comments, file content and commit messages in English.

## Before you write code

4. Read the versions of `@angular/core`, `@ngrx/signals` and `typescript` in `package.json`. Write only what these versions allow.
5. Write TypeScript, never plain JavaScript. Tool configuration files are the only exception.
6. When a task matches a skill, load that skill before you start.
7. Look up an API with the `docs` tools: search, then read one section. Trust the documentation more than your memory.
8. Never read a whole folder, nor a file over 2,000 lines. Read code with the `code` tools: the outline of a file, then one function.
9. Never read a heavy file raw (`.xd`, `.pdf`, `.docx`, `.xlsx`, `.pptx`, images, archives). Use the `parse` tools: the outline first, then one part.
10. Never calculate geometry or maths in your head. Use the `geometry` tools.

## While you write

11. Every file you write is formatted at once. Before you change a file you just wrote, read its lines again.
12. The write result lists the lint errors left in the file. Fix every one of them.
13. When a complex task matches no document and no skill, stop. Ask the user how to do it, with choices. Then save the answer as a project skill with the skill `write-project-skill`.

## Never

14. Never install, update or remove a package without the user's agreement: not `npm install`, not `npm update`, not `npx` of a package that is not installed.
15. Never run a network command: no `curl`, `wget`, `git clone`, `git fetch`, `git pull`, `git push`. Never search the web.
16. Never create a branch or a worktree. Work on the current branch.
17. Never run a destructive command: no `rm -rf`, `git reset --hard`, `git clean`.

## Finish

18. Say "done" only after the check commands of `.agents/profile.json` end with zero errors: format, lint, build, tests.
19. Stop after 3 failed attempts on the same error. Show the error to the user.
20. At the start of a session and after a context summary, call `work_resume` first when you have this tool. Go on from the task it gives, never from your memory of the conversation.
21. Never write tool-call tags or thinking tags as text. Name them with words.
