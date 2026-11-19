# BRIEF: project-scaffolding  (DEV-15, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: project-scaffolding
description: "Manual: run only when the user explicitly asks for /project-scaffolding. Creates a new project or module from the team's internal template - structure, CI, lint, tests, dev container."
metadata:
  id: DEV-15
  stars: "3"
  nature: template
  mode: C
  wave: V2
  load: manual
```

## Goal

A manual template skill that creates a new project or module exactly like the team's template, so every new repository starts with the same CI, lint, tests and dev container.

## Questions the skill must answer

1. Where is the team's template (a template repository, a cookiecutter, a folder)?
2. Which variables does it need (name, language, owner, licence)?
3. Which files must exist after scaffolding (CI, editorconfig, lint config, devcontainer, README, tests)?
4. Which commands prove the new project works (install, test, lint, build)?
5. What is never copied (secrets, example data)?

## Where to look (files, commands, people)

- the team's template repository or folder
- an existing recent project of the team for comparison
- the human: the template's location and variables

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "/project-scaffolding for a new Python service", "/project-scaffolding module reporting", "create the project with /project-scaffolding"; does not load on "add a file to this project", "fix the CI", "write a test".
- Paired task: scaffold a module; with the skill, install, test, lint and build commands pass at once in the new project.

## Human input required (yes/no, what)

Yes: the template's location, its variables and the approval rule for new repositories.
