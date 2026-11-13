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
8. Read code with the `code` tools: the outline of a file, then one function. A whole folder or a file over 2,000 lines wastes tokens.
9. Open a heavy file (`.xd`, `.pdf`, `.docx`, `.xlsx`, `.pptx`, images, archives) with the `parse` tools: the outline first, then one part. Read raw, it costs thousands of tokens and gives no structure.
10. Calculate geometry and maths with the `geometry` tools: they are tested, your head is not.

## While you write

11. Every file you write is formatted at once. Before you change a file you just wrote, read its lines again.
12. The write result lists the lint errors left in the file. Fix every one of them.
13. When a complex task matches no document and no skill, stop. Ask the user how to do it, with choices. Then save the answer as a project skill with the skill `write-project-skill`.

## Commands

14. You may run any command. The tools of the base are better than raw commands for their job: prefer them.
15. Run the check commands as `.agents/profile.json` gives them.
16. A package the work needs is missing: say which one and its version. An install asks the user first: let them answer.
17. A command that cannot be undone (an install, a push, a new branch, `rm -rf`, `git reset --hard`) asks the user first. Say why you need it.

## The web

18. The web is closed: no search, no download. Find the answer in the `docs` tools and in the installed packages.
19. Work on the current branch, without a worktree, unless the user asks otherwise.
20. When you are stuck, ask the user rather than guess.
21. Prefer the `parse` tools for heavy files and the `code` tools for long files: they cost far fewer tokens.

## Finish

22. Say "done" only after the check commands of `.agents/profile.json` end with zero errors: format, lint, build, tests.
23. Stop after 3 failed attempts on the same error. Show the error to the user.
24. At the start of a session and after a context summary, call `work_resume` first when you have this tool. Go on from the task it gives, never from your memory of the conversation.
25. Never write tool-call tags or thinking tags as text. Name them with words.
