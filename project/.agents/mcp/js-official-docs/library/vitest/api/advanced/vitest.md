---
title: "Vitest API (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/advanced/vitest.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Vitest

## mode <Deprecated /> {#mode}

Since Vitest 5, this property is always `'test'`.

## config

The root (or global) config. If projects are defined, they will reference this as `globalConfig`.

**Warning:**
This is Vitest config, it doesn't extend _Vite_ config. It only has resolved values from the `test` property.

## vite

This is a global `ViteDevServer`.

## state <Experimental /> {#state}

**Warning:**
Public `state` is an experimental API (except `vitest.state.getReportedEntity`). Breaking changes might not follow SemVer, please pin Vitest's version when using it.

Global state stores information about the current tests. It uses internal serializable Task API by default, but we recommend using the Reported Tasks API instead by calling `state.getReportedEntity()`:

```ts
const task = vitest.state.idMap.get(taskId) // old API
const testCase = vitest.state.getReportedEntity(task) // new API
```

In the future, the old API won't be exposed anymore.

## snapshot

The global snapshot manager. Vitest keeps track of all snapshots using the `snapshot.add` method.

You can get the latest summary of snapshots via the `vitest.snapshot.summary` property.

## cache

Cache manager that stores the results of the previous test runs. Vitest uses it to sort tests in the default sequencer and to select tests with `--last-failed`.

### cache.getTestSpecificationResult <Version type="experimental">5.0.4</Version> {#cache-gettestspecificationresult}

Returns the result of the test file from the previous test runs, or `undefined` if Vitest has no result for it.

```ts
function getTestSpecificationResult(
  specification: TestSpecification
): CachedTestFileResult | undefined

interface CachedTestFileResult {
  /**
   * The file has a known failure.
   * A complete run of the file clears it, or a run in which every known failed test passes.
   */
  failed: boolean
  /**
   * Duration of the last complete run in milliseconds.
   */
  duration: number
  /**
   * Unix timestamp in milliseconds of the start of the last complete run.
   * It is not set if the file never ran completely.
   */
  lastRun?: number
  /**
   * Full names of the tests that failed in the last run of the file.
   * `--last-failed` runs only these tests.
   * It is not set if the failure happened outside of tests, for example in a hook or during collection.
   */
  failedTests?: string[]
}
```

A run is not complete if it was cancelled or if it executed only a part of the file, for example, because of a test name pattern, a line filter or `.only`.

**Warning:**
`vitest.cache.getFileTestResults` and `vitest.cache.getFileStats` are deprecated and will be removed in the next major version. Use `getTestSpecificationResult` instead of `getFileTestResults`. Vitest does not cache file sizes anymore; read the size from the file system if your sequencer needs it.

## watcher <Version>4.0.0</Version> {#watcher}

The instance of a Vitest watcher with useful methods to track file changes and rerun tests. You can use `onFileChange`, `onFileDelete` or `onFileCreate` with your own watcher, if the built-in watcher is disabled.

## projects

An array of test projects that belong to user's projects. If the user did not specify a them, this array will only contain a root project.

Vitest will ensure that there is always at least one project in this array. If the user specifies a non-existent `--project` name, Vitest will throw an error before this array is defined.

## getRootProject

```ts
function getRootProject(): TestProject
```

This returns the root test project. The root project generally doesn't run any tests and is not included in `vitest.projects` unless the user explicitly includes the root config in their configuration, or projects are not defined at all.

The primary goal of the root project is to setup the global config. In fact, `rootProject.config` references `rootProject.globalConfig` and `vitest.config` directly:

```ts
rootProject.config === rootProject.globalConfig === rootProject.vitest.config
```

## provide

```ts
function provide<T extends keyof ProvidedContext & string>(
  key: T,
  value: ProvidedContext[T],
): void
```

Vitest exposes `provide` method which is a shorthand for `vitest.getRootProject().provide`. With this method you can pass down values from the main thread to tests. All values are checked with `structuredClone` before they are stored, but the values themselves are not cloned.

To receive the values in the test, you need to import `inject` method from `vitest` entrypoint:

```ts
import { inject } from 'vitest'
const port = inject('wsPort') // 3000
```

For better type safety, we encourage you to augment the type of `ProvidedContext`:

