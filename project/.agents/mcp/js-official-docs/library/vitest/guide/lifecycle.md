---
title: "Test Run Lifecycle | Guide"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/lifecycle.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Test Run Lifecycle

**Tip:**
Looking for a practical introduction to `beforeEach`, `afterEach`, and other hooks? See the Setup and Teardown tutorial.

Understanding the test run lifecycle is essential for writing effective tests, debugging issues, and optimizing your test suite. This guide explains when and in what order different lifecycle phases occur in Vitest, from initialization to teardown.

## Overview

A typical Vitest test run goes through these main phases:

1. **Initialization:** Configuration loading and project setup
2. **Global Setup:** One-time setup before any tests run
3. **Worker Creation:** Test workers are spawned based on the pool configuration
4. **Test File Collection:** Test files are discovered and organized
5. **Test Execution:** Tests run with their hooks and assertions
6. **Reporting:** Results are collected and reported
7. **Global Teardown:** Final cleanup after all tests complete

Phases 4–6 run once for each test file, so across your test suite they will execute multiple times and may also run in parallel across different files when you use more than 1 worker.

## Detailed Lifecycle Phases

### 1. Initialization Phase

When you run `vitest`, the framework first loads your configuration and prepares the test environment.

**What happens:**

- Command-line arguments are parsed
- Configuration file is loaded
- Project structure is validated

This phase can run again if the config file or one of its imports changes.

**Scope:** Main process (before any test workers are created)

### 2. Global Setup Phase

If you have configured `globalSetup` files, they run once before any test workers are created.

**What happens:**

- `setup()` functions (or exported `default` function) from global setup files execute sequentially
- Multiple global setup files run in the order they are defined

**Scope:** Main process (separate from test workers)

**Important notes:**

- Global setup runs in a **different global scope** from your tests
- Tests cannot access variables defined in global setup (use `provide`/`inject` instead)
- Global setup only runs if there is at least one test queued

```ts
export function setup(project) {
  // Runs once before all tests
  console.log('Global setup')

  // Share data with tests
  project.provide('apiUrl', 'http://localhost:3000')
}

export function teardown() {
  // Runs once after all tests
  console.log('Global teardown')
}
```

### 3. Worker Creation Phase

After global setup completes, Vitest creates test workers based on your pool configuration.

**What happens:**

- Workers are spawned according to the `browser.enabled` or `pool` setting (`threads`, `forks`, `vmThreads`, or `vmForks`)
- Each worker gets its own isolated environment (unless isolation is disabled)
- By default, workers are not reused to provide isolation. Workers are reused only if:
  - isolation is disabled
  - OR pool is `vmThreads` or `vmForks` because VM provides enough isolation

**Scope:** Worker processes/threads

### 4. Test File Setup Phase

Before each test file runs, setup files are executed.

**What happens:**

- Setup files run in the same process as your tests
- By default, setup files run in **parallel** (configurable via `sequence.setupFiles`)
- Setup files execute before **each test file**
- Any global _state_ or configuration can be initialized here

**Scope:** Worker process (same as your tests)

**Important notes:**

- If isolation is disabled, setup files still rerun before each test file to trigger side effects, but imported modules are cached
- Editing a setup file triggers a rerun of all tests in watch mode

```ts
import { afterEach } from 'vitest'

// Runs before each test file
console.log('Setup file executing')

// Register hooks that apply to all tests
afterEach(() => {
  cleanup()
})
```

### 5. Test Collection and Execution Phase

This is the main phase where your tests actually run.

#### Test File Execution Order

Test files are executed based on your configuration:

- **Sequential by default** within a worker
- Files will run in **parallel** across different workers, configured by `maxWorkers`
- Order can be randomized with `sequence.shuffle` or fine-tuned with `sequence.sequencer`
- Long-running tests typically start earlier (based on cache) unless shuffle is enabled

#### Within Each Test File

The execution follows this order:

