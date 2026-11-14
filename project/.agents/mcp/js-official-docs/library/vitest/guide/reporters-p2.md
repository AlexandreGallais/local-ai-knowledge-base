---
title: "Reporters | Guide (part 2 of 3)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/reporters.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Reporters | Guide (part 2 of 3)

## Built-in Reporters

### Default Reporter

The `default` reporter displays summary of running tests and their status at the bottom. Once a suite passes, its status will be reported on top of the summary.

You can disable the summary by configuring the reporter:

:::code-group

```ts
export default defineConfig({
  test: {
    reporters: [
      ['default', { summary: false }]
    ]
  },
})
```

Example output for tests in progress:

```bash
 ✓ test/example-1.test.ts (5 tests | 1 skipped) 306ms
 ✓ test/example-2.test.ts (5 tests | 1 skipped) 307ms

 ❯ test/example-3.test.ts 3/5
 ❯ test/example-4.test.ts 1/5

 Test Files 2 passed (4)
      Tests 10 passed | 3 skipped (65)
   Start at 11:01:36
   Duration 2.00s
```

Final output after tests have finished:

```bash
 ✓ test/example-1.test.ts (5 tests | 1 skipped) 306ms
 ✓ test/example-2.test.ts (5 tests | 1 skipped) 307ms
 ✓ test/example-3.test.ts (5 tests | 1 skipped) 307ms
 ✓ test/example-4.test.ts (5 tests | 1 skipped) 307ms

 Test Files  4 passed (4)
      Tests  16 passed | 4 skipped (20)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

If there is only one test file running, Vitest will output the full test tree of that file, similar to the `tree` reporter. The default reporter will also print the test tree if there is at least one failed test in the file.

```bash
✓ __tests__/file1.test.ts (2) 725ms
   ✓ first test file (2) 725ms
     ✓ 2 + 2 should equal 4
     ✓ 4 - 2 should equal 2

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### Verbose Reporter

The verbose reporter prints every test case once it is finished. It does not report suites or files separately. If `--includeTaskLocation` is enabled, it will also include the location of each test in the output. Similar to `default` reporter, you can disable the summary by configuring the reporter.

In addition to this, the `verbose` reporter prints test error messages right away. The full test error is reported when the test run is finished.

This is the only terminal reporter that reports annotations when the test doesn't fail.

:::code-group

```bash
npx vitest --reporter=verbose
```

```ts
export default defineConfig({
  test: {
    reporters: [
      ['verbose', { summary: false }]
    ]
  },
})
```

Example output:

```bash
✓ __tests__/file1.test.ts > first test file > 2 + 2 should equal 4 1ms
✓ __tests__/file1.test.ts > first test file > 4 - 2 should equal 2 1ms
✓ __tests__/file2.test.ts > second test file > 1 + 1 should equal 2 1ms
✓ __tests__/file2.test.ts > second test file > 2 - 1 should equal 1 1ms

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

An example with `--includeTaskLocation`:

```bash
✓ __tests__/file1.test.ts:2 > first test file > 2 + 2 should equal 4 1ms
✓ __tests__/file1.test.ts:3 > first test file > 4 - 2 should equal 2 1ms
✓ __tests__/file2.test.ts:2 > second test file > 1 + 1 should equal 2 1ms
✓ __tests__/file2.test.ts:3 > second test file > 2 - 1 should equal 1 1ms

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### Tree Reporter

The tree reporter is same as `default` reporter, but it also displays each individual test after the suite has finished. Similar to `default` reporter, you can disable the summary by configuring the reporter.

:::code-group

```bash
npx vitest --reporter=tree
```

```ts
export default defineConfig({
  test: {
    reporters: [
      ['tree', { summary: false }]
    ]
  },
})
```

Example output for tests in progress with default `slowTestThreshold: 300`:

```bash
 ✓ __tests__/example-1.test.ts (2) 725ms
   ✓ first test file (2) 725ms
     ✓ 2 + 2 should equal 4
     ✓ 4 - 2 should equal 2

 ❯ test/example-2.test.ts 3/5
   ↳ should run longer than three seconds 1.57s
 ❯ test/example-3.test.ts 1/5

 Test Files 2 passed (4)
      Tests 10 passed | 3 skipped (65)
   Start at 11:01:36
   Duration 2.00s
```

Example of final terminal output for a passing test suite:

