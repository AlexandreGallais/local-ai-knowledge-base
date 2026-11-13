---
title: "cli-generated (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/cli-generated.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# cli-generated (part 2 of 2)

### sequence.concurrent

- **CLI:** `--sequence.concurrent`
- **Config:** sequence.concurrent

Make tests run in parallel (default: `false`)

### sequence.seed

- **CLI:** `--sequence.seed <seed>`
- **Config:** sequence.seed

Set the randomization seed. This option will have no effect if `--sequence.shuffle` is falsy. Visit "Random Seed" page for more information

### sequence.hooks

- **CLI:** `--sequence.hooks <order>`
- **Config:** sequence.hooks

Changes the order in which hooks are executed. Accepted values are: "stack", "list" and "parallel". Visit `sequence.hooks` for more information (default: `"stack"`)

### sequence.setupFiles

- **CLI:** `--sequence.setupFiles <order>`
- **Config:** sequence.setupFiles

Changes the order in which setup files are executed. Accepted values are: "list" and "parallel". If set to "list", will run setup files in the order they are defined. If set to "parallel", will run setup files in parallel (default: `"list"`)

### inspect

- **CLI:** `--inspect [[host:]port]`

Enable Node.js inspector (default: `127.0.0.1:9229`)

### inspectBrk

- **CLI:** `--inspectBrk [[host:]port]`

Enable Node.js inspector and break before the test starts

### testTimeout

- **CLI:** `--testTimeout <timeout>`
- **Config:** testTimeout

Default timeout of a test in milliseconds (default: `5000`). Use `0` to disable timeout completely.

### hookTimeout

- **CLI:** `--hookTimeout <timeout>`
- **Config:** hookTimeout

Default hook timeout in milliseconds (default: `10000`). Use `0` to disable timeout completely.

### bail

- **CLI:** `--bail <number>`
- **Config:** bail

Stop test execution when given number of tests have failed (default: `0`)

### retry.count

- **CLI:** `--retry.count <times>`
- **Config:** retry.count

Number of times to retry a test if it fails (default: `0`)

### retry.delay

- **CLI:** `--retry.delay <ms>`
- **Config:** retry.delay

Delay in milliseconds between retry attempts (default: `0`)

### retry.condition

- **CLI:** `--retry.condition <pattern>`
- **Config:** retry.condition

Regex pattern to match error messages that should trigger a retry. Only errors matching this pattern will cause a retry (default: retry on all errors)

### repeats

- **CLI:** `--repeats <number>`
- **Config:** repeats

Repeat every test a specific number of times regardless of the result (default: `0`)

### diff.aAnnotation

- **CLI:** `--diff.aAnnotation <annotation>`
- **Config:** diff.aAnnotation

Annotation for expected lines (default: `Expected`)

### diff.aIndicator

- **CLI:** `--diff.aIndicator <indicator>`
- **Config:** diff.aIndicator

Indicator for expected lines (default: `-`)

### diff.bAnnotation

- **CLI:** `--diff.bAnnotation <annotation>`
- **Config:** diff.bAnnotation

Annotation for received lines (default: `Received`)

### diff.bIndicator

- **CLI:** `--diff.bIndicator <indicator>`
- **Config:** diff.bIndicator

Indicator for received lines (default: `+`)

### diff.commonIndicator

- **CLI:** `--diff.commonIndicator <indicator>`
- **Config:** diff.commonIndicator

Indicator for common lines (default: ` `)

### diff.contextLines

- **CLI:** `--diff.contextLines <lines>`
- **Config:** diff.contextLines

Number of lines of context to show around each change (default: `5`)

### diff.emptyFirstOrLastLinePlaceholder

- **CLI:** `--diff.emptyFirstOrLastLinePlaceholder <placeholder>`
- **Config:** diff.emptyFirstOrLastLinePlaceholder

Placeholder for an empty first or last line (default: `""`)

### diff.expand

- **CLI:** `--diff.expand`
- **Config:** diff.expand

Expand all common lines (default: `false`)

### diff.includeChangeCounts

- **CLI:** `--diff.includeChangeCounts`
- **Config:** diff.includeChangeCounts

Include comparison counts in diff output (default: `false`)

### diff.omitAnnotationLines

- **CLI:** `--diff.omitAnnotationLines`
- **Config:** diff.omitAnnotationLines

Omit annotation lines from the output (default: `false`)

### diff.printBasicPrototype

- **CLI:** `--diff.printBasicPrototype`
- **Config:** diff.printBasicPrototype

Print basic <example-value> Object and Array (default: `false`)

### diff.maxDepth

- **CLI:** `--diff.maxDepth <maxDepth>`
- **Config:** diff.maxDepth

Limit the depth to recurse when printing nested objects (default: `20`)

### diff.truncateThreshold

- **CLI:** `--diff.truncateThreshold <threshold>`
- **Config:** diff.truncateThreshold

Number of lines to show before and after each change (default: `0`)

### diff.truncateAnnotation

