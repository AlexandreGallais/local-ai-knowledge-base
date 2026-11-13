---
title: "setupFiles | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/setupfiles.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# setupFiles

- **Type:** `string | string[]`

Paths to setup files resolved relative to the `root`. They will run before each _test file_ in the same process. By default, setup files run one after another in the order they are defined, but you can configure it with `sequence.setupFiles` option.

Vitest will ignore any exports from these files.

**Warning:**
Note that setup files are executed in the same process as tests, unlike `globalSetup` that runs once in the main thread before any test worker is created.

**Info:**
Editing a setup file will automatically trigger a rerun of all tests.

If you have a heavy process running in the background, you can use `process.env.VITEST_POOL_ID` (integer-like string) inside to distinguish between workers and spread the workload.

**Warning:**
If isolation is disabled, imported modules are cached, but the setup file itself is executed again before each test file, meaning that you are accessing the same global object before each test file. Make sure you are not doing the same thing more than necessary.

For example, you may rely on a global variable:

```ts
import { config } from '@some-testing-lib'

if (!globalThis.setupInitialized) {
  config.plugins = [myCoolPlugin]
  computeHeavyThing()
  globalThis.setupInitialized = true
}

// hooks reset before each test file
afterEach(() => {
  cleanup()
})

globalThis.resetBeforeEachTest = true
```
