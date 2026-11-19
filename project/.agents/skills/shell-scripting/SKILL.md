---
name: shell-scripting
description: "Writes robust Bash scripts - strict mode, quoting, ShellCheck, idempotence, traps for cleanup. Use when creating or changing a .sh script, a script in a Makefile or CI job, a postCreateCommand, or when shellcheck reports SC warnings."
metadata:
  id: LNX-02
  stars: "4"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Shell scripting

**Core rule:** every script starts with strict mode, quotes every expansion, and passes ShellCheck with no warning.

## Procedure

1. Start from the skeleton below.
   - Check: the first lines are the shebang and `set -euo pipefail`.
2. Quote every expansion; use arrays for lists of arguments.
   - Check: the script works with a path containing a space.
3. Make it idempotent: running it twice gives the same result (`mkdir -p`, check before create).
   - Check: a second run succeeds and changes nothing.
4. Clean up with a trap; send errors to stderr; exit non-zero on failure.
   - Check: a forced failure removes temporary files and exits 1.
5. Run ShellCheck when installed: `shellcheck <script>`.
   - Check: no finding, or each one disabled with a reason on the same line.

## Skeleton

```bash
#!/usr/bin/env bash
# <what this script does, in one line>
set -euo pipefail

usage() { echo "Usage: $0 <arg>" >&2; exit 2; }
[[ $# -eq 1 ]] || usage

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

main() {
  local target="$1"
  # ...
}

main "$@"
```

## Stop and ask the human if

- The script must run as root or change system files.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`set -e` catches every error." | Not inside `if`, `&&` chains or pipelines without `pipefail`. Check codes there. |
| "Unquoted is fine here." | One space in a name breaks it. Quote. |

## Definition of done

- [ ] Strict mode, quoting, trap cleanup, usage message.
- [ ] ShellCheck clean; second run idempotent.
