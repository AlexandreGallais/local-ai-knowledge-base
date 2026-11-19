# BRIEF: repo-conventions  (DEV-04, 5 stars, V1)

## Final frontmatter (do not change)

```yaml
name: repo-conventions
description: "States the conventions of this repository - lint, formatter, editorconfig, naming, folder layout, imports - read from its config files. Use when writing or changing code, creating a file or a folder, naming a function, class, file or test, or when a lint or format check fails."
metadata:
  id: DEV-04
  stars: "5"
  nature: reference
  mode: C
  wave: V1
  load: always
```

## Goal

A short reference, written for this repository, that tells the agent how code is written here so its first draft already passes lint and review. Every convention comes from a config file or from the human, never from general taste.

## Questions the skill must answer

1. Indentation, line length, quotes, semicolons, end of line (from `.editorconfig` and formatter config)?
2. Which linters and formatters run, with which command, and which rules are strict?
3. Naming: files, folders, classes, functions, constants, tests?
4. Folder layout: where code, tests, fixtures, scripts and docs go?
5. Import order and path aliases?
6. Conventions the configs do not show (ask the human): error handling, logging, comments, public API rules.

## Where to look (files, commands, people)

- `.editorconfig`, `.prettierrc*`, `eslint.config.*`, `.stylelintrc*`, `pyproject.toml` (ruff, black), `rustfmt.toml`, `.clang-format`, `.clang-tidy`, `Directory.Build.props`, `checkstyle.xml`
- `CONTRIBUTING.md`, `docs/`
- `git log` of the last 30 commits for naming and commit style
- The human: the unwritten conventions.

## Required sections

- Core rule in the first 10 lines; a table "topic, rule, source file"; commands to check; stop conditions; common mistakes; definition of done. At most 150 lines.

## Acceptance tests

- Trigger: loads on "add a service for invoices", "create a new component", "the lint fails"; does not load on "explain git rebase", "what is the weather", "write a commit message".
- Paired task: add a new module; with the skill, the lint and format checks pass at the first run.

## Human input required (yes/no, what)

Yes: confirmation of each convention found and the conventions that no file shows.