- **CLI:** `--diff.truncateAnnotation <annotation>`
- **Config:** diff.truncateAnnotation

Annotation for truncated lines (default: `... Diff result is truncated`)

### exclude

- **CLI:** `--exclude <glob>`
- **Config:** exclude

Additional file globs to be excluded from test

### expandSnapshotDiff

- **CLI:** `--expandSnapshotDiff`
- **Config:** expandSnapshotDiff

Show full diff when snapshot fails

### disableConsoleIntercept

- **CLI:** `--disableConsoleIntercept`
- **Config:** disableConsoleIntercept

Disable automatic interception of console logging (default: `false`)

### typecheck.enabled

- **CLI:** `--typecheck.enabled`
- **Config:** typecheck.enabled

Enable typechecking alongside tests (default: `false`)

### typecheck.only

- **CLI:** `--typecheck.only`
- **Config:** typecheck.only

Run only typecheck tests. This automatically enables typecheck (default: `false`)

### typecheck.checker

- **CLI:** `--typecheck.checker <name>`
- **Config:** typecheck.checker

Specify the typechecker to use. Available values are: "tsc" and "vue-tsc" and a path to an executable (default: `"tsc"`)

### typecheck.allowJs

- **CLI:** `--typecheck.allowJs`
- **Config:** typecheck.allowJs

Allow JavaScript files to be typechecked. By default takes the value from tsconfig.json

### typecheck.ignoreSourceErrors

- **CLI:** `--typecheck.ignoreSourceErrors`
- **Config:** typecheck.ignoreSourceErrors

Ignore type errors from source files

### typecheck.build

- **CLI:** `--typecheck.build`
- **Config:** typecheck.build

Use TypeScript build mode

### typecheck.tsconfig

- **CLI:** `--typecheck.tsconfig `
- **Config:** typecheck.tsconfig

Path to a custom tsconfig file

### typecheck.spawnTimeout

- **CLI:** `--typecheck.spawnTimeout <time>`
- **Config:** typecheck.spawnTimeout

Minimum time in milliseconds it takes to spawn the typechecker

### project

- **CLI:** `-p, --project <name>`

The name of the project to run if you are using Vitest workspace feature. This can be repeated for multiple projects: `--project=1 --project=2`. You can also filter projects using wildcards like `--project=packages*`, and exclude projects with `--project=!pattern`. A project runs if it matches no negated pattern and, when regular patterns are also given, matches at least one of them.

### slowTestThreshold

- **CLI:** `--slowTestThreshold <threshold>`
- **Config:** slowTestThreshold

Threshold in milliseconds for a test or suite to be considered slow (default: `300`)

### teardownTimeout

- **CLI:** `--teardownTimeout <timeout>`
- **Config:** teardownTimeout

Default timeout of a teardown function in milliseconds (default: `10000`)

### cache

- **CLI:** `--cache`
- **Config:** cache

Store the results of test runs to run failed and longer test files first (default: `true`)

### maxConcurrency

- **CLI:** `--maxConcurrency <number>`
- **Config:** maxConcurrency

Maximum number of concurrent tests and suites during test file execution (default: `5`)

### fsModuleCache

- **CLI:** `--fsModuleCache`
- **Config:** fsModuleCache

Cache transformed modules on the file system and reuse them between reruns (default: `true`)

### fsModuleCachePath

- **CLI:** `--fsModuleCachePath `
- **Config:** fsModuleCachePath

Directory where the `fsModuleCache` is stored (default: `node_modules/.vitest-cache`)

### expect.requireAssertions

- **CLI:** `--expect.requireAssertions`
- **Config:** expect.requireAssertions

Require that all tests have at least one assertion

### expect.poll.interval

- **CLI:** `--expect.poll.interval <interval>`
- **Config:** expect.poll.interval

Poll interval in milliseconds for `expect.poll()` assertions (default: `50`)

### expect.poll.timeout

- **CLI:** `--expect.poll.timeout <timeout>`
- **Config:** expect.poll.timeout

Poll timeout in milliseconds for `expect.poll()` assertions (default: `1000`)

### printConsoleTrace

- **CLI:** `--printConsoleTrace`
- **Config:** printConsoleTrace

Always print console stack traces

### includeTaskLocation

- **CLI:** `--includeTaskLocation`
- **Config:** includeTaskLocation

Collect test and suite locations in the `location` property

### attachmentsDir

- **CLI:** `--attachmentsDir <dir>`
- **Config:** attachmentsDir

The directory where attachments from `context.annotate` are stored in (default: `.vitest/attachments`)

### run

- **CLI:** `--run`

Disable watch mode

### color

- **CLI:** `--no-color`

Removes colors from the console output

### clearScreen

- **CLI:** `--clearScreen`

Clear terminal screen when re-running tests during watch mode (default: `true`)

### configLoader

- **CLI:** `--configLoader <loader>`

Use `bundle` to bundle the config with esbuild or `runner` (experimental) to process it on the fly. This is only available in vite version 6.1.0 and above. (default: `bundle`)

### standalone

- **CLI:** `--standalone`

