---
title: "coverage | Config (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/coverage.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# coverage | Config (part 2 of 2)

## coverage.instrumenter <Version type="experimental">4.1.5</Version> {#coverage-instrumenter}

- **Type:** `(options: InstrumenterOptions) => CoverageInstrumenter`
- **Available for providers:** `'istanbul'`

Factory for a custom instrumenter to use in place of the default `@vitest/istanbul-lib-instrument`. Vitest calls the factory once during initialization and reuses the returned instrumenter for every file. The rest of the Istanbul pipeline (collection, merging, reporting) is unchanged.

The factory receives an `InstrumenterOptions` object with Vitest's runtime coverage settings, and must return an object implementing the `CoverageInstrumenter` interface. Both types are exported from `vitest/node`.

```ts
interface InstrumenterOptions {
  coverageVariable: string
  coverageGlobalScope: string
  coverageGlobalScopeFunc: boolean
  ignoreClassMethods: string[]
}

interface CoverageInstrumenter {
  instrumentSync: (code: string, filename: string, inputSourceMap?: any) => string
  lastSourceMap: () => any
  lastFileCoverage: () => any
}
```

```ts
import { defineConfig } from 'vitest/config'
import { createInstrumenter } from '@vitest/some-custom-instrumenter'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      instrumenter: options => createInstrumenter(options),
    }
  }
})
```

## coverage.customProviderModule

- **Type:** `string`
- **Available for providers:** `'custom'`
- **CLI:** `--coverage.customProviderModule=`

Specifies the module name or path for the custom coverage provider module. See Guide - Custom Coverage Provider for more information.

## coverage.htmlDir

- **Type:** `string`
- **Default:** Automatically inferred from `html`, `html-spa`, or `lcov` coverage reporters
- **CLI:** `--coverage.htmlDir=`

Directory of HTML coverage output to be served in Vitest UI and HTML reporter.

This is automatically configured when using builtin coverage reporters that produce HTML output (`html`, `html-spa`, and `lcov`). Use this option to override with a custom coverage reporting location when using custom coverage reporters.

Note that setting this option does not change where coverage HTML report is generated. Configure the `coverage.reporter` option to change the directory instead.

## coverage.changed

- **Type:** `boolean | string`
- **Default:** `false` (inherits from `test.changed`)
- **Available for providers:** `'v8' | 'istanbul'`
- **CLI:** `--coverage.changed`, `--coverage.changed=<commit/branch>`

Collect coverage only for files changed since a specified commit or branch. When set to `true`, it uses staged and unstaged changes.

## coverage.autoAttachSubprocess <Version>5.0.0</Version> {#coverage-autoattachsubprocess}

- **Type:** `boolean`
- **Default:** `false`
- **Available for providers:** `'v8'`
- **CLI:** `--coverage.autoAttachSubprocess`

Track coverage of the `node:child_process` and `node:worker_threads` spawned during test run.

Note that this option has some performance overhead as its using `NODE_V8_COVERAGE` internally. This triggers Node to write lots of unnecessary files on file system.
