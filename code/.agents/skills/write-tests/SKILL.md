---
name: write-tests
description: Write, fix or run unit and integration tests in C#, Angular or TypeScript with the runner and libraries the project already has, until they pass without being weakened. Use when the user asks for tests, when a test fails, or after you change code that has tests.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Write and run tests

## Rules

- Never change, skip or delete a test to make it pass. Fix the code under test. Stop after 3 failed attempts and show the failure.
- Keep the test framework, the runner and the libraries the project has. Never add a test, assertion or mocking library without the user's agreement.
- Take each expected value from the request or the specification, never from the code under test.
- One behavior per test, named after it. Assert on the result; never print instead of asserting.
- Mock only the boundaries: network, clock, file system, database.
- Never search the web. Never open a URL.

## Steps

1. Note the code to test and the behaviors the request asks for.

<!-- files:begin id=read -->

2. Find the runner of the project:
   - C#: read `global.json` (`"runner"`) and the test project (`xunit.v3`, `MSTest.Sdk`, `NUnit`, `TUnit`).
   - Angular or TypeScript: read the `test` target of `angular.json` and `package.json` (`vitest`, `karma`, `jsdom`, `happy-dom`).
3. Read one existing test of the project next to the code. Copy its style, its helpers and its assertion library.
4. Open the documents of the topic: `docs/dotnet-testing/index.md` or `docs/angular-testing/index.md`. Read the rules document, and `test-old-to-new.md` for the version of the project.

<!-- files:end -->

5. List the cases: the normal case, each limit, each error the request names.

<!-- files:begin id=run -->

6. Write the tests in the test file next to the code, or in the test project of the code.
7. Run only these tests, with the command of `run-tests.md` of the topic. Read the end of the output.
8. A test fails: decide whether the code or the test is wrong, from the request. Fix the code; fix a test only when it contradicts the request.
9. Run all the tests of the project once. Then run the check commands of `AGENTS.md`.

<!-- files:end -->

10. Give the tests written, the commands run and their result, and any behavior left untested.

## Example

Wrong:

```text
I updated the expected value in the test so that it matches the current output. All tests pass.
```

Right:

```text
Tests: ValveServiceTests.Close_sets_an_open_valve_to_closed, Close_refuses_an_unknown_valve.
Command: dotnet test --project tests/Valves.Tests.csproj --no-restore --filter-class "Valves.Tests.ValveServiceTests". Exit 0.
Close() left a closed valve unchanged; the request says it must raise an error. I fixed ValveService.Close().
```

## Pitfalls

- A command of another runner: `--logger trx` fails in MTP mode, `--browsers=ChromeHeadless` is Karma only. Read the runner first.
- `fakeAsync`, `detectChanges()` or `UseInMemoryDatabase` from memory: check `test-old-to-new.md` of the topic.
- A geometry (`getBBox`, `getScreenCTM`) asserted in jsdom or happy-dom: read `docs/angular-testing/svg-class-tests.md`.
- `ng test` without `--no-watch` never ends.

## Final check

- Did you leave every test as strong as the request asks, and fix the code instead of a test?
- Did you add no library the project did not have?
- Did you run your tests, then all the tests, and give their result?
