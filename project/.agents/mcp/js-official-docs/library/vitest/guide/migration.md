---
title: "Migration Guide | Guide (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/migration/index.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Migrating to Vitest 5.0 {#vitest-5}

Migrating to Vitest 4.0 | Migrating to Vitest 3.0

  <ChangelogButton href="https://github.com/vitest-dev/vitest/releases/tag/v5.0.0" />
  <CopyPrompt prompt="Migrate to Vitest 5. Fetch the migration guide from https://vitest.dev/guide/migration.md and apply appropriate changes. Do not touch more files than necessary for the migration. If the current version is lower than Vitest 4, apply changes from earlier migration guides first." />

**Prerequisites**
Vitest 5.0 requires Vite >= 6.4.0 and Node.js >= 22.12.0. Before proceeding with any other migration steps, ensure your environment meets these requirements. Running Vitest 5.0 on older versions of Vite or Node.js is not supported and may result in unexpected errors.

## Yarn Users Must Install `vite` Explicitly

`vite` is no longer a direct dependency of `vitest`. It is now a required peer dependency, so the version of Vite used by Vitest is the one installed in your project. npm, pnpm, Bun, and Deno install peer dependencies automatically. Yarn does not, so after the upgrade Vitest cannot resolve `vite` unless it is listed in your `package.json`:

```bash
yarn add -D vite
```

## `clearMocks` is Enabled by Default

`clearMocks` now defaults to `true`: Vitest calls `vi.clearAllMocks()` before every test, clearing the recorded history of every mock while leaving implementations intact.

In practice this means a mock no longer carries calls from one test into the next:

```ts
import { expect, test, vi } from 'vitest'

const fn = vi.fn()

test('first', () => {
  fn()
  expect(fn).toHaveBeenCalledTimes(1)
})

test('second', () => {
  fn()
  // v4: the call from "first" was kept, so this was 2 // [!code --]
  expect(fn).toHaveBeenCalledTimes(2) // [!code --]
  // v5: history is cleared before each test, so only this test's call counts // [!code ++]
  expect(fn).toHaveBeenCalledTimes(1) // [!code ++]
})
```

Tests that record calls outside of the test body (for example in a setup file, at the top level of a module, or in a `beforeAll` hook) are the most affected, because that history is cleared before the test that asserts on it runs.

To keep the previous behavior, set `clearMocks` back to `false`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: false, // [!code ++]
  },
})
```

## `testNamePattern` Matches the `>`-Joined Full Name

`testNamePattern` (the `-t` CLI flag) now matches against the test's full name with the suite chain and test name joined by `' > '`, the same string shown in the reporter output. Previously the segments were joined with a single space, mirroring Jest.

Only patterns that span the boundary between two segments are affected:

```ts
describe('math', () => {
  test('adds', () => {})
})
```

```bash
vitest -t 'math adds' # [!code --]
vitest -t 'math > adds' # [!code ++]
```

To keep a pattern working regardless of the separator, match a single segment (`-t adds`) or use a wildcard between segments (`-t 'math.*adds'`).

## Inline Projects Inherit the Root Config by Default

The `extends` option now defaults to `true`: every project defined as an inline configuration in `test.projects` inherits all options from the root configuration, including Vite options like `plugins` or `resolve.alias`. The options are merged with the same rules that applied to an explicit `extends: true` in Vitest 4:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        // v4: this project didn't apply the react plugin
        // v5: the plugin is inherited from the root config
        test: {
          name: 'unit',
          include: ['**/*.unit.test.ts'],
        },
      },
    ],
  },
})
```

Projects referenced as config files or directories are not affected; they still don't inherit any options from the root config.

Keep in mind that arrays are merged, not overridden: if the root config defines `setupFiles`, the project's own `setupFiles` are appended to the inherited ones. See the projects guide for the merge rules and the few options that are never inherited. If you need the previous behavior, set `extends: false` in the project configuration:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./setup.global.ts'],
    projects: [
      {
        extends: false, // [!code ++]
        test: {
          name: 'unit',
          setupFiles: ['./setup.unit.ts'],
        },
      },
    ],
  },
})
```

## Referenced Config Files Can Define Their Own Projects

A config file referenced in `test.projects` that declares `projects` itself now provides the nested projects it declares (named `app (unit)`, `app (e2e)`, and so on) instead of running tests as a single project.

In Vitest 4 the `projects` field of a referenced config was silently ignored. Check that your project configs don't carry a `projects` field unknowingly. The most common way to do that is merging a config that defines it:

```ts
import { defineProject, mergeConfig } from 'vitest/config'
import rootConfig from '../../vitest.config' // [!code --]
import sharedConfig from '../../vitest.shared' // [!code ++]

