---
name: unknown-error-research
description: "Researches an unknown error message without a search engine - in the source of the libraries, the documentation servers, the Git history and the project's issues. Use when an error message is new to you, when its meaning is unclear, or when the first fix based on the message did not work."
metadata:
  id: DOC-08
  stars: "4"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Unknown error research

**Core rule:** find the line of code that raises the error before guessing what it means.

## Procedure

1. Copy the most specific fixed part of the message (no IDs, paths or numbers).
   - Check: the fragment is 3 to 8 words long and literal.
2. Search it in the project and the installed dependencies: `grep -rn -F "<fragment>" src node_modules/<suspect-pkg> 2>/dev/null | head`.
   - Check: you find the file and line that raise it, or none.
3. Read the code around that line: the condition that triggers the error.
   - Check: you can state the condition in one sentence.
4. Search the documentation server with the error code or the fragment (`<brick>_search_docs`).
   - Check: a section explains it, or none.
5. Search the history: `git log -S "<fragment>" --oneline` and the project's issues (`glab issue list --search "<fragment>"`).
   - Check: earlier occurrences and fixes are listed, or none.
6. Form one hypothesis from the condition and test it (`systematic-debugging`).
   - Check: the hypothesis is confirmed or rejected by a run.

## Stop and ask the human if

- The error comes from a closed binary or a remote service and none of the sources explain it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I recall this error from somewhere else." | Same text, different library, different cause. Find the raising line. |
| "Search the full message with the path in it." | Paths and IDs differ every time; search the fixed part. |

## Definition of done

- [ ] The raising condition is found and stated, or the absence of sources is reported.
- [ ] The fix follows a tested hypothesis.
