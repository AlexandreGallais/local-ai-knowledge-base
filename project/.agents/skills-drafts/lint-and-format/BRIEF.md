# BRIEF: lint-and-format  (TST-06, 4 stars, V1)

## Final frontmatter (do not change)

```yaml
name: lint-and-format
description: "Runs the project's formatters and linters and fixes their findings before each commit. Use when you changed code, before committing or opening a merge request, when CI fails on a lint or format job, or when you see an ESLint, Prettier, ruff, clippy, clang-tidy, dotnet format or Checkstyle message."
metadata:
  id: TST-06
  stars: "4"
  nature: process
  mode: C
  wave: V1
  load: auto
```

## Goal

A process skill that gives the exact format and lint commands of this project, in order (format first, then lint), how to fix findings without disabling rules, and how to run them on changed files only.

## Questions the skill must answer

1. Which formatters and linters does the project use, per language, and with which commands (scripts of `package.json`, `Makefile`, CI jobs)?
2. Which commands fix automatically, and which only report?
3. How to run them on changed files only (fast) and on everything (as CI does)?
4. Which rules are often hit and how to fix them properly?
5. Is disabling a rule ever allowed, and how is it marked?

## Where to look (files, commands, people)

- `package.json` scripts, `Makefile`, `justfile`, `.gitlab-ci.yml` lint jobs, `.pre-commit-config.yaml`
- Config files listed in the draft `repo-conventions`
- The human: the policy on disabling rules.

## Required sections

- Core rule in the first 10 lines (format, then lint, then fix; never disable a rule without a yes); procedure with commands per language; stop conditions; common mistakes; definition of done.

## Acceptance tests

- Trigger: loads on "the lint job fails", "fix the ESLint errors", "format the code before commit"; does not load on "explain this algorithm", "create a branch", "read the logs".
- Paired task: change a file with five lint errors; with the skill the agent fixes them all without a disable comment, and the lint command exits 0.

## Human input required (yes/no, what)

Yes: the policy on disabling or relaxing a rule.