export default mergeConfig(
  // the root config defines `test.projects`, so merging it
  // would turn this project into a container for those projects
  rootConfig, // [!code --]
  sharedConfig, // [!code ++]
  defineProject({
    test: {
      environment: 'jsdom',
    },
  }),
)
```

Since the inherited `projects` paths resolve relative to the referenced config, this misconfiguration usually fails loudly at startup with `Projects definition references a non-existing file or a directory`, `No projects were found in "..."`, or a circular `projects` definition error.

Inline configurations continue to ignore the `projects` field at runtime, but it is now also excluded from their `ProjectConfig` type.

## Inline Projects Share the Vite Server by Default

Inline projects that don't modify the Vite config now reuse the Vite server of the config that declares them instead of resolving a new Vite config and creating a new server per project, so shared files are transformed once and tests run faster. This is controlled by the new `sharedViteServer` option, which is enabled by default; its documentation lists the exact options that still give a project its own server.

Note that this _only_ applies to inline projects. Projects referenced as config files or directories always resolve their own Vite config and create their own server, exactly as before.

The observable change: when the server is shared, the declaring config file is executed once instead of once per project, so its plugins are instantiated once and their `config` hooks no longer run for every project. If a plugin relies on being re-instantiated per project, disable the sharing:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    sharedViteServer: false, // [!code ++]
    projects: [
      { test: { name: 'unit' } },
      { test: { name: 'integration' } },
    ],
  },
})
```

## Hoisted Mocking Calls Must Be at the Top Level

`vi.mock`, `vi.unmock`, and `vi.hoisted` are hoisted to the top of the file and run before any surrounding code. Calling them inside a function, block, or `describe`/`test` callback previously only logged a warning. Vitest 5.0 now throws, because the call does not execute where it is written:

```ts
describe('calculator', () => {
  vi.mock('./calculator') // [!code --]
})

vi.mock('./calculator') // [!code ++]

describe('calculator', () => {
  // ...
})
```

The error reports every offending call and its location:

```
1 call in "calculator.test.ts" was defined outside of the module's top level scope:

- vi.mock("./calculator") at calculator.test.ts:2:3

Although it appears nested, it will be hoisted and executed before anything in this file. Move it to the top level to reflect its actual execution order.
```

The dynamic variants `vi.doMock` and `vi.doUnmock` are not hoisted and may still be called anywhere.

## Automocked Modules Stay Automocked in the Browser

In browser mode, the exports of an automocked module (a `vi.mock` call with no factory) incorrectly kept calling the real implementation instead of the auto-generated stubs. If a browser test relied on that, its exports now return `undefined` by default. Pass `{ spy: true }` to keep calling the real implementation while still tracking calls, or provide a factory with the behavior you need.

## Class Mocks Keep Prototype Methods

Instances created from a class mock previously inherited from the mock's own empty `prototype`. Methods defined with the regular class syntax were `undefined` on instances, even inside the constructor, and `instanceof` checks against the implementation class failed. This affected `vi.fn(Dog)`, `vi.spyOn(obj, 'Dog')` with or without a mock implementation, and `.mockImplementation(class ...)`.

The mock's `prototype` is now chained to the implementation's prototype, so instances behave like instances of the implementation class:

```ts
class Dog {
  speak() {
    return 'bark!'
  }
}

const MockedDog = vi.fn(Dog)
const dog = new MockedDog()

typeof dog.speak // was 'undefined', now 'function'
dog instanceof Dog // was false, now true
dog instanceof MockedDog // true, as before

// the chain is visible on the mock itself
Object.getPrototypeOf(MockedDog.prototype) // was Object.prototype, now Dog.prototype
```

Overriding methods on the mock's `prototype` still works and shadows the implementation, and `mockReset` reverts the chain together with the implementation. See Mocking Classes for details.

## Benchmarking API Rewrite

The benchmarking API has been rewritten. `bench` is no longer a top-level import from `vitest`; it is a test-context fixture accessed from inside a regular `test()`. See the Benchmarking guide for the new API.

Removed, with replacements where applicable:

- **`bench(name, fn)` at module scope**: destructure `bench` from the test context instead.

