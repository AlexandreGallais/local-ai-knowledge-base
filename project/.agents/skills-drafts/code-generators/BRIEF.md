# BRIEF: code-generators  (TOL-07, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: code-generators
description: "Manual: run only when the user explicitly asks for /code-generators. Creates or uses generators and templates (Plop, Cookiecutter, framework schematics) for recurring structures of this team."
metadata:
  id: TOL-07
  stars: "2"
  nature: template
  mode: C
  wave: V3
  load: manual
```

## Goal

A manual skill that uses the team's generators for recurring structures (new module, new endpoint, new component) or creates one when the same structure is written by hand repeatedly.

## Questions the skill must answer

1. Which generators does the team already use (framework CLIs, Plop, Cookiecutter, scripts)?
2. Which recurring structures deserve a generator?
3. Where are templates stored and how are they tested?
4. Which tools are installed and allowed offline?

## Where to look (files, commands, people)

- package.json scripts, plopfile, cookiecutter templates, framework CLIs
- the human: the recurring structures and the approved tools

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "/code-generators for a new endpoint", "/code-generators module", "create a generator with /code-generators"; does not load on "write this one component", "run the tests", "explain templates".
- Paired task: generate a module with the team's generator; the generated code builds and passes the lint at once.

## Human input required (yes/no, what)

Yes: the recurring structures and the approved generator tools.
