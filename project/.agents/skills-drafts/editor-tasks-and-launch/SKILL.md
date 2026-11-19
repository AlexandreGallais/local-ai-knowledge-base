---
name: editor-tasks-and-launch
description: "Manual: run only when the user explicitly asks for /editor-tasks-and-launch. Writes the editor's tasks.json and launch.json (or equivalents) so build, test and debug run in the dev container with one action."
metadata:
  id: TOL-08
  stars: "2"
  nature: template
  mode: B
  wave: V3
  load: manual
---

# Editor tasks and launch configurations

**Core rule:** each task calls the project's existing command (task runner or script), so the editor, CI and the agent run the same thing.

## Procedure

1. List the project commands: build, test, lint, run (`task-runners`).
   - Check: each command runs in the dev container.
2. Write `.vscode/tasks.json` with one task per command (template below).
   - Check: the file is valid JSON with comments and each task runs from the editor.
3. Write `.vscode/launch.json` for debugging the main program and the tests, with the language's debugger.
   - Check: a breakpoint is hit when the human starts the configuration.

```jsonc
{
  "version": "2.0.0",
  "tasks": [
    { "label": "test", "type": "shell", "command": "<project test command>", "group": "test" },
    { "label": "build", "type": "shell", "command": "<project build command>", "group": "build" }
  ]
}
```

## This installation

<!-- FILL: what=editor used by the team and whether .vscode is committed; find=git ls-files .vscode and ask the human; verify=the rule is written here -->

<!-- FILL: what=debugger extensions available in the dev container per language; find=grep -n extensions .devcontainer/devcontainer.json; verify=a launch configuration starts the debugger -->

## Stop and ask the human if

- The team does not commit editor files.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Put the full command in the task." | Call the project's script; one source of truth. |
| "Debug configs work on the host." | They must run inside the dev container. |

## Definition of done

- [ ] Tasks call project commands; launch configurations hit a breakpoint; commit rule respected.

## Local completion checklist

- [ ] Editor and commit rule
- [ ] Debugger extensions
