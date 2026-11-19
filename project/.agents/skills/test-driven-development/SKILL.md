---
name: test-driven-development
description: "Writes the failing test first, then the minimal code to pass it, then cleans up - red, green, refactor. Use when implementing a function, a feature or a bug fix whose behaviour can be stated as an input and an expected output, or when the user asks for TDD, test-first or red-green-refactor."
license: MIT
metadata:
  id: DEV-03
  stars: "4"
  nature: process
  mode: R
  wave: V2
  load: auto
---

# Test-driven development

**Core rule:** no production code without a test you watched fail first for the right reason.

## When to use

- Use when: new behaviour, bug fix, change of a function's contract.
- Do not use when: pure configuration, generated code, or exploration you will throw away (`prototype-spike` if present).

## Procedure

1. Red: write one test for one behaviour, with a literal expected value.
   - Check: the test runs and fails, and the failure message shows the missing behaviour (not a typo or an import error).
2. Green: write the smallest code that makes it pass.
   - Check: the test passes; the other tests still pass.
3. Refactor: remove duplication, improve names, keep behaviour.
   - Check: the whole suite still passes after each change.
4. Repeat with the next behaviour.
   - Check: each behaviour has its own test seen red then green.
5. Run the full suite and the type check at the end.
   - Check: both exit 0.

## Example

Red: `expect(slugify('Hello World')).toBe('hello-world')` fails with `slugify is not a function`... that is an import error, not the behaviour: export a stub first, run again, see `expected 'hello-world', received ''`. Now it is red for the right reason.

## Stop and ask the human if

- The expected behaviour cannot be stated as a check (ask for an example input and output).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will write the tests after." | Tests written after pass by construction; they prove little. |
| "It passed at first run." | A test that never failed may test nothing. Break the code once to see it fail. |
| "Several behaviours in one test." | One failure hides the others. One behaviour per test. |

## Definition of done

- [ ] Every new behaviour has a test seen failing, then passing.
- [ ] Suite and type check green.

## References

- Skill `testing-anti-patterns`: what a test must not do.
- `references/SOURCE.md`: upstream and licence of this skill.
