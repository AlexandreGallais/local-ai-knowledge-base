---
name: write-brief
description: Use when you turn a request of the user into .agents/work/<subject>/brief.md - the form of the brief, its questions, and its summary for the sub-agents.
---

# Write the brief of a request

The brief says more than the request: the goal, the facts found in the code and the docs, the
requirements, what stays out, the assumptions and the questions. Every task of the subject starts from it.

## Steps

1. Read the request twice. Choose the subject: 2 to 4 lower-case words joined by hyphens.
2. Call `project_info`: profile, versions, check commands.
3. Find the facts the request needs with the `code` and `docs` tools, one function or one section at a time.
4. Write `.agents/work/<subject>/brief.md` in the form below. Copy the request word for word.
5. Check each path, API name and version you wrote. Remove what you cannot check.
6. A fact the code or the docs can give: search again. A choice only the user can make: a question.
7. Write 1 to 5 questions, 2 to 4 options each, the recommended option first. Nothing open: ask
   "Start with this brief?" with "Start" and "Change".
8. Second pass, after the answers: change the requirements, mark each assumption `[CONFIRMED]` or
   `[OPEN]`, write the summary for sub-agents, then call `work_check_brief` and fix every finding.

## Form

```md
# Brief: <subject>

## Request
<The request, word for word.>

## Goal
<1 to 3 sentences: what exists at the end, for whom.>

## Facts found
- <Fact.> (`<path>` or `<doc section>`)

## Requirements
- R1: <What the code must do. How to check it.>

## Out of scope
- <What this work must not touch.>

## Assumptions
- A1 [OPEN]: <Assumption.>

## Questions
- Q1: <Question.>
  - a) <Option, recommended.>
  - b) <Option.>

## Answers

## Acceptance
- `<command>` ends with 0 errors.

## Summary for sub-agents
<12 lines at most: goal, constraints, decisions, names every task must know.>
```

## Rules

- Write each requirement so that a command or an observation checks it.
- Never ask what the code or the docs can answer.
- Write only the facts this request needs, never the whole repository.
- Keep the brief under 150 lines, in English.

## Example

Wrong: `## Goal` "Make the user list better." Right: `## Goal` "The page /users lists every user of
UserApi.getUsers(), sorted by name, for the operators."

## Final check

- Is the request copied word for word?
- Does each requirement say how it is checked?
- Is every assumption marked `[OPEN]` or `[CONFIRMED]`?
- Does `work_check_brief` say "brief.md is well formed."?
