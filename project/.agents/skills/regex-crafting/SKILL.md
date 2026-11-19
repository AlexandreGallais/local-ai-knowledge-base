---
name: regex-crafting
description: "Writes regular expressions with positive and negative test cases, in the right dialect (PCRE, JavaScript, Python, POSIX grep and sed). Use when writing or fixing a regex, a grep, sed or awk pattern, a validation rule, or when a pattern matches too much or too little."
metadata:
  id: DEV-10
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Regex crafting

**Core rule:** every regex comes with cases that must match and cases that must not, run in the same dialect where it will be used.

## Procedure

1. Write 3 strings that must match and 3 close ones that must not.
   - Check: the six cases are written.
2. Write the pattern for the target dialect (table); anchor it (`^...$`) when it validates a whole value.
   - Check: the pattern uses only features of that dialect.
3. Test it in that dialect: a unit test, or `printf '%s\n' <cases> | grep -E '<pattern>'`, or `python3 -c "import re; ..."`.
   - Check: all six cases behave as expected.
4. Keep the cases as a test in the project.
   - Check: the test runs in the suite.

| Dialect | Notes |
| --- | --- |
| `grep` basic | `+`, `?`, alternation and groups need a backslash; prefer `grep -E` |
| `grep -E`, `sed -E` | extended POSIX; no `\d` (use `[0-9]`), no lookarounds |
| JavaScript | `\d`, lookarounds, named groups `(?<name>...)`; flags `u`, `g` |
| Python `re` | raw strings `r'...'`; `re.fullmatch` for whole values |
| PCRE (`grep -P`) | lookarounds and `\d`; not available everywhere |

## Stop and ask the human if

- The regex validates security-relevant input (emails, URLs, paths): prefer a parser or library.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`\d` works in grep -E." | It does not; use `[0-9]`. |
| "No anchors needed." | Without `^` and `$`, partial matches pass validation. |

## Definition of done

- [ ] Pattern tested in its dialect on positive and negative cases, kept as a test.
