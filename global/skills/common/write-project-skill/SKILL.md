---
name: write-project-skill
description: Use when the user just told you how to do a task that no document and no skill covers - save that procedure as a skill of the project in .agents/skills/.
---

# Save a procedure as a project skill

When a complex task matches no document and no skill, never improvise. Ask the user how to do it, with
the question tool and 2 to 4 options. Then save the answer here, so that the next session knows it.

## Steps

1. Choose the name: 2 to 4 lower-case English words joined by hyphens, a verb first: `add-alarm-symbol`.
2. Create `.agents/skills/<name>/SKILL.md` in the form below. The folder name and `name` are the same.
3. Write the steps of the user in short imperative English sentences, in their order. Keep their names
   of files, commands and types exactly.
4. Add one wrong and one right example taken from the task you just did.
5. Run `node /opt/local-ai-base/tools/check-skill.ts .agents/skills/<name>`. Fix every finding.
6. Tell the user the name of the skill and the one line that says when it is used.

## Form

```md
---
name: <name>
description: Use when <the situation, in one line>.
---

# <Title>

## Steps

1. <Step.>

## Example

Wrong: <...> Right: <...>

## Final check

- <A question that a command or a look answers.>
```

## Rules

- 150 lines at most, in English, even when the user spoke another language.
- Write only what the user said and what the code shows.
- Never change a skill of the global base: it is read-only. A project skill with the same name wins.

## Example

Wrong: the user explains how alarms are numbered, you use it once and forget it. Right: the skill
`number-alarms` in `.agents/skills/number-alarms/SKILL.md`, with the steps the user gave.

## Final check

- Does `check-skill.ts` end with "0 findings."?
- Does the description start with "Use when"?
