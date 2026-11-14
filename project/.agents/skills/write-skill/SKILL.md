---
name: write-skill
description: Use when the user asks to create, update or review a skill of the project - one SKILL.md in .agents/skills/<name>/, in the Agent Skills format, listed in AGENTS.md.
---

# Write a skill

## Rules

- One skill does one task. Two goals mean two skills.
- The `name` is the folder name: lowercase letters, digits and single hyphens, 64 characters at most.
- The `description` starts with "Use when", then says what the skill gives. Use the words the user types.
- Keep the whole file at 150 lines or fewer, in English, even when the user speaks another language.
- Write the steps as a numbered list. One action per step. Start each step with a verb.
- Write only what the model would get wrong without the skill. Give one default method, not a list of options.
- Add `## Example` with one wrong and one right result, and end with `## Final check`: the rules not to miss, as questions.
- A template the skill copies goes in `assets/` of its folder, tested like the code of the project.
- Never send the model to a URL: write what it needs in the skill.

## Steps

1. Ask the user for: the task, one example input, the expected output, the mistakes seen so far.
2. Choose the `name`: 2 to 4 words, a verb first: `add-alarm-row`.
3. Write `.agents/skills/<name>/SKILL.md` with the template below.
4. Leave `AGENTS.md` as it is: OpenCode lists the skills of `.agents/skills/` by itself.
5. Run `node .agents/skills/write-skill/scripts/check-skill.ts .agents/skills/<name>`. Fix every finding.
6. Give three test prompts: two that must use the skill and one that must not.

## Template

```markdown
---
name: <skill-name>
description: Use when <the situation> - <what the skill gives>.
---

# <Title>

## Rules

- <Rule. One sentence. Starts with a verb.>

## Steps

1. <Step.>

## Example

Wrong: <result that breaks a rule>

Right: <result that follows the rules>

## Final check

- <Most important rule, as a question.>
```

## Example

Wrong: a description without a trigger, and a step that does two things.

```markdown
description: Commit messages.

1. Read the diff and write the message and commit.
```

Right:

```markdown
description: Use when the user asks for a commit message - a Conventional Commits message that passes commitlint.

1. Read the staged diff.
2. Write the header.
```

## Pitfalls

- A colon followed by a space inside the `description` breaks the YAML header: use " - " instead.
- A `name` different from the folder name: OpenCode refuses the skill.
- A skill that explains what the model already knows: cut it.

## Final check

- Is the `name` equal to the folder name?
- Does the `description` start with "Use when"?
- Is the skill in the list of `AGENTS.md`?
- Does `check-skill.ts` end with 0 findings?
