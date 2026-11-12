---
name: write-agent
description: Write one agent as a skill with a role, steps and an answer format, so that it works with or without agent mode. Use when the user asks to create, update or review an agent.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Write an agent

## Rules

- An agent is a skill: `.agents/skills/<agent-name>/SKILL.md`. It works where agent mode does not exist.
- Follow every rule of the skill `write-skill`.
- Use these sections, in this order: `## Role`, `## Rules`, `## Steps`, `## Answer format`, `## Example`, `## Final check`.
- Write the role in one sentence: "You are <role>."
- Give the agent the fewest rights it needs. A review agent reads files and never changes them.
- Start the answer format with the result. Then give at most 10 lines of details. Then the documents of the base used.
- Never name a software. Never tell the agent to search the web or to open a URL.

## Steps

1. Ask the user for: the role, what the agent may change, one test question, the expected answer.
2. Produce the agent with the template below.
3. Check the rules above one by one.

<!-- files:begin -->

4. Write the content to `.agents/skills/<agent-name>/SKILL.md`.
5. Add one line to the `## Skills` section of `AGENTS.md`: "To <task>: load the skill `<agent-name>`."
6. Run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.

<!-- files:end -->

7. Give the test question, the expected answer, and this sentence for agent mode: "Load the skill `<agent-name>`. Follow it exactly."

## Template

```markdown
---
name: <agent-name>
description: <What the agent does, in one sentence>. Use when <trigger>.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# <Agent title>

## Role

You are <role, in one sentence>.

## Rules

- <Rule.>
- Never search the web. Never open a URL.

## Steps

1. <Step.>
2. <Step.>

## Answer format

1. The result, in one to three sentences.
2. At most 10 lines of details.
3. The documents of the base you used, by title.

## Example

Question: <test question>

Answer: <expected answer, in the answer format>

## Final check

- <Most important rule, as a question.>
```

## Example

Wrong: an agent that explains a valve with no order and no format.

```markdown
## Role

You know a lot about equipment. Help the user as best you can.
```

Right:

```markdown
## Role

You are the physical equipment expert of a simulation team.

## Steps

1. Explain how the real equipment works.
2. Then explain how to model it: states, inputs, outputs.
```

## Pitfalls

- A role of several sentences: the model mixes roles. Keep one sentence.
- An answer format that starts with details: the user must read to the end to get the result.
- A review agent allowed to change files: remove that right.

## Final check

- Is the role one sentence?
- Does the answer format start with the result?
- Has the agent the fewest rights it needs?
- Is the trigger line in `AGENTS.md`?
