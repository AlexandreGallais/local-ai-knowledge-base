---
name: requirements-analysis
description: "Turns a vague request into user stories with testable acceptance criteria. Use when a request describes a need rather than a change, when stakeholders' wishes must become work items, or when acceptance criteria are missing or not testable."
metadata:
  id: PLN-05
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Requirements analysis

**Core rule:** every requirement ends as a story with criteria a test can check; anything not testable is reworded or asked.

## Procedure

1. Extract the actors, their goals and the constraints from the request.
   - Check: each goal belongs to an actor.
2. Write one story per goal: `As a <actor>, I want <capability>, so that <benefit>`.
   - Check: each story is small enough for one merge request.
3. Write acceptance criteria per story in Given, When, Then form.
   - Check: each criterion names an input and an observable result.
4. List non-functional needs (performance, security, accessibility) with numbers.
   - Check: no "fast" or "secure" without a measure.
5. List questions and assumptions; ask the human (`ask-when-underspecified`).
   - Check: answered or written as assumptions.

## Example

Bad: "The export should be fast."

Good: "Given 10,000 rows, when the user clicks Export CSV, then the file is downloaded within 5 seconds."

## Stop and ask the human if

- Business rules, priorities or wording are not given.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The criteria are obvious." | Unwritten criteria are argued about at review time. |
| "One big story." | Split until each fits one merge request. |

## Definition of done

- [ ] Stories with testable criteria; non-functional needs measured; questions answered or recorded.
