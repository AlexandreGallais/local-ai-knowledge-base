---
name: write-agent
description: Use when the user asks to create, update or review an agent - a role written as a skill, with its steps and its answer format, that the one agent of OpenCode loads.
---

# Write an agent

## Rules

- An agent is a skill: `.agents/skills/<agent-name>/SKILL.md`. The one agent of OpenCode loads it and plays the role.
- Follow every rule of the skill `write-skill`.
- Use these sections, in this order: `## Role`, `## Rules`, `## Steps`, `## Answer format`, `## Example`, `## Final check`.
- Write the role in one sentence: "You are <role>."
- Give the agent the fewest rights it needs. A review agent reads files and never changes them.
- Start the answer format with the result. Then at most 10 lines of details. Then the documents used.

## Steps

1. Ask the user for: the role, what the agent may change, one test question, the expected answer.
2. Write `.agents/skills/<agent-name>/SKILL.md` with the template below.
3. Leave `AGENTS.md` as it is: OpenCode lists the skills of `.agents/skills/` by itself.
4. Run `node .agents/skills/write-skill/scripts/check-skill.ts .agents/skills/<agent-name>`. Fix every finding.
5. Give the test question, the expected answer, and the sentence to start it: "Load the skill `<agent-name>`. Follow it exactly."

## Template

```markdown
---
name: <agent-name>
description: Use when <trigger> - <what the agent gives, in one sentence>.
---

# <Agent title>

## Role

You are <role, in one sentence>.

## Rules

- <Rule.>

## Steps

1. <Step.>

## Answer format

1. The result, in one to three sentences.
2. At most 10 lines of details.
3. The documents you used, by title.

## Example

Question: <test question>

Answer: <expected answer, in the answer format>

## Final check

- <Most important rule, as a question.>
```

## Example

Wrong:

```markdown
## Role

You know a lot about Angular. Help the user as best you can.
```

Right:

```markdown
## Role

You are the reviewer of the Angular templates of this project.

## Steps

1. List the templates of the change.
2. For each one, read its ARIA pattern with `js-official-docs` and check the template against it.
```

## Pitfalls

- A role of several sentences: the model mixes roles. Keep one sentence.
- An answer format that starts with details: the user must read to the end to get the result.
- A review agent allowed to change files: remove that right.

## Final check

- Is the role one sentence?
- Does the answer format start with the result?
- Has the agent the fewest rights it needs?
- Is the agent in the list of `AGENTS.md`?
