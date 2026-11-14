---
title: "experimental | Config (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/experimental.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# experimental | Config (part 2 of 2)

## experimental.vcsProvider <Version type="experimental">4.1.1</Version> {#experimental-vcsprovider}

- **Type:** `'git' | 'mtime' | VCSProvider | string`

```ts
interface VCSProvider {
  findChangedFiles(options: VCSProviderOptions): Promise<string[]>
}

interface VCSProviderOptions {
  root: string
  changedSince?: string | boolean
  /** Resolves the dependencies of the test files of the run. */
  resolver: ModulesResolver
}

interface ModulesResolver {
  /**
   * Every file whose change can affect the test files of the run.
   */
  getDependencies(): Promise<ModuleDependency[]>
}

interface ModuleDependency {
  /** Absolute path of the file. */
  file: string
  /**
   * Start time of the oldest run that recorded the file, in milliseconds.
   * Not set when the dependency comes from the static module graph.
   */
  recordedAt?: number
}
```

- **Default:** `'git'`

Provider for detecting changed files. Used with the `--changed` flag to determine which files have been modified.

Vitest has two built-in providers:

- `'git'` returns the files that differ from the `--changed` reference, plus staged and untracked files.
- `'mtime'` <Version type="experimental">5.1.0</Version> returns the recorded dependencies whose modification time is newer than the run that recorded them, and deleted dependencies. It needs `experimental.recordDependencies`: a dependency without a record is always reported as changed, so every test runs until the records exist. It does not need Git and ignores the `--changed` reference. A `--changed` run updates the records of the tests it ran, so the next `--changed` run selects only the tests whose dependencies changed since, and the test files that failed in their last run.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    experimental: {
      recordDependencies: true,
      vcsProvider: 'mtime',
    },
  },
})
```

**Warning:**
The `mtime` provider compares file times with the clock of the machine that ran the tests. A checkout or a copy that sets file times in the past is not detected.

You can provide a custom implementation of the `VCSProvider` interface to use a different version control system. `options.resolver.getDependencies()` returns every file the test files of the run depend on, so a provider can limit its work to these files:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    experimental: {
      vcsProvider: {
        async findChangedFiles({ root, changedSince, resolver }) {
          const dependencies = await resolver.getDependencies()
          // return the paths of the changed files
          return []
        },
      },
    },
  },
})
```

You can also pass a string path to a module with a default export that implements the `VCSProvider` interface:

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    experimental: {
      vcsProvider: './my-vcs-provider.js',
    },
  },
})
```

```js
export default {
  async findChangedFiles({ root, changedSince }) {
    // return paths of changed files
    return []
  },
}
```

## experimental.recordDependencies <Version type="experimental">5.1.0</Version> {#experimental-recorddependencies}

- **Type:** `boolean`
- **Default:** `false`

Records every file that a test file loads while it runs and uses these records to select tests for `--changed` and `vitest related`. Without this option, Vitest transforms the module graph of every test file before the run to find the affected tests. With it, Vitest reads the records from the previous run instead, so the selection does not transform anything.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    experimental: {
      recordDependencies: true,
    },
  },
})
```

The records are stored in `dependencies.json` next to the results cache in Vite's `cacheDir`, so this option has no effect if `cache` is disabled. Every `vitest run` with the option enabled updates the records of the test files it ran. A run that skips some tests of a file, for example with `-t` or `.only`, can miss their dynamic imports, so it only adds files to an existing record and never creates one. A test file without a record, for example a new test file or a file that ran in a browser or typecheck pool, always runs.

A record contains:

- the test file and every module it imported, including dynamic imports that ran
- setup files, the custom environment, the custom runner, snapshot serializers and their imports
- mock files from the `__mocks__` folder and modules imported by a mock factory
- files that plugins watch with `this.addWatchFile`
- the snapshot file and every file used by `toMatchFileSnapshot`

A change in a global setup file or its imports, in the config file and its imports, or in an `.env` file runs every test of the project.

Because the records come from a real run, they are exact where the static module graph is not. A module replaced with `vi.mock` and a factory does not load its imports, so they are not recorded. A dynamic import inside a function that the test never calls is not recorded either.

**Warning:**
The records describe the files that a test loaded during its last run. If a change that adds an import is committed before the test runs again, a later change in the newly imported file does not select the test, because the commit is no longer part of the `--changed` diff. Run the tests once after you change imports to update the records.

Vitest records only the files it loads itself. Files read with `fs` (for example, fixtures) and the imports of externalized modules are not recorded.

If `isolate` is disabled, test files that run in the same worker share the module graph. A record can then contain modules that a previous test file loaded dynamically, so `--changed` can select more tests than necessary, but never fewer.

If `experimental.viteModuleRunner` is disabled, Vitest records the imports with a resolve hook of `module.registerHooks`. Node.js versions without it do not write records, so every test runs.

## experimental.traceTimeline <Version type="experimental">5.1.0</Version> {#experimental-tracetimeline}

- **Type:** `boolean`
- **Default:** `false`

