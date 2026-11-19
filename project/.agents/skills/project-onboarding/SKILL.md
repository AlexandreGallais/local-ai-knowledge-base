---
name: project-onboarding
description: "Surveys an unknown repository - README, AGENTS.md, tree, scripts, CI, stack, conventions - and writes a short fact sheet. Use when starting work in a repository for the first time in a session, when the user asks how the project works, or before a change in an area you have not read."
metadata:
  id: EXP-01
  stars: "5"
  nature: process
  mode: A
  wave: V1
  load: auto
---

# Project onboarding

**Core rule:** learn the project from its files and commands, cheaply, before changing anything; every fact on the sheet points to the file or command that shows it.

## Procedure

1. Read `AGENTS.md` and the first 80 lines of `README.md`.
   - Check: you can name the project's purpose and its documented commands.
2. Map the top of the tree: `ls -a`, then `find . -maxdepth 2 -type d -not -path '*/.git*' -not -path '*/node_modules*' | head -n 60`.
   - Check: you can name the source, test and config folders.
3. Find the stack and versions from manifests: `package.json`, `pyproject.toml`, `Cargo.toml`, `pom.xml`, `build.gradle*`, `*.csproj`, `CMakeLists.txt`, `go.mod`.
   - Check: each language has its version and its package manager.
4. Find the commands: scripts of `package.json`, `Makefile`, `justfile`, `tox.ini`, `noxfile.py`, CI jobs in `.gitlab-ci.yml`.
   - Check: you have the build, test and lint commands.
5. Find the conventions: `.editorconfig`, lint and formatter configs, `CONTRIBUTING.md`, commit style in `git log --oneline -15`.
   - Check: you can state indentation, naming and commit style.
6. Run the test command once, if it is fast and safe.
   - Check: you know the baseline (green, or which tests already fail).
7. Write the fact sheet in your reply (template below); offer to add the missing commands to `AGENTS.md`.
   - Check: every line cites its file or command.

## Fact sheet template

```markdown
- Purpose: <one line> (README.md)
- Stack: <language version, framework version> (<manifest>)
- Build / test / lint: `<cmd>` / `<cmd>` / `<cmd>` (<file>)
- Layout: src=<dir>, tests=<dir>, config=<dir>
- Conventions: <indent, naming, commit style> (<file>)
- CI: <stages> (.gitlab-ci.yml)
- Baseline: <tests green / N failing>
```

## Stop and ask the human if

- The test command needs services, credentials or data you do not have.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will read every file." | Read manifests and configs; search the rest on demand (`context-budget`). |
| "The README is right." | Check commands by running them; READMEs go stale. |

## Definition of done

- [ ] Fact sheet written, each line with its source.
- [ ] Baseline of the test suite known.
