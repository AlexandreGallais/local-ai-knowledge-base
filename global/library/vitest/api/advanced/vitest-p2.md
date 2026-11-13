---
title: "Vitest API (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/advanced/vitest.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Vitest API (part 2 of 2)

## enableSnapshotUpdate

```ts
function enableSnapshotUpdate(): void
```

Enable the mode that allows updating snapshots when running tests. Every test that runs after this method is called will update snapshots. To disable the mode, call `resetSnapshotUpdate`.

**Warning:**
This method doesn't start running any tests. To update snapshots, run tests with `runTestSpecifications`.

## resetSnapshotUpdate

```ts
function resetSnapshotUpdate(): void
```

Disable the mode that allows updating snapshots when running tests. This method doesn't start running any tests.

## invalidateFile

```ts
function invalidateFile(filepath: string): void
```

This method invalidates the file in the cache of every project. It is mostly useful if you rely on your own watcher because Vite's cache persist in memory.

**Danger:**
If you disable Vitest's watcher but keep Vitest running, it is important to manually clear the cache with this method because there is no way to disable the cache. This method will also invalidate file's importers.

## import

Import a file using Vite module runner. The file will be transformed by Vite with the global config and executed in a separate context. Note that `moduleId` will be relative to the `config.root`.

**Danger:**
`project.import` reuses Vite's module graph, so importing the same module using a regular import will return a different module:

```ts
import * as staticExample from './example.js'
const dynamicExample = await vitest.import('./example.js')

dynamicExample !== staticExample // ✅
```

**Info:**
Internally, Vitest uses this method to import global setups, custom coverage providers, and custom reporters, meaning all of them share the same module graph as long as they belong to the same Vite server.

## close

```ts
function close(): Promise<void>
```

Closes all projects and their associated resources. This can only be called once; the closing promise is cached until the server restarts.

## exit

```ts
function exit(force = false): Promise<void>
```

Closes all projects and exit the process. If `force` is set to `true`, the process will exit immediately after closing the projects.

This method will also forcefully call `process.exit()` if the process is still active after `config.teardownTimeout` milliseconds.

## shouldKeepServer

```ts
function shouldKeepServer(): boolean
```

This method will return `true` if the server should be kept running after the tests are done. This usually means that the `watch` mode was enabled.

## onServerRestart

```ts
function onServerRestart(fn: OnServerRestartHandler): void
```

Register a handler that will be called when the server is restarted due to a config change.

## onCancel

```ts
function onCancel(fn: (reason: CancelReason) => Awaitable<void>): () => void
```

Register a handler that will be called when the test run is cancelled with `vitest.cancelCurrentRun`.

Since 4.0.10, `onCancel` experimentally returns a teardown function that will remove the listener. Since 4.1.0 this behaviour is considered stable.

## onClose

```ts
function onClose(fn: () => Awaitable<void>): void
```

Register a handler that will be called when the server is closed.

## onTestsRerun

```ts
function onTestsRerun(fn: OnTestsRerunHandler): void
```

Register a handler that will be called when the tests are rerunning. The tests can rerun when `rerunTestSpecifications` is called manually or when a file is changed and the built-in watcher schedules a rerun.

## onFilterWatchedSpecification

```ts
function onFilterWatchedSpecification(
  fn: (specification: TestSpecification) => boolean
): void
```

Register a handler that will be called when a file is changed. This callback should return `true` or `false`, indicating whether the test file needs to be rerun.

With this method, you can hook into the default watcher logic to delay or discard tests that the user doesn't want to keep track of at the moment:

```ts
const continuesTests: string[] = []

myCustomWrapper.onContinuesRunEnabled(testItem =>
  continuesTests.push(item.fsPath)
)

vitest.onFilterWatchedSpecification(specification =>
  continuesTests.includes(specification.moduleId)
)
```

