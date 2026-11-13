---
title: "testNamePattern | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/testnamepattern.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# testNamePattern <CRoot /> {#testnamepattern}

- **Type:** `string | RegExp`
- **CLI:** `-t <pattern>`, `--testNamePattern=<pattern>`, `--test-name-pattern=<pattern>`

Run tests with full names matching the pattern.
If you add `OnlyRunThis` to this property, tests not containing the word `OnlyRunThis` in the test name will be skipped.

```js
import { expect, test } from 'vitest'

// run
test('OnlyRunThis', () => {
  expect(true).toBe(true)
})

// skipped
test('doNotRun', () => {
  expect(true).toBe(true)
})
```

The pattern is matched against the test's full name: the enclosing suite names and the test name joined with `' > '` (the same string shown in the reporter output). For example, the test below has the full name `math > adds`, so it is matched by `-t 'math > adds'` or `-t adds`:

```js
import { describe, expect, test } from 'vitest'

describe('math', () => {
  test('adds', () => {
    expect(1 + 1).toBe(2)
  })
})
```

**Warning:**
Before Vitest 5, the segments were joined with a single space (`math adds`) to mirror Jest. See the migration guide for details.