```bash
✓ __tests__/file1.test.ts (2) 725ms
   ✓ first test file (2) 725ms
     ✓ 2 + 2 should equal 4
     ✓ 4 - 2 should equal 2
✓ __tests__/file2.test.ts (2) 746ms
  ✓ second test file (2) 746ms
    ✓ 1 + 1 should equal 2
    ✓ 2 - 1 should equal 1

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### Dot Reporter

Prints a single dot for each completed test to provide minimal output while still showing all tests that have run. Details are only provided for failed tests, along with the summary for the suite.

:::code-group

```bash
npx vitest --reporter=dot
```

```ts
export default defineConfig({
  test: {
    reporters: ['dot']
  },
})
```

Example terminal output for a passing test suite:

```bash
....

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### JUnit Reporter

Outputs a report of the test results in JUnit XML format. By default it is written to `.vitest/junit/output.xml`. To write it elsewhere, use the `outputFile` configuration option or the reporter's own `outputFile` option. To print it to the terminal instead, set the reporter's `stdout` option.

:::code-group

```bash
npx vitest --reporter=junit
```

```ts
export default defineConfig({
  test: {
    reporters: ['junit']
  },
})
```

Example of a JUnit XML report:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<testsuites name="vitest tests" tests="2" failures="1" errors="0" time="0.503">
    <testsuite name="__tests__/test-file-1.test.ts" timestamp="2023-10-19T17:41:58.580Z" hostname="My-Computer.local" tests="2" failures="1" errors="0" skipped="0" time="0.013">
        <testcase classname="__tests__/test-file-1.test.ts" name="first test file &gt; 2 + 2 should equal 4" time="0.01">
            <failure message="expected 5 to be 4 // Object.is equality" type="AssertionError">
AssertionError: expected 5 to be 4 // Object.is equality
 ❯ __tests__/test-file-1.test.ts:20:28
            </failure>
        </testcase>
        <testcase classname="__tests__/test-file-1.test.ts" name="first test file &gt; 4 - 2 should equal 2" time="0">
        </testcase>
    </testsuite>