Start Vitest without running tests. Tests will be running only on change. If browser mode is enabled, the UI will be opened automatically. This option is ignored when CLI file filters are passed. (default: `false`)

### listTags

- **CLI:** `--listTags [type]`

List all available tags instead of running tests. `--list-tags=json` will output tags in JSON format, unless there are no tags.

### clearCache

- **CLI:** `--clearCache`

Delete all Vitest caches, including the `fsModuleCache`, without running any tests. This will reduce the performance in the subsequent test run.

### tagsFilter

- **CLI:** `--tagsFilter <expression>`

Run only tests with the specified tags. You can use logical operators `&&` (and), `||` (or) and `!` (not) to create complex expressions, see Test Tags for more information.

### strictTags

- **CLI:** `--strictTags`
- **Config:** strictTags

Should Vitest throw an error if test has a tag that is not defined in the config. (default: `true`)

### sharedViteServer

- **CLI:** `--sharedViteServer`
- **Config:** sharedViteServer

Let inline projects that don't modify the Vite config reuse the Vite server of the config that declares them. (default: `true`)

### experimental.importDurations.print

- **CLI:** `--experimental.importDurations.print <boolean|on-warn>`
- **Config:** experimental.importDurations.print

When to print import breakdown to CLI terminal. Use `true` to always print, `false` to never print, or `on-warn` to print only when imports exceed the warn threshold (default: false).

### experimental.importDurations.limit

- **CLI:** `--experimental.importDurations.limit <number>`
- **Config:** experimental.importDurations.limit

Maximum number of imports to collect and display (default: 0, or 10 if print or UI is enabled).

### experimental.importDurations.failOnDanger

- **CLI:** `--experimental.importDurations.failOnDanger`
- **Config:** experimental.importDurations.failOnDanger

Fail the test run if any import exceeds the danger threshold (default: false).

### experimental.importDurations.thresholds.warn

- **CLI:** `--experimental.importDurations.thresholds.warn <number>`
- **Config:** experimental.importDurations.thresholds.warn

Warning threshold - imports exceeding this are shown in yellow/orange (default: 100).

### experimental.importDurations.thresholds.danger

- **CLI:** `--experimental.importDurations.thresholds.danger <number>`
- **Config:** experimental.importDurations.thresholds.danger

Danger threshold - imports exceeding this are shown in red (default: 500).

### experimental.viteModuleRunner

- **CLI:** `--experimental.viteModuleRunner`
- **Config:** experimental.viteModuleRunner

Control whether Vitest uses Vite's module runner to run the code or fallback to the native `import`. (default: `true`)

### experimental.nodeLoader

- **CLI:** `--experimental.nodeLoader`
- **Config:** experimental.nodeLoader

Controls whether Vitest will use Node.js Loader API to process in-source or mocked files. This has no effect if `viteModuleRunner` is enabled. Disabling this can increase performance. (default: `true`)

### experimental.traceTimeline

- **CLI:** `--experimental.traceTimeline`
- **Config:** experimental.traceTimeline

Record `expect.poll`, `vi.waitFor`, and `vi.waitUntil` steps of each test and print them as a timeline when the test fails. This has no effect in browser mode. (default: `false`)

### experimental.vcsProvider

- **CLI:** `--experimental.vcsProvider `
- **Config:** experimental.vcsProvider

Provider for detecting changed files: `git`, `mtime` (requires `experimental.recordDependencies`) or a path to a custom provider. (default: `git`)

### experimental.recordDependencies

- **CLI:** `--experimental.recordDependencies`
- **Config:** experimental.recordDependencies

Record the modules loaded by every test file in the cache and use the records with `--changed` and `--related` instead of the static module graph. A test file without a record always runs. (default: `false`)

### experimental.preParse

- **CLI:** `--experimental.preParse`
- **Config:** experimental.preParse

Parse test specifications before running them. This will apply `.only` flag and test name pattern across all files without running them. (default: `false`)

### experimental.diagnostics.isolate

- **CLI:** `--experimental.diagnostics.isolate`
- **Config:** experimental.diagnostics.isolate

Print a hint estimating how much time `isolate: false` would save when `isolate: true` spends a significant amount of time spawning a worker per test file. (default: `true`)

### experimental.diagnostics.environment

- **CLI:** `--experimental.diagnostics.environment`
- **Config:** experimental.diagnostics.environment

Print a hint when re-creating a DOM environment for every test file dominates the run and a `vm` pool would set it up once per worker. (default: `true`)

### experimental.diagnostics.import

- **CLI:** `--experimental.diagnostics.import`
- **Config:** experimental.diagnostics.import

Print a hint when test files repeatedly evaluate the same module graph (typical for barrel-file imports) and `isolate: false` would evaluate it once per worker. (default: `true`)

### experimental.diagnostics.transform

- **CLI:** `--experimental.diagnostics.transform`
- **Config:** experimental.diagnostics.transform

Print a hint when transforming modules dominates the run and `fsModuleCache` would persist the results across runs. (default: `true`)
