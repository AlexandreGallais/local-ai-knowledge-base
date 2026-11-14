---
name: write-tests
description: Use when the user asks for tests, when a test fails, or after you change code that has tests - Angular or TypeScript, with the runner the project already has.
---

# Write and run tests

## Rules

- Never change, skip or delete a test to make it pass. Fix the code under test. Stop after 3 failed
  attempts and show the failure.
- Keep the runner and the libraries of the project. Never add a test library without the user's
  agreement.
- Take each expected value from the request, never from the code under test.
- One behavior per test, named after it. Mock only the boundaries: network, clock, files.

## Steps

1. Note the code to test and the behaviors the request asks for.
2. Find the runner: the `test` target of
   `angular.json` (`@angular/build:unit-test`, Vitest) or `vitest` in `package.json`.
3. Read one existing test next to the code; copy its style and helpers.
4. Angular: read `docs/angular-testing/index.md`, then the document you need. A store:
   `docs/ngrx-signals/testing-stores.md`. A component: `docs/components/testing-a11y.md`.
5. List the cases: the normal case, each limit, each error the request names.
6. Write the tests next to the code: `<name>.spec.ts`.
7. Run them with the test command of the project (`ng test --watch=false`, or `vitest run <file>`).
8. A test fails: decide from the request whether the code or the test is wrong. Fix the code; fix a
   test only when it contradicts the request.
9. Run all the tests once, then the other check commands.

## Example

Wrong:

```text
I changed the expected value in the test so that it matches the output. All tests pass.
```

Right:

```text
Tests: CircuitStore loads the valves and counts the open ones; selects then clears a valve.
Command: ng test --watch=false. Exit 0, 16 tests passed.
```

## Pitfalls

- `ng test` without `--watch=false` never ends.
- `fakeAsync` and `detectChanges()` from memory: Angular 22 tests run without zone; use
  `await fixture.whenStable()`.
- A geometry (`getBBox`, `getScreenCTM`) in jsdom is always 0: read
  `docs/angular-testing/svg-class-tests.md`.

## Final check

- Did you leave every test as strong as the request asks?
- Did you run your tests, then all the tests, and give their result?
