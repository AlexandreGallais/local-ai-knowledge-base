---
name: golden-file-tests
description: "Tests complex outputs against reference (golden) files, with numerical tolerances and a reviewed update procedure. Use when an output is large or structured (reports, simulation results, generated code, rendered text), when asserting it field by field is impractical, or when a golden file must be updated."
metadata:
  id: TST-10
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Golden file tests

**Core rule:** a golden file changes only through an explicit update command whose diff a human reviews; numbers are compared with tolerances, not as text.

## Procedure

1. Store goldens next to the tests (`tests/golden/<case>.<ext>`), in a stable, diff-friendly format (sorted keys, fixed precision).
   - Check: two runs produce byte-identical output for text, or equal within tolerance for numbers.
2. Compare: text exactly; numbers with absolute and relative tolerance per field.
   - Check: a deliberate small change in output makes the test fail with a readable diff.
3. Provide an update mode (`UPDATE_GOLDEN=1 <test command>`) that rewrites the goldens.
   - Check: the mode is documented in the test file.
4. After an update, show the golden diff to the human.
   - Check: the diff is approved before commit.

## Stop and ask the human if

- A golden must change: the human approves the new reference.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Update the golden to make the test pass." | That accepts the bug. Explain the diff first. |
| "Compare floats as text." | Tiny rounding changes then fail the test. |

## Definition of done

- [ ] Stable goldens; tolerant numeric comparison; update mode documented; golden changes reviewed.
