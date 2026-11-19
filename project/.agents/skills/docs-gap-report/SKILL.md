---
name: docs-gap-report
description: "Writes a short report when the local documentation servers lack a library, a version or a topic, so the documentation base can be completed. Use when a search on the documentation servers returns nothing useful, when the documented version differs from the installed one, or when you had to answer without a documentation source."
metadata:
  id: DOC-10
  stars: "2"
  nature: template
  mode: A
  wave: V3
  load: auto
---

# Docs gap report

**Core rule:** every missing or outdated documentation is recorded once, with the library, the installed version and the need, in `docs/doc-gaps.md`.

## Procedure

1. Confirm the gap: two searches on the right server with different words (`docs-first-lookup`).
   - Check: both returned nothing relevant, or a different version.
2. Check `docs/doc-gaps.md` for an existing entry.
   - Check: no duplicate.
3. Add an entry with the template.
   - Check: library, versions and need are filled.
4. In your report to the user, say the answer was not backed by the documentation.
   - Check: the claim is labelled assumed (`uncertainty-labeling`).

## Entry template

```markdown
## <library or tool> - <YYYY-MM-DD>
- Installed version: <version> (from <command or lockfile>)
- Documentation server searched: <server>, queries: "<q1>", "<q2>"
- Found: nothing | version <x> only
- Need: <what was needed, one line>
- Free documentation source known: <name and licence, or unknown>
```

## Stop and ask the human if

- The missing documentation blocks the task and no installed source can replace it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will just remember the gap." | It is lost. Write the entry. |
| "Add a public URL for the doc." | Name the source; the documentation team checks it. |

## Definition of done

- [ ] Gap confirmed by two searches and recorded once with versions and need.
