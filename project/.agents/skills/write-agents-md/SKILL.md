---
name: write-agents-md
description: Use when the user asks to create, update, shorten or review the AGENTS.md of the project, or to add a rule of the project - short rules in English, loaded at every request.
---

# Write the AGENTS.md of the project

## Rules

- `AGENTS.md` belongs to the team. Keep its sections: what this project gives you, this project, project rules.
- Keep the file under 60 lines. Every line is loaded at every request.
- Write only what the model cannot find in the code, `package.json`, `.agents/rules.md` or the rules of the MCP servers.
- Write in English. One rule per line. Start each rule with a verb.
- Say what to do. Use "never" only for a real danger.
- Give the exact command of each check: format, lint, build, test.
- Never write a project overview, a folder tree, a history, internal names or real data.
- Never send the model to a URL: write what it needs in the file or in a skill.

## Steps

1. Ask the user what is missing: the subject in one line, rules that differ from common practice, mistakes seen so far.
2. Read `AGENTS.md`. Keep the rules that are still true.
3. Read the `scripts` of `package.json`. Copy the exact check commands from them.
4. Write the subject on the line "Subject:", and one line per rule under "Project rules".
5. Count the lines. At 60 or more, move the rules of one task to a skill with the skill `write-skill`.
6. Give three test tasks. Each one must fail if the model ignores one rule of the file.

## Example

Wrong:

```markdown
- This project is an Angular application created in 2024 by the panel team.
- Please try to write clean code if possible.
```

Right:

```markdown
- Subject: the alarm panel of the operator console.
- Name alarm ids `ALM-<three digits>`.
- Check with `npm run lint`, then `npm run build`, then `npm test`.
```

## Pitfalls

- A rule that the lint already checks: delete it, keep the command.
- A rule copied from the README: delete it.
- A rule for one task only: move it to a skill.

## Final check

- Is the file under 60 lines?
- Does every check have its exact command?
- Is there no overview, no URL to open and no internal name?