</testsuites>
```

The output XML contains nested `testsuites` → `testsuite` → `testcase` tags. You can customize the reporter's behaviour with the following options:

| Option                 | Description                                                                                                               | Default                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `suiteName`            | `name` attribute of `<testsuites>`                                                                                        | `"vitest tests"`                        |
| `suiteNameTemplate`    | Template for the `name` attribute of `<testsuite>`. Accepts a string with placeholders or a function.                     | Relative file path                      |
| `classnameTemplate`    | Template for the `classname` attribute of `<testcase>`. Accepts a string with placeholders or a function.                 | Relative file path                      |
| `titleTemplate`        | Template for the `name` attribute of `<testcase>`. Accepts a string with placeholders or a function.                      | Full test title with ancestor hierarchy |
| `ancestorSeparator`    | Separator used when joining ancestor describe block names in the `{classname}` placeholder and in the default test title. | `" > "`                                 |
| `addFileAttribute`     | Add a `file` attribute to each `<testcase>`.                                                                              | `false`                                 |
| `includeConsoleOutput` | Include `<system-out>` / `<system-err>` console output.                                                                   | `true`                                  |
| `stackTrace`           | Include stack traces in `<failure>` elements.                                                                             | `true`                                  |

The following placeholders are available for `suiteNameTemplate`:

- `{title}` – name of the first top-level `describe` block; falls back to the file basename when there is no top-level `describe`
- `{filename}` – relative file path from the root (e.g. `src/foo.test.ts`)
- `{filepath}` – absolute file path
- `{basename}` – file name without directory (e.g. `foo.test.ts`)
- `{displayName}` – Vitest project name

The following placeholders are available for `classnameTemplate` and `titleTemplate`:

- `{classname}` – ancestor `describe` block names joined by `ancestorSeparator` (e.g. `outer > inner`)
- `{title}` – leaf test title (the string passed to `it`/`test`)
- `{suitename}` – top-level `describe` block name, empty string when the test has no enclosing `describe`
- `{filename}` – relative file path from the root
- `{filepath}` – absolute file path
- `{basename}` – file name without directory
- `{displayName}` – Vitest project name

**Tip:**
`{filename}` follows Vitest's convention and resolves to the **relative path** from the project root (e.g. `src/foo.test.ts`). This differs from jest-junit where `{filename}` is the bare file name. Use `{basename}` to get only the file name.

```ts
export default defineConfig({
  test: {
    reporters: [
      ['junit', {
        suiteName: 'My Test Suite',
        // Use the first top-level describe block name as the testsuite name
        suiteNameTemplate: '{title}',
        // classname = ancestor describe chain
        classnameTemplate: '{classname}',
        // name = leaf test title only (jest-junit-compatible)
        titleTemplate: '{title}',
        ancestorSeparator: ' > ',
      }]
    ]
  },
})
```

Function-based templates receive all available variables and can return any string:

```ts
export default defineConfig({
  test: {
    reporters: [
      ['junit', {
        classnameTemplate: ({ classname, filename }) =>
          classname ? `${filename}::${classname}` : filename,
        titleTemplate: ({ suitename, title }) =>
          suitename ? `[${suitename}] ${title}` : title,
      }]
    ]
  },
})
```

### JSON Reporter

Generates a report of the test results in a JSON format compatible with Jest's `--json` option. By default it is written to `.vitest/json/output.json`. To write it elsewhere, use the `outputFile` configuration option or the reporter's own `outputFile` option. To print it to the terminal instead, set the reporter's `stdout` option.

:::code-group

```bash
npx vitest --reporter=json
```

```ts
export default defineConfig({
  test: {
    reporters: ['json']
  },
})
```

Example of a JSON report:

```json
{
  "numTotalTestSuites": 4,
  "numPassedTestSuites": 2,
  "numFailedTestSuites": 1,
  "numPendingTestSuites": 1,
  "numTotalTests": 4,
  "numPassedTests": 1,
  "numFailedTests": 1,
  "numPendingTests": 1,
  "numTodoTests": 1,
  "startTime": 1697737019307,
  "success": false,
  "testResults": [
    {
      "assertionResults": [
        {
          "ancestorTitles": [
            "",
            "first test file"
          ],
          "fullName": " first test file 2 + 2 should equal 4",
          "status": "failed",
          "title": "2 + 2 should equal 4",
          "duration": 9,
          "failureMessages": [
            "expected 5 to be 4 // Object.is equality"
          ],
          "location": {
            "line": 20,
            "column": 28
          },
          "meta": {}
        }
      ],
      "startTime": 1697737019787,
      "endTime": 1697737019797,
      "status": "failed",
      "message": "",
      "name": "/root-directory/__tests__/test-file-1.test.ts"
    }
  ],
  "coverageMap": {}
}
```

**Info:**
Since Vitest 3, the JSON reporter includes coverage information in `coverageMap` if coverage is enabled.

The `meta` field in each assertion result can be filtered via the `filterMeta` reporter option. It receives the key and value of each field and should return a falsy value to exclude the field from the report:

```ts
export default defineConfig({
  test: {
    reporters: [
      ['json', {
        filterMeta: (key, value) => key !== 'internalField',
      }]
    ]
  },
})
```

### HTML Reporter

Generates a static version of Vitest UI for reviewing completed test runs. See the HTML Reporter guide for local preview, CI artifacts, and sharing workflows.

The report artifact root can be specified using the reporter's `outputDir` option and the report entry is written to `<outputDir>/index.html`. By default `outputDir` is the shared Vitest artifact directory `.vitest`.

Use `singleFile` to produce one portable HTML file. See Share as a Single File for configuration and limitations.

:::code-group

```bash
npx vitest --reporter=html
```

```ts
export default defineConfig({
  test: {
    reporters: ['html']
  },
})
```

### TAP Reporter

Outputs a report following Test Anything Protocol (TAP).

:::code-group

```bash
npx vitest --reporter=tap
```

```ts
export default defineConfig({
  test: {
    reporters: ['tap']
  },
})
```

Example of a TAP report:

```bash
TAP version 13
1..1
not ok 1 - __tests__/test-file-1.test.ts # time=14.00ms {
    1..1
    not ok 1 - first test file # time=13.00ms {
        1..2
        not ok 1 - 2 + 2 should equal 4 # time=11.00ms
            ---
            error:
                name: "AssertionError"
                message: "expected 5 to be 4 // Object.is equality"
            at: "/root-directory/__tests__/test-file-1.test.ts:20:28"
            actual: "5"
            expected: "4"
            ...
        ok 2 - 4 - 2 should equal 2 # time=1.00ms
    }
}
```
