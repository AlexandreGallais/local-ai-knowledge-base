# F28 trial: writing and running tests

What to play on the workstation for the criterion of F28 that only a person can see. About 30
minutes, in the trial projects of F8 (Angular) and F9 (C#).

## 1. Note the runner of each project

- C#: the `"runner"` line of `global.json`, if any, and the test package of the test project.
- Angular: the `builder` of the `test` target in `angular.json`, and `vitest` or `karma` in
  `package.json`.

## 2. Ask for tests

In a new session of each project:

> Write the unit tests of ValveService: closing an open valve closes it, closing an unknown valve
> raises an error.

Expected, in the trace:

1. The AI loads `write-tests`, reads the runner and one existing test first.
2. It adds no test, assertion or mocking library.
3. It runs only its new tests, with the command of `run-tests.md` (`--filter-class` or `--include`,
   and `--no-watch` for Angular), then all the tests.
4. If a test fails, it fixes the code, not the test.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| C#: runner read first, no library added |  |  |
| C#: only the new tests run, then all |  |  |
| Angular: runner read first, no library added |  |  |
| Angular: `--no-watch`, only the new tests, then all |  |  |
