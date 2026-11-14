---
title: "cli-generated (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/cli-generated.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# cli-generated

### root

- **CLI:** `-r, --root `
- **Config:** root

Root path

### config

- **CLI:** `-c, --config `

Path to config file

### update

- **CLI:** `-u, --update [type]`
- **Config:** update

Update snapshot (accepts boolean, "new", "all" or "none")

### watch

- **CLI:** `-w, --watch`
- **Config:** watch

Enable watch mode

### testNamePattern

- **CLI:** `-t, --testNamePattern <pattern>`
- **Config:** testNamePattern

Run tests with full names matching the specified regexp pattern

### dir

- **CLI:** `--dir `
- **Config:** dir

Base directory to scan for the test files

### ui

- **CLI:** `--ui`

Enable UI

### open

- **CLI:** `--open`
- **Config:** open

Open UI automatically (default: `!process.env.CI`)

### api.port

- **CLI:** `--api.port [port]`

Specify server port. Note if the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on. If true will be set to `51204`

### api.host

- **CLI:** `--api.host [host]`

Specify which IP addresses the server should listen on. Set this to `0.0.0.0` or `true` to listen on all addresses, including LAN and public addresses

### api.strictPort

- **CLI:** `--api.strictPort`

Set to true to exit if port is already in use, instead of automatically trying the next available port

### api.allowExec

- **CLI:** `--api.allowExec`
- **Config:** api.allowExec

Allow API to execute code. (Be careful when enabling this option in untrusted environments)

### api.allowWrite

- **CLI:** `--api.allowWrite`
- **Config:** api.allowWrite

Allow API to edit files. (Be careful when enabling this option in untrusted environments)

### silent

- **CLI:** `--silent [value]`
- **Config:** silent

Silent console output from tests. Use `'passed-only'` to see logs from failing tests only.

### hideSkippedTests

- **CLI:** `--hideSkippedTests`

Hide logs for skipped tests

### reporters

- **CLI:** `--reporter <name>`
- **Config:** reporters

Specify reporters (default, agent, minimal, blob, verbose, dot, json, tap, tap-flat, junit, tree, hanging-process, github-actions)

### outputFile

- **CLI:** `--outputFile <filename/-s>`
- **Config:** outputFile

Write test results to a file when supporter reporter is also specified, use cac's dot notation for individual outputs of multiple reporters (example: `--outputFile.tap=./tap.txt`)

### coverage.provider

- **CLI:** `--coverage.provider <name>`
- **Config:** coverage.provider

Select the tool for coverage collection, available values are: "v8", "istanbul" and "custom"

### coverage.enabled

- **CLI:** `--coverage.enabled`
- **Config:** coverage.enabled

Enables coverage collection. Can be overridden using the `--coverage` CLI option (default: `false`)

### coverage.include

- **CLI:** `--coverage.include <pattern>`
- **Config:** coverage.include

Files included in coverage as glob patterns. May be specified more than once when using multiple patterns. By default only files covered by tests are included.

### coverage.exclude

- **CLI:** `--coverage.exclude <pattern>`
- **Config:** coverage.exclude

Files to be excluded in coverage. May be specified more than once when using multiple extensions.

### coverage.clean

- **CLI:** `--coverage.clean`
- **Config:** coverage.clean

Clean coverage results before running tests (default: true)

### coverage.cleanOnRerun

- **CLI:** `--coverage.cleanOnRerun`
- **Config:** coverage.cleanOnRerun

Clean coverage report on watch rerun (default: true)

### coverage.reportsDirectory

- **CLI:** `--coverage.reportsDirectory `
- **Config:** coverage.reportsDirectory

Directory to write coverage report to (default: ./coverage)

### coverage.reporter

- **CLI:** `--coverage.reporter <name>`
- **Config:** coverage.reporter

Coverage reporters to use. Visit `coverage.reporter` for more information (default: `["text", "html", "clover", "json"]`)

### coverage.reportOnFailure

- **CLI:** `--coverage.reportOnFailure`
- **Config:** coverage.reportOnFailure

Generate coverage report even when tests fail (default: `false`)

### coverage.allowExternal

- **CLI:** `--coverage.allowExternal`
- **Config:** coverage.allowExternal

Collect coverage of files outside the project root (default: `false`)

### coverage.skipFull

- **CLI:** `--coverage.skipFull`
- **Config:** coverage.skipFull

Do not show files with 100% statement, branch, and function coverage (default: `false`)

### coverage.thresholds.100

- **CLI:** `--coverage.thresholds.100`
- **Config:** coverage.thresholds.100

Shortcut to set all coverage thresholds to 100 (default: `false`)

### coverage.thresholds.perFile

- **CLI:** `--coverage.thresholds.perFile <boolean>`
- **Config:** coverage.thresholds.perFile

Check thresholds per file. See `--coverage.thresholds.lines`, `--coverage.thresholds.functions`, `--coverage.thresholds.branches` and `--coverage.thresholds.statements` for the actual thresholds (default: `false`). Object form is available in config files only.

