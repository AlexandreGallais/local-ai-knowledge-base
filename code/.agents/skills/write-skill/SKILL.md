---
name: write-skill
description: Write one skill as a SKILL.md file in the Agent Skills format, with its trigger line in AGENTS.md. Use when the user asks to create, update or review a skill.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Write a skill

## Rules

- One skill does one task. Two goals mean two skills.
- The `name` is the folder name: lowercase letters, digits and single hyphens, 64 characters at most.
- The `description` says what the skill does, then when to use it: "Use when ...". Use the words the user will type. 1024 characters at most.
- Keep the whole file at 150 lines or fewer.
- Write the steps as a numbered list. One action per step. Start each step with a verb.
- Write only what the model would get wrong without the skill.
- Give one default method. Do not list options.
- Add a `## Example` section: one wrong and one right result.
- Add a `## Pitfalls` section with the mistakes seen so far.
- End with `## Final check`: the rules the model must not miss, as questions.
- Wrap each step that reads or writes a file or runs a command between `<!-- files:begin -->` and `<!-- files:end -->`. The chat variant of the skill drops these steps.
- Write the other steps with neutral verbs: ask, produce, check, give.
- Never name a software. Never tell the model to search the web or to open a URL.

## Steps

1. Ask the user for: the task, one example input, the expected output, the mistakes seen so far.
2. Choose the `name`. Produce the `description`.
3. Produce the body with the template below.
4. Check the rules above one by one.

<!-- files:begin -->

5. Write the content to `.agents/skills/<name>/SKILL.md`.
6. Add one line to the `## Skills` section of `AGENTS.md`: "To <task>: load the skill `<name>`."
7. Run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.

<!-- files:end -->

8. Give three test prompts: two that must use the skill and one that must not.

## Template

```markdown
---
name: <skill-name>
description: <What it does>. Use when <trigger>.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# <Title>

## Rules

- <Rule. One sentence. Starts with a verb.>
- Never search the web. Never open a URL.

## Steps

1. Ask <what the skill needs>.
2. Produce <the result>.
<!-- files:begin -->
3. Write <the result> to `<path>`.
4. Run `<check command>`. Fix every error.
<!-- files:end -->
5. Give <what the user gets>.

## Example

Wrong: <result that breaks a rule>

Right: <result that follows the rules>

## Pitfalls

- <Mistake seen>: <fix>.

## Final check

- <Most important rule, as a question.>
```

## Example

Wrong: a step that writes a file without the markers, and a description without a trigger.

```markdown
description: Commit messages.

1. Write the message to `.git/COMMIT_EDITMSG`.
```

Right:

```markdown
description: Write a commit message in the Conventional Commits format. Use when the user asks to commit or to write a commit message.

1. Produce the message.
<!-- files:begin -->
2. Write the message to `.git/COMMIT_EDITMSG`.
<!-- files:end -->
```

## Pitfalls

- A colon followed by a space inside the `description` breaks the YAML header: rewrite the sentence or put the value in double quotes.
- A `name` different from the folder name: some tools reject the skill.
- A description without "Use when": the model does not know when to load the skill.
- A skill without its trigger line in `AGENTS.md`: a small model does not load it by itself.
- A skill that explains what the model already knows: cut it.

## Final check

- Is the `name` equal to the folder name?
- Does the `description` contain "Use when"?
- Is every step that reads, writes or runs between the `files` markers?
- Is the file 150 lines or fewer?
- Is the trigger line in `AGENTS.md`?
