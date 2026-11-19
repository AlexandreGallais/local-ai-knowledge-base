---
name: semgrep-rules
description: "Manual: run only when the user explicitly asks for /semgrep-rules. Writes local Semgrep rules that forbid project-specific patterns, each with positive and negative test cases."
license: CC-BY-SA-4.0
metadata:
  id: SEC-10
  stars: "1"
  nature: tooling
  mode: R
  wave: V4
  load: manual
---

# Semgrep rules

**Core rule:** every rule ships with test code that must match and code that must not, and is run with `semgrep --test` before use.

## Procedure

1. Write the pattern to forbid and one real example from the code.
   - Check: the example is quoted with file and line.
2. Write the rule in `.semgrep/<rule-id>.yaml`: `id`, `languages`, `message` (what to do instead), `severity`, `pattern` or `patterns`.
   - Check: the YAML parses (`semgrep --validate --config .semgrep/`).
3. Write the test file `.semgrep/<rule-id>.<ext>` with `# ruleid: <rule-id>` above matching lines and `# ok: <rule-id>` above safe lines.
   - Check: `semgrep --test .semgrep/` passes.
4. Run it on the project: `semgrep --config .semgrep/ --error <dir>`.
   - Check: matches are real; false positives fixed in the rule.

## Stop and ask the human if

- Semgrep is not installed from the internal mirror.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Use a regex rule." | Semgrep patterns understand syntax; regex rules miss variants. |
| "No tests for one rule." | Untested rules drift into false positives. |

## Definition of done

- [ ] Rule with message and severity; tests pass with `semgrep --test`; project run reviewed.

## References

- `references/SOURCE.md`: upstream and licence of this skill (CC-BY-SA-4.0: this adaptation keeps that licence).