Vitest can create different specifications for the same file depending on the `pool` or `locations` options, so do not rely on the reference. Vitest can also return cached specification from `vitest.getModuleSpecifications` - the cache is based on the `moduleId` and `pool`. Note that `project.createSpecification` always returns a new instance.

## matchesProjectFilter <Version>3.1.0</Version> {#matchesprojectfilter}

```ts
function matchesProjectFilter(name: string): boolean
```

Check if the name matches the current project filter. If there is no project filter, this will always return `true`.

It is not possible to programmatically change the `--project` CLI option.

## waitForTestRunEnd <Version>4.0.0</Version> {#waitfortestrunend}

```ts
function waitForTestRunEnd(): Promise<void>
```

If there is a test run happening, returns a promise that will resolve when the test run is finished.

## createCoverageProvider <Version>4.0.0</Version> {#createcoverageprovider}

```ts
function createCoverageProvider(): Promise<CoverageProvider | null>
```

Creates a coverage provider if `coverage` is enabled in the config. This is done automatically if you are running tests with `start` or `standalone` methods.

**Warning:**
This method will also clean all previous reports if `coverage.clean` is not set to `false`.

## enableCoverage <Version>4.0.0</Version> {#enablecoverage}

```ts
function enableCoverage(): Promise<void>
```

This method enables coverage for tests that run after this call. `enableCoverage` doesn't run any tests; it only sets up Vitest to collect coverage.

It creates a new coverage provider if one doesn't already exist.

## disableCoverage <Version>4.0.0</Version> {#disablecoverage}

```ts
function disableCoverage(): void
```

This method disables coverage collection for tests that run afterwards.

## getSeed <Version>4.0.0</Version> {#getseed}

```ts
function getSeed(): number | null
```

Returns the seed, if tests are running in a random order.

## experimental_parseSpecification <Version type="experimental">4.0.0</Version> <Experimental /> {#parsespecification}

```ts
function experimental_parseSpecification(
  specification: TestSpecification
): Promise<TestModule>
```

This function will collect all tests inside the file without running it. It uses rollup's `parseAst` function on top of Vite's `ssrTransform` to statically analyse the file and collect all tests that it can.

**Warning:**
If Vitest could not analyse the name of the test, it will inject a `dynamic: true` property to the test or a suite. The `id` will also have a postfix with `-dynamic` to not break tests that were collected properly.

Vitest always injects this property in tests with `for` or `each` modifier or tests with a dynamic name (like, `hello ${property}` or `'hello' + ${property}`). Vitest will still assign a name to the test, but it cannot be used to filter tests.

There is nothing Vitest can do to make it possible to filter dynamic tests, but you can turn a test with `for` or `each` modifier into a name pattern with `escapeTestName` function:

```ts
import { escapeTestName } from 'vitest/node'

// turns into /hello, .+?/
const escapedPattern = new RegExp(escapeTestName('hello, %s', true))
```

**Warning:**
Vitest will only collect tests defined in the file. It will never follow imports to other files.

Vitest collects all `it`, `test`, `suite` and `describe` definitions even if they were not imported from the `vitest` entry point.

## parseSpecifications <Version>5.0.0</Version> {#parsespecifications}

```ts
function parseSpecifications(
  specifications: TestSpecification[],
  options?: {
    concurrency?: number
  }
): Promise<TestModule[]>
```

This method will collect tests from an array of specifications. By default, Vitest will run only `os.availableParallelism()` number of specifications at a time to reduce the potential performance degradation. You can specify a different number in a second argument.

## clearCache <Version>5.0.0</Version> {#clearcache}

```ts
function clearCache(): Promise<void>
```

Deletes all Vitest caches, including `fsModuleCache`.

This was available since Vitest 4.0.11 as experimental `experimental_clearCache` method.

## experimental_getSourceModuleDiagnostic <Version type="experimental">4.0.15</Version> <Experimental /> {#getsourcemodulediagnostic}

```ts
export function experimental_getSourceModuleDiagnostic(
  moduleId: string,
  testModule?: TestModule,
): Promise<SourceModuleDiagnostic>
```

