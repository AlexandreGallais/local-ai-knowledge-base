---
name: glossary-building
description: "Manual: run only when the user explicitly asks for /glossary-building. Builds a glossary of business terms in CONTEXT.md so code, tests and conversations use the same words with the same meaning."
license: MIT
metadata:
  id: EXP-09
  stars: "2"
  nature: template
  mode: R
  wave: V4
  load: manual
---

# Glossary building

**Core rule:** one term, one definition approved by the human, and the same spelling in code, tests and docs.

## Procedure

1. Collect candidate terms from the code (types, tables, endpoints) and the conversation.
   - Check: each term has where it appears.
2. Ask the human to define each term in one sentence; record synonyms to avoid.
   - Check: each definition is approved.
3. Write `CONTEXT.md` with the template, sorted alphabetically.
   - Check: every term has a definition and its code name.
4. List code names that differ from the glossary, as rename candidates for later (`scope-discipline`).
   - Check: the list is in the report, not applied.

## Template

```markdown
# Glossary
| Term | Definition | Code name | Avoid |
|---|---|---|---|
| Tank level | Height of liquid in a tank, in metres | `tankLevelM` | fill, height |
```

## Stop and ask the human if

- At step 2: definitions belong to the business.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I can define the terms from the code." | The code may use them wrongly. Ask. |
| "Rename the code now." | Renames are separate, approved changes. |

## Definition of done

- [ ] CONTEXT.md with approved definitions, code names and words to avoid.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
