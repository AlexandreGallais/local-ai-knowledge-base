---
name: write-base-document
description: Use when the user asks to add or update a document of the knowledge base, in the repository of the base - one reference document in docs/<topic>/, from source texts the user gives, with its index line.
---

# Write a document of the base

The global base is read-only in a project. Write its documents only in the repository of the base,
where `scripts/check-base.ts` exists.

## Rules

- Use only the source texts the user gives you, pasted in the chat or given as files.
- Never add a fact from memory. If a fact is not in a source, leave it out.
- Write in English. Use one term for one idea.
- One document answers one question.
- Keep only what the model would get wrong: rules, options and defaults at the given version, pitfalls,
  exact error messages, one wrong and one right example per rule.
- Drop tutorials, history, marketing text and general overviews.
- Never copy text, tables or symbols from an ISO or IEC standard, nor text under CC BY-SA. Describe them in your own words and cite them.
- Never write internal names, quotas, network details or real project data.
- Links are only citations: never open one.

## Steps

1. Ask the user for the tool version if the sources do not give it. Do not guess it.
2. Number the sources S1, S2, S3. Note for each: publisher, title, version, link, date read, license.
3. Read `global/docs/<topic>/index.md`. Check that no document already answers the question.
4. Read one document of the same topic: copy the form of its header.
5. Write the header: `id` (the file name), `title`, `topic` (the folder), `summary`, `tool`, `version`,
   `checked` (today), `sources`, `license`.
6. Write the sections. Each H2 section is readable alone and names its subject; never "as said above".
7. Keep the document under 3,000 words. Split a longer one into two documents.
8. Cite with `[S1]` after the sentence. List every source in `## Sources` at the end.
9. Add the index line to `global/docs/<topic>/index.md`: the title in square brackets, the file name in
   parentheses, a colon, then the summary.
10. Run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.
11. Give the facts that had no source, and three test questions the document must answer.

## Example

Wrong: an index line that differs from the summary and has no version.

```markdown
summary: Rules for strictNullChecks. TS 6.0.
- [Null checks](strict-null-checks.md): Everything about null.
```

Right:

```markdown
summary: Rules for strictNullChecks. TS 6.0.
- [Strict null checks](strict-null-checks.md): Rules for strictNullChecks. TS 6.0.
```

## Pitfalls

- A fact from memory with no source: the model repeats an old API. Leave it out.
- A section that needs the section above to make sense: rewrite it so that it stands alone.
- A document with no version in its header: nobody knows when to update it.

## Final check

- Has every fact a source number?
- Is every header field filled, `version` and `checked` included?
- Does the index line repeat the `summary`?
- Does `node scripts/check-base.ts` end with 0 findings?
