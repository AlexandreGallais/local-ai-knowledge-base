# BRIEF: math-mcp-usage  (SCI-05, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: math-mcp-usage
description: "Decides when to delegate a calculation to the maths documentation and tools instead of computing in your head, and how to check the result. Use when a task needs a formula, a numerical value, a unit conversion, linear algebra, statistics or a proof, or when you are about to write a number you did not compute with a tool."
metadata:
  id: SCI-05
  stars: "3"
  nature: reference
  mode: C
  wave: V2
  load: auto
```

## Goal

A reference that makes the agent look up formulas in math-docs and compute numbers with a tool (Python, Octave) rather than in its head, and check results by an independent way.

## Questions the skill must answer

1. What does math-docs hold (books, topics) and how to query it well?
2. Which calculation tools are installed (python3 with numpy, octave, bc)?
3. Which kinds of calculation must always go through a tool?
4. How to check a result (second method, known case, dimensional analysis)?
5. How to cite the formula's source in the report?

## Where to look (files, commands, people)

- the README.md and library/sources.json of the math-docs brick, in the folder .agents/mcp
- command -v python3 octave bc and the installed Python packages
- live calls of math-docs_search_docs

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "what is the rotation matrix for 30 degrees?", "compute the standard deviation of these values", "convert 3 bar to psi"; does not load on "rename the module", "write a commit message", "fix the lint error".
- Paired task: compute a value with a known closed form; with the skill the agent uses a tool and cites the formula, and the value matches the reference.

## Human input required (yes/no, what)

No.
