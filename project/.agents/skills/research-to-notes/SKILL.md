---
name: research-to-notes
description: "Manual: run only when the user explicitly asks for /research-to-notes. Investigates a question from primary sources (documentation servers, installed code, history) and saves sourced conclusions in a Markdown note of the repository."
license: MIT
metadata:
  id: DOC-09
  stars: "3"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Research to notes

**Core rule:** every conclusion in the note points to the primary source that supports it (doc section, file and line, command output); what has no source is marked as unknown.

## Procedure

1. Write the question and what the answer will decide.
   - Check: one or two sentences at the top of the note.
2. Search the primary sources: documentation servers (`<brick>_search_docs`), installed code (`dependency-source-reading`), the repository's code and history.
   - Check: each source used is noted with its location.
3. Read only the relevant sections; quote short passages.
   - Check: each quote has its source.
4. Write `docs/notes/<YYYY-MM-DD>-<topic>.md`: answer first, then findings with sources, then unknowns.
   - Check: every claim has a source or is listed as unknown.
5. Tell the user the answer in a few lines and the note's path.
   - Check: the reply names the file.

## Note template

```markdown
# <Question>
## Answer
<short answer, with confidence: verified, partly verified, unknown>
## Findings
- <claim> (source: <server and section, or file:line, or command>)
## Unknown
- <what could not be established>
```

## Stop and ask the human if

- The question needs sources that no server or file holds.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I know the answer." | Memory is not a source. Find one or mark it unknown. |
| "Copy whole pages into the note." | Quote short passages; point to the rest. |

## Definition of done

- [ ] Note written with answer, sourced findings and unknowns.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
