---
name: api-existence-check
description: "Verifies that a function, method, option, flag, config key or CLI command exists at the installed version before writing it. Use when about to call an API you have not seen in this project, add a command-line flag, a config key or an annotation, or when you see 'is not a function', 'unknown option', 'has no exported member' or 'unrecognized arguments'."
metadata:
  id: DOC-03
  stars: "5"
  nature: guardrail
  mode: A
  wave: V1
  load: auto
---

# API existence check

**Core rule:** write no API, option or flag before one source proves it exists at the installed version.

## Sources, cheapest first

| Source | Command or tool |
| --- | --- |
| Existing use in the project | `grep -rn "<name>" src/` |
| Documentation server | `<brick>_search_docs` with the exact name, then `<brick>_read_doc` on one section |
| CLI help | `<tool> --help`, `<tool> <subcommand> --help`, `man <tool>` |
| Installed source or types | `grep -rn "<name>" node_modules/<pkg>/` (`.d.ts`), Python `help(module.name)`, `~/.cargo/registry/src` |
| Type checker or compiler | `npx tsc --noEmit`, `mypy`, `cargo check`, `dotnet build` |

## Procedure

1. Read the installed version of the package or tool (`version-pinned-docs`).
   - Check: you can write the version number.
2. Prove the name exists with one source of the table.
   - Check: you can quote the line that shows it (signature, help line, doc heading).
3. Use it exactly as shown: same name, argument order, types.
   - Check: the type checker or the command accepts it.

## Stop and ask the human if

- No source shows the API: do not invent it; propose an alternative that exists, or ask.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "This flag exists in another tool." | Flags differ between tools and versions. Check this one. |
| "The newer version has it." | Only the installed version counts. |

## Definition of done

- [ ] Each new API, option or flag has a quoted source at the installed version.
- [ ] The type checker or the command ran without an unknown-name error.