```ts
import { createVitest } from 'vitest/node'

const vitest = await createVitest('test', {
  watch: false,
})
vitest.provide('wsPort', 3000)

declare module 'vitest' {
  export interface ProvidedContext {
    wsPort: number
  }
}
```

**Warning:**
Technically, `provide` is a method of `TestProject`, so it is limited to the specific project. However, all projects inherit the values from the root project which makes `vitest.provide` universal way of passing down values to tests.

## getProvidedContext

```ts
function getProvidedContext(): ProvidedContext
```

This returns the root context object. This is a shorthand for `vitest.getRootProject().getProvidedContext`.

## getProjectByName

```ts
function getProjectByName(name: string): TestProject
```

This method returns the project by its name. Similar to calling `vitest.projects.find`.

**Warning:**
In case the project doesn't exist, this method will return the root project - make sure to check the names again if the project you are looking for is the one returned.

If user didn't customize a name, the Vitest will assign an empty string as a name.

## globTestSpecifications

```ts
function globTestSpecifications(
  filters?: string[],
): Promise<TestSpecification[]>
```

This method constructs new test specifications by collecting every test in all projects with `project.globTestFiles`. It accepts string filters to match the test files - these are the same filters that CLI supports.

This method automatically caches all test specifications. When you call `getModuleSpecifications` next time, it will return the same specifications unless `clearSpecificationsCache` was called before that.

**Warning:**
As of Vitest 3, it's possible to have multiple test specifications with the same module ID (file path) if `poolMatchGlob` has several pools or if `typecheck` is enabled. This possibility will be removed in Vitest 4.

```ts
const specifications = await vitest.globTestSpecifications(['my-filter'])
// [TestSpecification{ moduleId: '/tests/my-filter.test.ts' }]
console.log(specifications)
```

## getRelevantTestSpecifications

```ts
function getRelevantTestSpecifications(
  filters?: string[]
): Promise<TestSpecification[]>
```

This method resolves every test specification by calling `project.globTestFiles`. It accepts string filters to match the test files - these are the same filters that CLI supports. If `--changed` flag was specified, the list will be filtered to include only files that changed. `getRelevantTestSpecifications` doesn't run any test files.

**Warning:**
This method can be slow because it needs to filter `--changed` flags. Do not use it if you just need a list of test files.

- If you need to get the list of specifications for known test files, use `getModuleSpecifications` instead.
- If you need to get the list of all possible test files, use `globTestSpecifications`.

## mergeReports

```ts
function mergeReports(directory?: string): Promise<TestRunResult>
```

Merge reports from multiple runs located in the specified directory (value from `--merge-reports` if not specified). This value can also be set on `config.mergeReports` (by default, it will read `.vitest/blob/` folder).

Note that the `directory` will always be resolved relative to the working directory.

This method is called automatically by `startVitest` if `config.mergeReports` is set.

## collect

```ts
function collect(
  filters?: string[],
  options?: {
    staticParse?: boolean
    staticParseConcurrency?: number
  }
): Promise<TestRunResult>
```

Based on `staticParse`, this will either statically analyse test files to collect them (the default) or run the code without executing test callbacks. `collect` returns unhandled errors and an array of test modules. It accepts string filters to match the test files - these are the same filters that CLI supports.

This method resolves tests specifications based on the config `include`, `exclude`, and `includeSource` values. Read more at `project.globTestFiles`. If `--changed` flag was specified, the list will be filtered to include only files that changed.

**Warning:**
Note that since Vitest 5, the tests are collected by static analysis by default. If disabled via the second option, Vitest will run every test file in isolation, just like it runs regular tests. This would make this method very slow, unless you disable isolation manually before collecting tests.

## start

```ts
function start(filters?: string[]): Promise<TestRunResult>
```

Initialize reporters, the coverage provider, and run tests. This method accepts string filters to match the test files - these are the same filters that CLI supports.

**Warning:**
This method should not be called if `vitest.standalone()` is also invoked. Use `runTestSpecifications` or `rerunTestSpecifications` instead if you need to run tests after Vitest was initialised.

This method is called automatically by `startVitest` if `config.mergeReports` and `config.standalone` are not set.

## standalone <Version type="experimental">4.1.1</Version> {#standalone}

```ts
function standalone(): Promise<void>
```

- **Alias:** `init` <Deprecated />

