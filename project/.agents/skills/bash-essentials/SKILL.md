---
name: bash-essentials
description: "Gives safe, correct shell one-liners - quoting, pipes, xargs, find, sed, awk, redirections, exit codes. Use when writing a shell command with spaces in paths, globs, pipes, loops over files, find -exec or xargs, sed or awk edits, or when a command fails with 'No such file', 'unbound variable' or 'argument list too long'."
metadata:
  id: LNX-01
  stars: "4"
  nature: reference
  mode: A
  wave: V1
  load: auto
---

# Bash essentials

**Core rule:** quote every variable and path (`"$file"`), and read the exit code of each command before trusting its output.

## Procedure

1. Quote expansions: `"$var"`, `"$(cmd)"`, `"${array[@]}"`.
   - Check: the command works on a path with a space (`/tmp/a b`).
2. For many files, use `find ... -print0 | xargs -0` or `find ... -exec cmd {} +`, never a loop over `ls` output.
   - Check: file names with spaces or newlines are handled.
3. Read the exit code: `cmd; echo "exit=$?"`; in a pipe, `set -o pipefail` first.
   - Check: you know the exit code of the command that matters.
4. Preview before an in-place edit: `sed -n 's/old/new/p' file`, then `sed -i 's/old/new/' file`.
   - Check: the preview shows only the intended lines.

## Recipes

| Need | Command |
| --- | --- |
| Files changed in the last day | `find . -type f -mtime -1 -not -path './.git/*'` |
| Replace in many files | `grep -rl 'old' src/ \| xargs -r sed -i 's/old/new/g'` |
| Count lines per file | `find src -name '*.ts' -print0 \| xargs -0 wc -l \| sort -n \| tail` |
| Column 2 of a CSV | `awk -F, '{print $2}' file.csv` |
| Stdout and stderr to a file | `cmd > out.log 2>&1` |
| Run only if the previous succeeded | `cmd1 && cmd2` |
| Exit code of the first stage of a pipe | `set -o pipefail; cmd \| tee log` |
| Literal string search (no regex) | `grep -F -- '--flag' file` |

## Stop and ask the human if

- A command would change or delete many files: preview it, then ask (`destructive-action-gate`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`for f in $(ls)` is fine." | It breaks on spaces. Use `find -print0` or a glob. |
| "`sed -i` works the same everywhere." | GNU and BSD differ; on Fedora it is GNU `sed -i`. |
| "The pipe succeeded." | Without `pipefail`, only the last command's code counts. |

## Definition of done

- [ ] Every variable and path quoted.
- [ ] Exit codes read; destructive edits previewed first.
