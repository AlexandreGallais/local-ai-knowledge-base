---
name: user-documentation
description: "Manual: run only when the user explicitly asks for /user-documentation. Writes user guides following Diataxis - tutorial, how-to guide, reference, explanation - each page of one kind only."
metadata:
  id: WRT-07
  stars: "2"
  nature: template
  mode: A
  wave: V3
  load: manual
---

# User documentation

**Core rule:** each page is one Diataxis kind with one purpose; steps and screens in it were checked against the running software.

## Procedure

1. Identify the reader's need and pick the kind from the table.
   - Check: one kind per page.
2. Write with the kind's shape (table); keep the vocabulary of the user interface exactly.
   - Check: labels in the text match the screens.
3. Check every step on the running software.
   - Check: each step works as written.
4. Link pages to each other instead of mixing kinds.
   - Check: relative links exist.

| Kind | Reader's need | Shape |
| --- | --- | --- |
| Tutorial | learn by doing, first time | one guided path, no options, a visible result |
| How-to guide | solve one task | goal, numbered steps, result |
| Reference | look up facts | tables and lists, complete and dry |
| Explanation | understand why | prose about concepts and choices |

## Stop and ask the human if

- The software behaviour differs from what the documentation should say.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One page for everything." | Mixed pages serve no reader well. Split by kind. |
| "Describe the screens from memory." | Check each step on the software. |

## Definition of done

- [ ] Pages of one kind each; steps checked; links between pages.
