---
name: write-agents-md
description: Write, update or shorten the AGENTS.md entry file of a project that holds this base. Use when the user asks to create, update, shorten or review AGENTS.md.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Write an AGENTS.md file

## Rules

- Keep the file under 60 lines and under 30 rules, the index apart. Every line is loaded in every session.
- Keep the sections of the base in this order: `## Rules`, `## Check commands` if any, `## Skills`, `## Index`, `## Final check`.
- Keep the vital rules of the base first: answer language, no web, only the documents of the topic, no `.fr.md` file.
- Write only what the model cannot find in the code or in the project's README.
- Write in English. One rule per line. Start each rule with a verb.
- Say what to do. Use "never" only for a real danger.
- Give the exact command for each check: lint, build, test.
- Repeat the three most important rules as questions in `## Final check`.
- Keep one line per skill: "To <task>: load the skill `<name>`."
- Do not add a project overview, a folder tree or a history.
- Do not add internal names, quotas, network details or real data.
- Never tell the model to search the web or to open a URL.

## Steps

1. Ask the user for what is missing: languages, check commands, rules that differ from common practice, mistakes seen so far.

<!-- files:begin -->

2. Read `AGENTS.md` if it exists. Keep the rules that are still true.
3. Read `package.json`, `*.csproj` and the dev container file. Copy the exact check commands from them.
4. List the folders of `.agents/skills/`. Each folder is a skill and needs one trigger line.

<!-- files:end -->

5. Produce the content with the template below. Keep the section order.
6. Count the rules outside `## Index`. If there are 30 or more, move the rules of one topic to a skill or to a document.

<!-- files:begin -->

7. Write the content to `AGENTS.md` at the project root.
8. Run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.

<!-- files:end -->

9. Give three test tasks. Each one must fail if the model ignores one rule of the file.

## Template

```markdown
# AGENTS.md

## Rules

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. <Vital rule of the base.>
3. <Project rule that differs from common practice.>

## Check commands

| When | Command |
| --- | --- |
| <Language> code changed | `<lint command>` then `<build command>` |

## Skills

- To <task>: load the skill `<name>`.

## Index

- [<Title>](docs/<topic>/<file>.md): <summary>

## Final check

- <Most important rule, as a question.>
```

## Example

Wrong:

```markdown
## Rules

- This project is an Angular application with a .NET backend, created in 2024.
- Please try to write clean code if possible.
```

Right:

```markdown
## Rules

1. Answer in the language of the user's question. Never mix two languages in one answer.
2. Write TypeScript. Never write plain JavaScript.

## Check commands

| When | Command |
| --- | --- |
| TypeScript code changed | `npm run lint` then `npm run build` |
```

## Pitfalls

- A rule that the lint already checks: delete it. Keep only the command.
- A rule copied from the README: delete it.
- A skill folder without its trigger line: the model never loads the skill.

## Final check

- Is the file under 60 lines and under 30 rules, the index apart?
- Does every check have its exact command?
- Does every skill have its trigger line?
- Is there no overview, no URL to open and no internal name?
