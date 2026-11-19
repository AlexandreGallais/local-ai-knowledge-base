---
name: readme-writing
description: "Writes a useful README - what it is, install, usage, development, troubleshooting - with commands that were run. Use when a README is missing, outdated or empty, when the user asks to document how to install or use a project, or after adding a command people need to know."
metadata:
  id: WRT-01
  stars: "3"
  nature: template
  mode: A
  wave: V2
  load: auto
---

# README writing

**Core rule:** every command in the README was run and works; the first screen says what the project is and how to start it.

## Procedure

1. Collect the facts: purpose, requirements with versions, install, run, test, configuration (`project-onboarding`).
   - Check: each fact has its source file or command.
2. Run each command you will document, from a clean checkout if possible.
   - Check: each command succeeded; outputs noted.
3. Write `README.md` from the template; keep the first section under 10 lines.
   - Check: a newcomer can start the project from the Quick start alone.
4. Validate the Markdown (`markdown-conventions` if present) and relative links.
   - Check: every relative link points to an existing file.

## Template

````markdown
# <Project name>
<One sentence: what it does and for whom.>

## Quick start
```sh
<install command>
<run command>
```

## Requirements
- <tool> <version>

## Usage
<main commands or examples>

## Development
- Test: `<command>`
- Lint: `<command>`
- Build: `<command>`

## Configuration
| Variable | Meaning | Default |

## Troubleshooting
| Problem | Fix |
````

## Stop and ask the human if

- The audience is unclear (end users or developers), or internal hosts would appear in a file that leaves the internal network.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Copy the commands from memory." | Untested commands are the first thing newcomers hit. |
| "Explain the whole architecture." | Link to `docs/architecture.md`; keep the README short. |

## Definition of done

- [ ] Every documented command was run and works.
- [ ] Quick start on the first screen; links valid.