1. **File-level code:** All code outside `describe` blocks runs immediately
2. **Test collection:** `describe` blocks are processed, and tests are registered as side effects of importing the test file
3. **`aroundAll` hooks:** Wrap around all tests in the suite (must call `runSuite()`)
4. **`beforeAll` hooks:** Run once before any tests in the suite
5. **For each test:**
   - `aroundEach` hooks wrap around the test (must call `runTest()`)
   - `beforeEach` hooks execute (in order defined, or based on `sequence.hooks`)
   - Test function executes
   - `afterEach` hooks execute (reverse order by default with `sequence.hooks: 'stack'`)
   - Cleanup functions returned from `beforeEach` hooks execute (reverse order by default with `sequence.hooks: 'stack'`)
   - `onTestFinished` callbacks run (always in reverse order)
   - If test failed: `onTestFailed` callbacks run
   - Note: if `repeats` or `retry` are set, all of these steps are executed again
6. **`afterAll` hooks:** Run once after all tests in the suite complete
7. **Cleanup functions returned from `beforeAll` hooks:** Run once after all tests in the suite complete

**Example execution flow:**

```ts
// This runs immediately (collection phase)
console.log('File loaded')

describe('User API', () => {
  // This runs immediately (collection phase)
  console.log('Suite defined')

  aroundAll(async (runSuite) => {
    // Wraps around all tests in this suite
    console.log('aroundAll before')
    await runSuite()
    console.log('aroundAll after')
  })

  beforeAll(() => {
    // Runs once before all tests in this suite
    console.log('beforeAll')

    return function beforeAllCleanup() {
      // Runs once afterAll hooks have run
      console.log('beforeAllCleanup')
    }
  })

  aroundEach(async (runTest) => {
    // Wraps around each test
    console.log('aroundEach before')
    await runTest()
    console.log('aroundEach after')
  })

  beforeEach(() => {
    // Runs before each test
    console.log('beforeEach')

    return function beforeEachCleanup() {
      // Runs after afterEach hooks have run
      console.log('beforeEachCleanup')
    }
  })

  test('creates user', () => {
    // Test executes
    console.log('test 1')
  })

  test('updates user', () => {
    // Test executes
    console.log('test 2')
  })

  afterEach(() => {
    // Runs after each test
    console.log('afterEach')
  })

  afterAll(() => {
    // Runs once after all tests in this suite
    console.log('afterAll')
  })
})

// Output:
// File loaded
// Suite defined
// aroundAll before
//   beforeAll
//   aroundEach before
//     beforeEach
//       test 1
//     afterEach
//     beforeEachCleanup
//   aroundEach after
//   aroundEach before
//     beforeEach
//       test 2
//     afterEach
//     beforeEachCleanup
//   aroundEach after
//   afterAll
//   beforeAllCleanup
// aroundAll after
```

#### Nested Suites

When using nested `describe` blocks, hooks follow a hierarchical pattern. The `aroundAll` and `aroundEach` hooks wrap around their respective scopes, with parent hooks wrapping child hooks:

```ts
describe('outer', () => {
  aroundAll(async (runSuite) => {
    console.log('outer aroundAll before')
    await runSuite()
    console.log('outer aroundAll after')
  })

  beforeAll(() => console.log('outer beforeAll'))

  aroundEach(async (runTest) => {
    console.log('outer aroundEach before')
    await runTest()
    console.log('outer aroundEach after')
  })

  beforeEach(() => console.log('outer beforeEach'))

  test('outer test', () => console.log('outer test'))

  describe('inner', () => {
    aroundAll(async (runSuite) => {
      console.log('inner aroundAll before')
      await runSuite()
      console.log('inner aroundAll after')
    })

    beforeAll(() => console.log('inner beforeAll'))

    aroundEach(async (runTest) => {
      console.log('inner aroundEach before')
      await runTest()
      console.log('inner aroundEach after')
    })

    beforeEach(() => console.log('inner beforeEach'))

    test('inner test', () => console.log('inner test'))

    afterEach(() => console.log('inner afterEach'))
    afterAll(() => console.log('inner afterAll'))
  })

  afterEach(() => console.log('outer afterEach'))
  afterAll(() => console.log('outer afterAll'))
})

// Output:
// outer aroundAll before
//   outer beforeAll
//   outer aroundEach before
//     outer beforeEach
//       outer test
//     outer afterEach
//   outer aroundEach after
//   inner aroundAll before
//     inner beforeAll
//     outer aroundEach before
//       inner aroundEach before
//         outer beforeEach
//           inner beforeEach
//             inner test
//           inner afterEach
//         outer afterEach
//       inner aroundEach after
//     outer aroundEach after
//     inner afterAll
//   inner aroundAll after
//   outer afterAll
// outer aroundAll after
```

