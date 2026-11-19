---
name: testing-anti-patterns
description: "Blocks tests that pass for the wrong reason - asserting mocks, mocking too much, empty assertions, sleeps, expected values computed by the code under test, tests edited just to pass. Use when writing, changing or fixing a test, adding a mock, or when a test was red and you are tempted to change it rather than the code."
license: MIT
metadata:
  id: TST-02
  stars: "4"
  nature: guardrail
  mode: R
  wave: V1
  load: auto
---

# Testing anti-patterns

**Core rule:** a test must be able to fail on a real bug. Never change a test only to make it pass.

## Forbidden, and what to do instead

| Anti-pattern | Instead |
| --- | --- |
| Asserting that a mock was called, as the only check | Assert the real result: return value, state, output |
| Mocking the unit under test or its pure helpers | Mock only slow or external edges (network, clock, disk) |
| `expect(x)` with no matcher, `assert True`, a test without assertion | One explicit assertion per behaviour |
| Expected value computed with the code under test | A literal or a hand-checked fixture |
| `sleep(…)` to wait for something | Wait on a condition with a timeout |
| Editing the expected value until green | Find why it differs; fix the code, or ask if the spec changed |
| Skipping or deleting a failing test | Fix it, or ask the human with the reason |
| Testing a constant or the exact wording of a message | Test the behaviour that depends on it |

## Gate before writing a test

1. Name the production bug that would make this test fail.
   - Check: you can write it in one sentence.
2. Make sure the expected value does not come from the code under test.
   - Check: it is a literal or a fixture written by hand.

## Stop and ask the human if

- A test fails and the specification may have changed: ask which one is right.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The assertion was wrong, I will update it." | Prove it with the spec first. |
| "Mocking everything makes it fast." | It tests the mocks. |

## Definition of done

- [ ] Each new test names the bug it catches and was seen failing once.
- [ ] No test was changed only to pass.