Initialize reporters and the coverage provider. This method doesn't run any tests. If the `--watch` flag is provided, Vitest will still run changed tests even if this method was not called.

Internally, this method is called only if `--standalone` flag is enabled.

**Warning:**
This method should not be called if `vitest.start()` is also invoked.

This method is called automatically by `startVitest` if `config.standalone` is set.

## getModuleSpecifications

```ts
function getModuleSpecifications(moduleId: string): TestSpecification[]
```

Returns a list of test specifications related to the module ID. The ID should already be resolved to an absolute file path. If ID doesn't match `include` or `includeSource` patterns, the returned array will be empty.

This method can return already cached specifications based on the `moduleId` and `pool`. But note that `project.createSpecification` always returns a new instance and it's not cached automatically. However, specifications are automatically cached when `runTestSpecifications` is called.

**Warning:**
As of Vitest 3, this method uses a cache to check if the file is a test. To make sure that the cache is not empty, call `globTestSpecifications` at least once.

## clearSpecificationsCache

```ts
function clearSpecificationsCache(moduleId?: string): void
```

Vitest automatically caches test specifications for each file when `globTestSpecifications` or `runTestSpecifications` is called. This method clears the cache for the given file or the whole cache altogether depending on the first argument.

## runTestSpecifications

```ts
function runTestSpecifications(
  specifications: TestSpecification[],
  allTestsRun = false
): Promise<TestRunResult>
```

This method runs every test based on the received specifications. The second argument, `allTestsRun`, is used by the coverage provider to determine if it needs to include uncovered files in report.

**Warning:**
This method doesn't trigger `onWatcherRerun`, `onWatcherStart` and `onTestsRerun` callbacks. If you are rerunning tests based on the file change, consider using `rerunTestSpecifications` instead.

## rerunTestSpecifications

```ts
function rerunTestSpecifications(
  specifications: TestSpecification[],
  allTestsRun = false
): Promise<TestRunResult>
```

This method emits `reporter.onWatcherRerun` and `onTestsRerun` events, then it runs tests with `runTestSpecifications`. If there were no errors in the main process, it will emit `reporter.onWatcherStart` event.

## runTestFiles <Version>4.1.0</Version> {#runtestfiles}

```ts
function runTestFiles(
  filepaths: string[],
  allTestsRun = false
): Promise<TestRunResult>
```

This automatically creates specifications to run based on filepaths filters.

This is different from `start` because it does not create a coverage provider, trigger `onInit` and `onWatcherStart` events, or throw an error if there are no files to run (in this case, the function will return empty arrays without triggering a test run).

This function accepts the same filters as `start` and the CLI.

## updateSnapshot

```ts
function updateSnapshot(files?: string[]): Promise<TestRunResult>
```

Update snapshots in specified files. If no files are provided, it will update files with failed tests and obsolete snapshots.

## collectTests

```ts
function collectTests(
  specifications: TestSpecification[]
): Promise<TestRunResult>
```

Execute test files without running test callbacks. `collectTests` returns unhandled errors and an array of test modules.

This method works exactly the same as `collect`, but you need to provide test specifications yourself.

**Warning:**
Note that Vitest doesn't use static analysis to collect tests. Vitest will run every test file in isolation, just like it runs regular tests.

This makes this method very slow, unless you disable isolation before collecting tests.

## cancelCurrentRun

```ts
function cancelCurrentRun(reason: CancelReason): Promise<void>
```

This method will gracefully cancel all ongoing tests. It will stop the on-going tests and will not run tests that were scheduled to run but haven't started yet.

## setGlobalTestNamePattern

```ts
function setGlobalTestNamePattern(pattern: string | RegExp): void
```

This methods overrides the global test name pattern.

**Warning:**
This method doesn't start running any tests. To run tests with updated pattern, call `runTestSpecifications`.

## getGlobalTestNamePattern <Version>4.0.0</Version> {#getglobaltestnamepattern}

```ts
function getGlobalTestNamePattern(): RegExp | undefined
```

Returns the regexp used for the global test name pattern.

## resetGlobalTestNamePattern

```ts
function resetGlobalTestNamePattern(): void
```

This methods resets the test name pattern. It means Vitest won't skip any tests now.

**Warning:**
This method doesn't start running any tests. To run tests without a pattern, call `runTestSpecifications`.