#### Concurrent Tests

When using `test.concurrent` or `sequence.concurrent`:

- Tests within the same file can run in parallel
- Each concurrent test still runs its own `beforeEach` and `afterEach` hooks
- Use test context for concurrent snapshots: `test.concurrent('name', async ({ expect }) => {})`

### 6. Reporting Phase

Throughout the test run, reporters receive lifecycle events and display results.

**What happens:**

- Reporters receive events as tests progress
- Results are collected and formatted
- Test summaries are generated
- Coverage reports are generated (if enabled)

For detailed information about the reporter lifecycle, see the Reporters guide.

### 7. Global Teardown Phase

After all tests complete, global teardown functions execute.

**What happens:**

- `teardown()` functions from `globalSetup` files run
- Multiple teardown functions run in **reverse order** of their setup
- In watch mode, teardown runs before process exit, not between test reruns

**Scope:** Main process

```ts
export function teardown() {
  // Clean up global resources
  console.log('Global teardown complete')
}
```

## Lifecycle in Different Scopes

Understanding where code executes is crucial for avoiding common pitfalls:

| Phase                      | Scope                  | Access to Test Context         | Runs                                |
| -------------------------- | ---------------------- | ------------------------------ | ----------------------------------- |
| Config File                | Main process           | ❌ No                          | Once per Vitest run                 |
| Global Setup               | Main process           | ❌ No (use `provide`/`inject`) | Once per Vitest run                 |
| Setup Files                | Worker (same as tests) | ✅ Yes                         | Before each test file               |
| File-level code            | Worker                 | ✅ Yes                         | Once per test file                  |
| `aroundAll`                | Worker                 | ✅ Yes                         | Once per suite (wraps all tests)    |
| `beforeAll` / `afterAll`   | Worker                 | ✅ Yes                         | Once per suite                      |
| `aroundEach`               | Worker                 | ✅ Yes                         | Per test (wraps each test)          |
| `beforeEach` / `afterEach` | Worker                 | ✅ Yes                         | Per test                            |
| Test function              | Worker                 | ✅ Yes                         | Once (or more with retries/repeats) |
| Global Teardown            | Main process           | ❌ No                          | Once per Vitest run                 |

## Watch Mode Lifecycle

In watch mode, the lifecycle repeats with some differences:

1. **Initial run:** Full lifecycle as described above
2. **On file change:**
   - New test run starts
   - Only affected test files are re-run
   - Setup files run again for those test files
   - Global setup does **not** re-run (use `project.onTestsRerun` for rerun-specific logic)
3. **On exit:**
   - Global teardown executes
   - Process terminates

## Performance Considerations

Understanding the lifecycle helps optimize test performance:

- **Global setup** is ideal for expensive one-time operations (database seeding, server startup)
- **Setup files** run before each test file - avoid heavy operations here if you have many test files
- **`beforeAll`** is better than `beforeEach` for expensive setup that doesn't need isolation
- **Disabling isolation** improves performance, but setup files still execute before each file
- **Pool configuration** affects parallelization and available APIs

For tips on how to improve performance, read the Improving Performance guide.

## Related Documentation

- Global Setup Configuration
- Setup Files Configuration
- Test Sequencing Options
- Isolation Configuration
- Pool Configuration
- Extending Reporters - for reporter lifecycle events
- Test API Reference - for hook APIs
