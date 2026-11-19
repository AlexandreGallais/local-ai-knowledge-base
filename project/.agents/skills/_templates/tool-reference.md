# Family template: tool reference

For skills in mode D about one tool or one cross-language technique (debuggers, test frameworks, profilers, packaging, codemods...). The local author copies this layout into `SKILL.md`, then fills every section from the installed tools and the documentation servers. Every command is run before it is written.

```markdown
---
name: <from SEED.md, unchanged>
description: "<from SEED.md, unchanged>"
metadata:
  id: <from SEED.md>
  stars: "<from SEED.md>"
  nature: <from SEED.md>
  mode: D
  wave: <from SEED.md>
  load: <from SEED.md>
---

# <Tool or technique>

**Core rule:** <the one thing the agent must not get wrong>

## Purpose
<one or two sentences>

## When to use
- Use when: ...
- Do not use when: ... (use `<other-skill>` instead)

## Procedure
1. <Action>
   - Check: <observable result>

## Core commands
| Need | Command (per language when relevant) | Expected result |
|---|---|---|

## Recipes
- <recipe>: `<command>` -> <result>

## Error -> fix
| Error text | Cause | Fix |
|---|---|---|

## Stop and ask the human if
- ...

## Common mistakes
| If you think... | Reality |
|---|---|

## Definition of done
- [ ] ...

## References
- `references/doc-pages.md`: the documentation pages used, with server and section.
- MCP `<server>`: example queries: "<query>", "<query>".
```

## Rules for the local author

- Detect the installed versions first; document only those.
- Every command in the tables ran successfully here.
- Confirm or drop each pitfall of `SEED.md`; report the dropped ones.
- At most 500 lines; per-language detail goes to `references/<language>.md`.