Records the `expect.poll`, `vi.waitFor`, and `vi.waitUntil` steps of each test, and prints them as a timeline under the error when the test fails. This shows what the test waited on before it failed and how long each wait took, which helps with flaky tests that wait on servers, queues, or file watchers.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    experimental: {
      traceTimeline: true,
    },
  },
})
```

<<< ./snippets/trace-timeline-failure.ansi [Error report]

Steps are reported only for failed attempts, so the option adds almost no overhead to passing tests.

Step locations are resolved like error stacks, so a step in a helper file points at that file, and a step in a `vi.defineHelper` helper points at the line that called the helper.

The `message` option of `expect.poll`, `vi.waitFor`, and `vi.waitUntil` names the step, as with `user saved (vi.waitUntil)` in the report above.

This option has no effect in browser mode, which prints the same timeline with `browser.traceView`.

**Warning:**
`vi.waitFor`, `vi.waitUntil`, and polls from the global `expect` are attributed to the test that is currently running. When several tests run at the same time with `test.concurrent`, `vi.waitFor` and `vi.waitUntil` are not recorded, and polls from the global `expect` can appear in another test's timeline. Use `expect` from the test context in concurrent tests to record polls for the right test.

## experimental.nodeLoader <Version type="experimental">4.1.0</Version> {#experimental-nodeloader}

- **Type:** `boolean`
- **Default:** `true`

If module runner is disabled, Vitest uses a native Node.js module loader to transform files to support `import.meta.vitest`, `vi.mock` and `vi.hoisted`.

If you don't use these features, you can disable this to improve performance.

## experimental.preParse <Version type="experimental">4.1.3</Version> {#experimental-preparse}

- **Type:** `boolean`
- **Default:** `false`

Parses test specifications before running them. This applies the `.only` modifier, the `-t` test name pattern, `--tags-filter`, test lines, and test IDs across all files without executing them. For example, if only a single test is marked with `.only`, Vitest will skip all other tests in all files.

**Tip:**
This option is recommended when using `.only`, the `-t` flag, or `--tags-filter`.

Enabling it unconditionally may slow down your test runs due to the additional parsing step.

**Warning:**
Pre-parsing uses static analysis (AST parsing) instead of executing your test files. This means that test names, tags, and modifiers (`.only`, `.skip`, `.todo`) must be statically analyzable. Dynamic test names (e.g., names stored in variables or returned from function calls) and non-literal tags will not be resolved correctly.

```ts
// ✅ works — static string literal
test('adds numbers', () => {})

// ✅ works — static tags
test('my test', { tags: ['unit'] }, () => {})

// ❌ won't match correctly — dynamic name
const name = getName()
test(name, () => {})

// ❌ won't match correctly — dynamic tags
const tags = getTags()
test('my test', { tags }, () => {})
```

## experimental.diagnostics <Version type="experimental">5.0.0</Version> {#experimental-diagnostics}

- **Type:**

```ts
interface DiagnosticsOptions {
  /**
   * Hint when `isolate: true` spends a significant amount of time spawning
   * a fresh worker (and re-creating the environment) for every test file,
   * estimating how much `isolate: false` could save.
   * @default true
   */
  isolate?: boolean
  /**
   * Hint when re-creating a DOM environment for every test file dominates
   * the run and a `vm` pool would set it up once per worker.
   * @default true
   */
  environment?: boolean
  /**
   * Hint when test files repeatedly evaluate the same module graph
   * (typical for barrel-file imports) and `isolate: false` would
   * evaluate it once per worker.
   * @default true
   */
  import?: boolean
  /**
   * Hint when transforming modules dominates the run and
   * `fsModuleCache` would persist the results across runs.
   * @default true
   */
  transform?: boolean
}
```

- **Default:** `true`

Print performance hints after the run when the collected timings show that a configuration change would make the run significantly faster:

```
Environment  jsdom was created 40 times · 23.80s total, 79% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

Hints never suggest changing an option that was set explicitly: if the config defines `pool`, other pools are not suggested, and an explicitly configured `isolate` is never suggested to be disabled. Hints are also printed in CI. Set the option to `false` to disable all hints, or disable them individually.

To measure the impact of a configuration change instead of estimating it, run `vitest doctor`.

### experimental.diagnostics.isolate {#experimental-diagnostics-isolate}

- **Type:** `boolean`
- **Default:** `true`

Hint when `isolate: true` spends a significant amount of time spawning a fresh worker (and re-creating the environment) for every test file, estimating how much `isolate: false` could save. Reused workers also keep evaluated modules alive, so files stop re-evaluating the module graph they share. Per-module evaluation times are only collected when `experimental.importDurations` is enabled; without it the estimate counts the worker startups alone and is reported as a lower bound ("at least").

### experimental.diagnostics.environment {#experimental-diagnostics-environment}

- **Type:** `boolean`
- **Default:** `true`

Hint when re-creating a DOM environment for every test file dominates the run and a `vm` pool would set it up once per worker.

### experimental.diagnostics.import {#experimental-diagnostics-import}

- **Type:** `boolean`
- **Default:** `true`

Hint when test files repeatedly evaluate the same module graph and `isolate: false` would evaluate it once per worker. This is typical for barrel-file imports: every test file imports a few symbols through an index file and evaluates the whole graph behind it. The duplication is measured from how often each module was served to the workers, so suites whose test files import mostly disjoint modules stay quiet: reusing workers would not reduce their import work.

```
Import  837 modules were evaluated 16740 times · 15.69s total, 64% of tracked time
        ~850ms faster with isolate: false — shared modules are evaluated once per worker instead of once per file
        learn more: https://vitest.dev/guide/improving-performance#test-isolation
```

### experimental.diagnostics.transform {#experimental-diagnostics-transform}

- **Type:** `boolean`
- **Default:** `true`

Hint when transforming modules dominates the run. Without a persistent cache every `vitest run` transforms the whole module graph from scratch; `fsModuleCache` stores the results on disk so repeated runs skip them. The hint estimates the time the next run would save. On CI the hint includes a note that the cache directory must be persisted between runs for the cache to take effect.
