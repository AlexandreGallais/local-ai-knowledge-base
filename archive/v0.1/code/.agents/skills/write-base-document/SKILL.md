---
name: write-base-document
description: Write one reference document of the base from source texts the user provides, with its index line, and update the French summary of its topic. Use when the user asks to add or update a document of the base.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Write a document of the base

## Rules

- Use only the source texts the user gives you, pasted in the chat or given as files.
- Never search the web. Never open a URL. Links are only citations.
- Never add a fact from memory. If a fact is not in a source, leave it out.
- Write in English. Use one term for one idea.
- One document answers one question.
- Keep only what the model would get wrong: rules, options and defaults at the given version, pitfalls, exact error messages, one wrong and one right example per rule.
- Drop tutorials, history, marketing text and general overviews.
- Never copy text, tables or symbols from an ISO or IEC standard. Never copy text under CC BY-SA. Describe them in your own words and cite them.
- Never write internal names, quotas, network details or real project data.

## Steps

1. Ask the user for the tool version if the sources do not give it. Do not guess it.
2. Number the sources S1, S2, S3. Note for each: publisher, title, version, link, date read, license.
3. For each fact you keep, note the source number and the sentence that supports it.

<!-- files:begin -->

4. Read `AGENTS.md`, section `## Index`, then the index of the topic, `docs/<topic>/index.md`. Check that no document already answers the question.
5. Read `docs/template.md`.

<!-- files:end -->

6. Produce the document with the template: the header with every field, then the sections.
7. Make each H2 section readable alone. Put the topic in each H2 heading. Never write "as mentioned above".
8. Keep each H2 section under 800 words and the document under 3,000 words. Split a longer one into two documents.
9. Cite with `[S1]` after the sentence. List all sources in `## Sources` at the end.
10. Produce the `summary` field: one sentence, 20 words at most, with the tool version.
11. Produce the index line: `- [<Title>](docs/<topic>/<file>.md): <summary>`. It repeats the `summary` word for word.

<!-- files:begin -->

12. Write the document to `docs/<topic>/<file>.md`.
13. Add the index line to `docs/<topic>/index.md`. For a new topic, create this file and add one line for the topic to the `## Index` section of `AGENTS.md`: `- [<topic>](docs/<topic>/index.md): <what the topic covers>`.
14. Open `docs/<topic>/README.fr.md`, or create it. Add one line in French for the document. Reread the French line and fix its spelling.
15. Add each adapted source to `THIRD_PARTY_NOTICES.md` if the repository has one.
16. Run `node scripts/check-base.ts`. Fix every finding. Repeat until zero findings.

<!-- files:end -->

17. Give the facts that had no source, and three test questions the document must answer.

## Example

Wrong: an index line that differs from the summary and has no version.

```markdown
summary: Rules for strictNullChecks. TS 5.9.
- [Null checks](docs/typescript/strict-null-checks.md): Everything about null.
```

Right:

```markdown
summary: Rules for strictNullChecks. TS 5.9.
- [Strict null checks](docs/typescript/strict-null-checks.md): Rules for strictNullChecks. TS 5.9.
```

## Pitfalls

- A fact from memory with no source: the model repeats an old API. Leave it out.
- A section that needs the section above to make sense: rewrite it so that it stands alone.
- A document with no version in its header: nobody knows when to update it.

## Final check

- Has every fact a source number?
- Does no sentence ask to search the web or to open a URL?
- Is every header field filled, `version` and `checked` included?
- Does the index line repeat the `summary` word for word?
