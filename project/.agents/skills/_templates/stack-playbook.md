# Family template: stack playbook

For skills in mode D about a language, a framework or a toolchain (catalogue IDs STK-*, and seeds that name this template). The local author copies this layout into `SKILL.md`, then fills every section from the installed tools and the documentation servers. Every command is run before it is written.

```markdown
---
name: <from SEED.md, unchanged>
description: "<from SEED.md, unchanged>"
metadata:
  id: <from SEED.md>
  stars: "<from SEED.md>"
  nature: reference
  mode: D
  wave: <from SEED.md>
  load: <from SEED.md>
---

# <Stack name>

**Core rule:** <the one thing the agent must not get wrong with this stack here>

## When to use
- Use when: ...
- Do not use when: ... (use `<other-skill>` instead)

## Verified toolchain
| Tool | Version installed | Command that printed it |
|---|---|---|

## Commands
| Task | Command | Expected result |
|---|---|---|
| Build | | |
| Test (all) | | |
| Test (one file or one test) | | |
| Lint | | |
| Format | | |

## Dependencies through the mirror
1. <install or restore command>
   - Check: <how to see the mirror was used>

## Debugging
- <debugger command, how to set a breakpoint, how to read the stack>

## Error -> fix
| Error text | Cause | Fix |
|---|---|---|

## Pitfalls
- <only pitfalls confirmed by experiment or documentation>

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

- Document only the versions installed here; write the detected version in the table.
- Each command of the Commands table ran successfully here; paste its expected result.
- Keep a pitfall only if an experiment or a documentation page confirms it; drop the others and list them in your report.
- At most 500 lines; long tables go to `references/`.
