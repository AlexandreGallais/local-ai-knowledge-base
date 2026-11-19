---
name: <kebab-case, equal to the folder name>
description: "<What it does, third person>. Use when <trigger 1>, <trigger 2>, or when you see <error text, file name or command>."
metadata:
  id: <catalogue ID, or PRJ-<n> for a project skill>
  stars: "<1 to 5>"
  nature: <guardrail | process | reference | tooling | template>
  mode: <R | A | B | C | D | R+B | R+C | R+D>
  wave: <V0 to V4>
  load: <always | auto | manual | auto+manual>
---

# <Title>

**Core rule:** <the one thing the agent must not get wrong>

## When to use

- Use when: <situation>
- Do not use when: <situation> (use `<other-skill>` instead)

## Procedure

1. <Action>
   - Check: <observable result: command output, exit code, file content>
2. <Action>
   - Check: <observable result>

## Stop and ask the human if

- <condition>

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The test probably passes now." | Run it. No output, no claim. |

## Definition of done

- [ ] <criterion, including the core rule again>

## References

- `references/<file>.md`: read when <situation>.
- MCP `<server>`: example queries: "<query>", "<query>".