::: details Types

```ts
export interface ModuleDefinitionLocation {
  line: number
  column: number
}

export interface SourceModuleLocations {
  modules: ModuleDefinitionDiagnostic[]
  untracked: ModuleDefinitionDiagnostic[]
}

export interface ModuleDefinitionDiagnostic {
  start: ModuleDefinitionLocation
  end: ModuleDefinitionLocation
  startIndex: number
  endIndex: number
  url: string
  resolvedId: string
}

export interface ModuleDefinitionDurationsDiagnostic extends ModuleDefinitionDiagnostic {
  selfTime: number
  totalTime: number
  external?: boolean
}

export interface UntrackedModuleDefinitionDiagnostic {
  url: string
  resolvedId: string
  selfTime: number
  totalTime: number
  external?: boolean
}

export interface SourceModuleDiagnostic {
  modules: ModuleDefinitionDurationsDiagnostic[]
  untrackedModules: UntrackedModuleDefinitionDiagnostic[]
}
```

Returns module's diagnostic. If `testModule` is not provided, `selfTime` and `totalTime` will be aggregated across all tests that were running the last time. If the module was not transformed or executed, the diagnostic will be empty.

**Warning:**
At the moment, the browser modules are not supported.

## createReport <Version>5.0.0</Version> {#createreport}

```ts
function createReport(scope: string): Report
```

Creates a report that is limited to the given scope. `Report` follows Vitest's rules around Storing artifacts on file system.

`Report` provides collection of utilities for writing test results, temporary files and other artifacts on the file system. It's especially intended for third party integrations like custom reporters.

All operations of `Report` are limited to given `scope`. A single report cannot interfere with other reports. Internally Vitest creates `.vitest` directory where each `scope` creates their own directory. This convention of `.vitest` directory reduces the amount of entries end-users need to specify in their `.gitignore`.

```ts
import type { Report } from 'vitest/node'

const scope = 'example-yaml-reporter'

// Automatically creates `<project-root>/.vitest/example-yaml-reporter/`
// directory if it does not exist already
const report: Report = vitest.createReport(scope)
```

### Report.root

```ts
const root: string
```

The root directory for this scope.

```ts
const report = vitest.createReport('my-json-reporter')

// Is <project-root>/.vitest/my-json-reporter
const root = report.root
```

### Report.clean

```ts
function clean(): Promise<void>
```

Clean up the report directory for this scope.

```ts
const report = vitest.createReport('my-json-reporter')

// Removes everything inside <project-root>/.vitest/my-json-reporter/
await report.clean()
```

### Report.writeFile

```ts
function writeFile(
  filename: string,
  content: string | Uint8Array,
  encoding?: BufferEncoding
): Promise<void>
```

Write a file to the report directory for this scope. By default the file will be written with UTF-8 encoding. The filename is relative to the scope directory.

```ts
const report = vitest.createReport('my-json-reporter')

// Writes file to .vitest/my-json-reporter/test-report.json
await report.writeFile('test-report.json', JSON.stringify(results))
```

### Report.readFile

```ts
function readFile(filename: string, encoding?: BufferEncoding): Promise<string>
```

Read a file from the report directory for this scope.

```ts
const report = vitest.createReport('my-json-reporter')

// Reads file from .vitest/my-json-reporter/test-report.json
const content: string = await report.readFile('test-report.json')
```

### Report.readdir

```ts
function readdir(): Promise<string[]>
```

Read contents of the report directory for this scope.

```ts
const report = vitest.createReport('my-json-reporter')

// Reads contents from .vitest/my-json-reporter
const filenames: string[] = await report.readdir()
```

### Report.delete

```ts
function delete(filename: string): Promise<void>
```

Delete a file from the report directory for this scope.

```ts
const report = vitest.createReport('my-json-reporter')

// Deletes file from .vitest/my-json-reporter/test-report.json
await report.delete('test-report.json')
```