### coverage.thresholds.autoUpdate

- **CLI:** `--coverage.thresholds.autoUpdate <boolean|function>`
- **Config:** coverage.thresholds.autoUpdate

Update threshold values: "lines", "functions", "branches" and "statements" to configuration file when current coverage is above the configured thresholds (default: `false`)

### coverage.thresholds.lines

- **CLI:** `--coverage.thresholds.lines <number>`

Threshold for lines. Visit istanbuljs for more information. This option is not available for custom providers

### coverage.thresholds.functions

- **CLI:** `--coverage.thresholds.functions <number>`

Threshold for functions. Visit istanbuljs for more information. This option is not available for custom providers

### coverage.thresholds.branches

- **CLI:** `--coverage.thresholds.branches <number>`

Threshold for branches. Visit istanbuljs for more information. This option is not available for custom providers

### coverage.thresholds.statements

- **CLI:** `--coverage.thresholds.statements <number>`

Threshold for statements. Visit istanbuljs for more information. This option is not available for custom providers

### coverage.ignoreClassMethods

- **CLI:** `--coverage.ignoreClassMethods <name>`
- **Config:** coverage.ignoreClassMethods

Array of class method names to ignore for coverage. Visit istanbuljs for more information. This option is only available for the istanbul providers (default: `[]`)

### coverage.processingConcurrency

- **CLI:** `--coverage.processingConcurrency <number>`
- **Config:** coverage.processingConcurrency

Concurrency limit used when processing the coverage results. (default min between 20 and the number of CPUs)

### coverage.customProviderModule

- **CLI:** `--coverage.customProviderModule `
- **Config:** coverage.customProviderModule

Specifies the module name or path for the custom coverage provider module. Visit Custom Coverage Provider for more information. This option is only available for custom providers

### coverage.watermarks.statements

- **CLI:** `--coverage.watermarks.statements <watermarks>`

High and low watermarks for statements in the format of `<high>,<low>`

### coverage.watermarks.lines

- **CLI:** `--coverage.watermarks.lines <watermarks>`

High and low watermarks for lines in the format of `<high>,<low>`

### coverage.watermarks.branches

- **CLI:** `--coverage.watermarks.branches <watermarks>`

High and low watermarks for branches in the format of `<high>,<low>`

### coverage.watermarks.functions

- **CLI:** `--coverage.watermarks.functions <watermarks>`

High and low watermarks for functions in the format of `<high>,<low>`

### coverage.changed

- **CLI:** `--coverage.changed <commit/branch>`
- **Config:** coverage.changed

Collect coverage only for files changed since a specified commit or branch (e.g., `origin/main` or `HEAD~1`). Inherits value from `--changed` by default.

### coverage.excludeAfterRemap

- **CLI:** `--coverage.excludeAfterRemap`
- **Config:** coverage.excludeAfterRemap

Apply exclusions again after coverage has been remapped to original sources. (default: false)

### coverage.htmlDir

- **CLI:** `--coverage.htmlDir `
- **Config:** coverage.htmlDir

Directory of HTML coverage output to be served in UI mode and HTML reporter.

### coverage.autoAttachSubprocess

- **CLI:** `--coverage.autoAttachSubprocess`
- **Config:** coverage.autoAttachSubprocess

Track coverage of the `node:child_process` and `node:worker_threads` spawned during test run. Supported only by `v8` provider. (default: false)

### mode

- **CLI:** `--mode <name>`
- **Config:** mode

Override Vite mode (default: `test`)

### isolate

- **CLI:** `--isolate`
- **Config:** isolate

Run every test file in isolation. To disable isolation, use `--no-isolate` (default: `true`)

### globals

- **CLI:** `--globals`
- **Config:** globals

Inject apis globally

### injectCjsGlobals

- **CLI:** `--injectCjsGlobals`
- **Config:** injectCjsGlobals

Inject CommonJS variables (`module`, `exports`, `require`, `__filename`, `__dirname`) into every test module. To disable, use `--no-inject-cjs-globals` (default: `true`)

### dom

- **CLI:** `--dom`

Mock browser API with happy-dom

### browser.enabled

- **CLI:** `--browser.enabled`
- **Config:** browser.enabled

Run tests in the browser. Equivalent to `--browser.enabled` (default: `false`)

### browser.name

- **CLI:** `--browser.name <name>`

Run all tests in a specific browser. Some browsers are only available for specific providers (see `--browser.provider`).

### browser.headless

- **CLI:** `--browser.headless`
- **Config:** browser.headless

Run the browser in headless mode (i.e. without opening the GUI (Graphical User Interface)). If you are running Vitest in CI, it will be enabled by default (default: `process.env.CI`)

### browser.ui

- **CLI:** `--browser.ui`
- **Config:** browser.ui

Show Vitest UI when running tests (default: `!process.env.CI`)

### browser.detailsPanelPosition

- **CLI:** `--browser.detailsPanelPosition <position>`
- **Config:** browser.detailsPanelPosition

Default position for the details panel in browser mode. Either `right` (horizontal split) or `bottom` (vertical split) (default: `right`)

