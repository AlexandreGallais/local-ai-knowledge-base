---
name: ask-when-underspecified
description: "Turns a vague request into closed questions with options before acting, and records the assumption when no answer comes. Use when the request lacks a target, a scope, an input, an expected output or a success criterion, when two readings are possible, or when the user says 'something like', 'etc.' or 'you decide'."
license: MIT
metadata:
  id: MET-07
  stars: "4"
  nature: process
  mode: R
  wave: V1
  load: auto
---

# Ask when underspecified

**Core rule:** when a request can be read two ways, ask closed questions with options before changing anything.

## When to use

- Use when: the target file, behaviour, scope, input, output or success check is missing; two readings lead to different code.
- Do not use when: the code, `AGENTS.md` or the docs answer the question. Look first, then ask only what remains.

## Procedure

1. List what is missing: target, scope, inputs, expected output, success check, constraints.
   - Check: each missing item is written as one line.
2. Look up each item in the project first (`grep`, `README.md`, `AGENTS.md`, existing similar code).
   - Check: the items the project answers are removed from the list.
3. Ask the rest with the `question` tool: at most 4 questions, each with 2 to 4 options, your recommended option first.
   - Check: every question can be answered by picking an option.
4. With an answer, restate the request in one paragraph and proceed.
   - Check: the restatement names the target, the output and the success check.
5. Without an answer, choose the recommended options, write them as "Assumptions" at the top of your reply and of `PLAN.md` if any.
   - Check: each assumption is visible to the user.

## Example

Bad: "Add export" -> the agent writes a PDF exporter.

Good: one question "Export to which format? CSV (recommended, matches the existing import) / JSON / PDF" and one "Which data? Current table view (recommended) / Whole dataset".

## Stop and ask the human if

- The missing item is a business rule, a data choice or a wording choice: those are the user's, never guessed.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will ask an open question." | Open questions get vague answers. Give options. |
| "Asking looks weak." | A wrong guess costs a full rework. |
| "I will ask ten questions." | Ask the 4 that change the result; look up the rest. |

## Definition of done

- [ ] Every ambiguity either answered by the user, found in the project, or written as an explicit assumption.
- [ ] No business rule guessed.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