```ts
// v4
import { bench } from 'vitest' // [!code --]

bench('sort', () => { // [!code --]
  [3, 1, 2].sort() // [!code --]
}) // [!code --]

// v5
import { test } from 'vitest' // [!code ++]

test('sort', async ({ bench }) => { // [!code ++]
  await bench('sort', () => { [3, 1, 2].sort() }).run() // [!code ++]
}) // [!code ++]
```

- **`bench.skip`, `bench.only`, `bench.todo`** are removed. Use the regular `test.skip`, `test.only`, `test.todo` on the surrounding `test()` instead.
- **`benchmark.reporters` / `benchmark.outputFile`** are removed. Benchmark output is now part of the default reporter and the `json` reporter; configure those at the top level via `test.reporters` instead.
- **`benchmark.compare` config and the `--compare` CLI flag** are removed. Pass `writeResult` as a per-bench option to persist a result, and read it back with `bench.from()` inside `bench.compare()`.
- **`benchmark.outputJson` config and the `--outputJson` CLI flag** are removed. Use `--reporter=json --outputFile=` to capture benchmark results; the JSON reporter now includes a `benchmarks` field on each test case.
- **`Vitest` instance `mode` property** is now always `'test'`. The previous `'benchmark'` value is no longer used; benchmarks run inside a dedicated project of the same `Vitest` instance.

## Vitest UI Requires an Authenticated URL

Vitest UI now requires token <example-value> for the HTML page and API access. The `/__vitest__/` URL will show an error until the browser is authenticated. To authenticate, open the URL with a token <example-value> by Vitest, as shown below. Once authenticated, the direct `/__vitest__/` URL will work correctly.

```bash
vitest --ui
# UI started at http://localhost:51204/__vitest__/?token=...
```

## Fake Timers and `setSystemTime` Now Mock `Temporal`

Vitest now mocks the `Temporal` API alongside `Date`, following the `@sinonjs/fake-timers` v15.4 update. This only takes effect when `Temporal` is available on the global object, natively or through a globally installed polyfill such as `import 'temporal-polyfill/global'`.

Previously `Temporal.Now` kept returning the real wall-clock time even when `vi.useFakeTimers()` was active. Now it follows the mocked clock:

```ts
vi.useFakeTimers({ now: 0 })

Temporal.Now.instant().epochMilliseconds // 0 (was the real time in v4)
```

The same applies to `vi.setSystemTime()`, which previously mocked only `Date` when used without fake timers:

```ts
vi.setSystemTime(0)
Temporal.Now.instant().epochMilliseconds // 0 (was the real time in v4)
```

`Temporal` is part of the default set of faked APIs, so it is controlled by `fakeTimers.toFake` and `fakeTimers.toNotFake`. To keep `Temporal` native, add it to `toNotFake`:

```ts
vi.useFakeTimers({ toNotFake: ['Temporal'] })
```

## `toThrow("")` Matches Any Error Message

`toThrow` (and its alias `toThrowError`) treats a string argument as a substring of the error message. In Vitest 4 an empty string was special-cased to the `/^$/` pattern, so it matched only an error whose message was empty. It now behaves like any other substring, and an empty string is contained in every message:

```ts
expect(() => { throw new Error('boom') }).not.toThrow('') // [!code --]
expect(() => { throw new Error('boom') }).toThrow('') // [!code ++]
```

To assert that a thrown error has an empty message, match the pattern explicitly:

```ts
expect(() => { throw new Error('boom') }).not.toThrow(/^$/)
```

## Assertion Types Expose Return and Received Types

Assertion interfaces now use two type parameters: `R` is the matcher return type and `T` is the received value type. Synchronous assertions use `void`, while assertions accessed through `.resolves`, `.rejects`, `expect.poll`, or `expect.element` use `Promise<void>`.

If you declare custom matchers, augment the `Matchers<R, T>` interface as shown in Extending Matchers. It adds the matcher to instance assertions, asymmetric matchers, and the type accepted by `expect.extend`, and the matcher's return type reflects how it is used: `void` when called synchronously, `Promise<void>` through `.resolves` or `.rejects`.

Code that refers to assertion types directly must also provide the return type first:

```ts
Assertion<string> // [!code --]
Assertion<void, string> // [!code ++]
Assertion<Promise<void>, string> // asynchronous assertion
```

Vitest no longer reads custom matcher declarations from the global `jest.Matchers` interface. Libraries that support both Jest and Vitest should augment `jest.Matchers` and `vitest.Matchers` separately. This only affects TypeScript declarations; registering matchers with `expect.extend` works as before.
