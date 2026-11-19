---
name: failure-recovery
description: "Handles a failed tool call - read the exact error, classify it (syntax, rights, network, state), make one correction, try once more. Use when a tool or a command returns an error, a non-zero exit code, an empty result where data was expected, or a timeout."
metadata:
  id: MET-12
  stars: "3"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Failure recovery

**Core rule:** after a failure, read the exact error and change one thing before the next try; never repeat the same call unchanged.

## Procedure

1. Quote the exact error: message, exit code, the last lines of output.
   - Check: the quote is in your reply.
2. Classify it with the table.
   - Check: one class is named.
3. Make one correction that matches the class.
   - Check: the next call differs from the failed one in exactly that point.
4. Try once more.
   - Check: success, or a different error. The same error again goes to `loop-breaker`.

| Class | Signs | Correction |
| --- | --- | --- |
| Syntax or usage | `unknown option`, `usage:`, parse error | read `--help` (`cli-help-mining`), fix the call |
| Not found | `No such file`, `command not found`, 404 | check the path with `ls` or `command -v` |
| Rights | `Permission denied`, `EACCES`, `avc: denied` | check owner and SELinux label; no `sudo`, ask |
| Network | `ENOTFOUND`, timeout, `Could not resolve` | internal mirror (`offline-environment`); no blind retry |
| State | `already exists`, `locked`, conflict | inspect the state (`git status`, `ls`, `ps`) then act |
| Tool limit | output truncated, too large | narrow the request (`context-budget`) |

## Stop and ask the human if

- The correction needs rights, a network access or an install you cannot do.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Retry, it was probably transient." | Read the error first; most failures are not transient. |
| "Change three things at once." | You will not know which one fixed it. |

## Definition of done

- [ ] Each failure quoted, classified, corrected once, retried once.