### browser.connectTimeout

- **CLI:** `--browser.connectTimeout <timeout>`
- **Config:** browser.connectTimeout

If connection to the browser takes longer, the test suite will fail (default: `60_000`)

### browser.dependencySourcemaps

- **CLI:** `--browser.dependencySourcemaps`
- **Config:** browser.dependencySourcemaps

Serve sourcemaps of dependencies to the browser in headless runs, used by devtools when debugging into `node_modules`. Reported test errors are source-mapped either way. Use `--browser.dependencySourcemaps=false` to speed up test runs if you don't step into dependency code (default: `true`)

### browser.trackUnhandledErrors

- **CLI:** `--browser.trackUnhandledErrors`
- **Config:** browser.trackUnhandledErrors

Control if Vitest catches uncaught exceptions so they can be reported (default: `true`)

### browser.importMapMocks

- **CLI:** `--browser.importMapMocks`
- **Config:** browser.importMapMocks

Serve module mocks through an import map instead of request interception. By default, enabled when the browser supports it

### browser.trace

- **CLI:** `--browser.trace <mode>`
- **Config:** browser.trace

Enable trace view mode. Supported: "on", "off", "on-first-retry", "on-all-retries", "retain-on-failure".

### browser.traceView.enabled

- **CLI:** `--browser.traceView.enabled`
- **Config:** browser.traceView.enabled

Deprecated, use `--browser.traceView.mode` instead. `true` is the same as `--browser.traceView.mode=on`

### browser.traceView.mode

- **CLI:** `--browser.traceView.mode <mode>`
- **Config:** browser.traceView.mode

How trace view records tests. Supported: "on" (every test), "failure-only" (only failed tests), "off" (default: `"failure-only"`)

### browser.traceView.recordCanvas

- **CLI:** `--browser.traceView.recordCanvas`
- **Config:** browser.traceView.recordCanvas

Capture canvas pixels in trace-view snapshots (default: `false`)

### browser.traceView.inlineImages

- **CLI:** `--browser.traceView.inlineImages`
- **Config:** browser.traceView.inlineImages

Inline loaded image pixels in trace-view snapshots (default: `false`)

### browser.traceView.ariaSnapshot

- **CLI:** `--browser.traceView.ariaSnapshot`
- **Config:** browser.traceView.ariaSnapshot

Capture the accessibility tree in trace-view snapshots (default: `true`)

### browser.locators.exact

- **CLI:** `--browser.locators.exact`
- **Config:** browser.locators.exact

Should locators match the text exactly by default (default: `true`)

### pool

- **CLI:** `--pool <pool>`
- **Config:** pool

Specify pool, if not running in the browser (default: `forks`)

### execArgv

- **CLI:** `--execArgv <option>`
- **Config:** execArgv

Pass <example-value> arguments to `node` process when spawning `worker_threads` or `child_process`.

### vmMemoryLimit

- **CLI:** `--vmMemoryLimit <limit>`
- **Config:** vmMemoryLimit

Memory limit for VM pools. If you see memory leaks, try to tinker this value.

### fileParallelism

- **CLI:** `--fileParallelism`
- **Config:** fileParallelism

Should all test files run in parallel. Use `--no-file-parallelism` to disable (default: `true`)

### maxWorkers

- **CLI:** `--maxWorkers <workers>`
- **Config:** maxWorkers

Maximum number or percentage of workers to run tests in

### environment

- **CLI:** `--environment <name>`
- **Config:** environment

Specify runner environment, if not running in the browser (default: `node`)

### passWithNoTests

- **CLI:** `--passWithNoTests`
- **Config:** passWithNoTests

Pass when no tests are found

### logHeapUsage

- **CLI:** `--logHeapUsage`
- **Config:** logHeapUsage

Show the size of heap for each test when running in node

### detectAsyncLeaks

- **CLI:** `--detectAsyncLeaks`
- **Config:** detectAsyncLeaks

Detect asynchronous resources leaking from the test file (default: `false`)

### allowOnly

- **CLI:** `--allowOnly`
- **Config:** allowOnly

Allow tests and suites that are marked as only (default: `!process.env.CI`)

### dangerouslyIgnoreUnhandledErrors

- **CLI:** `--dangerouslyIgnoreUnhandledErrors`
- **Config:** dangerouslyIgnoreUnhandledErrors

Ignore any unhandled errors that occur

### changed

- **CLI:** `--changed [since]`
- **Config:** changed

Run tests that are affected by the changed files (default: `false`)

### lastFailed

- **CLI:** `--lastFailed`

Run only the tests that failed in the last run (default: `false`)

### sequence.shuffle.files

- **CLI:** `--sequence.shuffle.files`
- **Config:** sequence.shuffle.files

Run files in a random order. Long running tests will not start earlier if you enable this option. (default: `false`)

### sequence.shuffle.tests

- **CLI:** `--sequence.shuffle.tests`
- **Config:** sequence.shuffle.tests

Run tests in a random order (default: `false`)
