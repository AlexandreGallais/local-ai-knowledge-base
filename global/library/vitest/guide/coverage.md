---
title: "Coverage | Guide (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/coverage.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Coverage

Vitest supports Native code coverage via `v8` and instrumented code coverage via `istanbul`.

## Coverage Providers

Both `v8` and `istanbul` support are optional. By default, `v8` will be used.

You can select the coverage tool by setting `test.coverage.provider` to `v8` or `istanbul`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8' // or 'istanbul'
    },
  },
})
```

When you start the Vitest process, it will prompt you to install the corresponding support package automatically.

Or if you prefer to install them manually:

::: code-group

```bash
npm i -D @vitest/coverage-v8
```

```bash
npm i -D @vitest/coverage-istanbul
```

## V8 Provider

**Info:**
The description of V8 coverage below is Vitest specific and does not apply to other test runners.
Since `v3.2.0` Vitest has used AST based coverage remapping for V8 coverage, which produces identical coverage reports to Istanbul.

This allows users to have the speed of V8 coverage with accuracy of Istanbul coverage.

By default Vitest uses `'v8'` coverage provider.
This provider requires Javascript runtime that's implemented on top of V8 engine, such as NodeJS, Deno or any Chromium based browsers such as Google Chrome.

Coverage collection is performed during runtime by instructing V8 using `node:inspector` and Chrome DevTools Protocol in browsers. User's source files can be executed as-is without any pre-instrumentation steps.

- ✅ Recommended option to use
- ✅ No pre-transpile step. Test files can be executed as-is.
- ✅ Faster execute times than Istanbul.
- ✅ Lower memory usage than Istanbul.
- ✅ Coverage report accuracy is as good as with Istanbul (since Vitest `v3.2.0`).
- ⚠️ In some cases can be slower than Istanbul, e.g. when loading lots of different modules. V8 does not support limiting coverage collection to specific modules.
- ⚠️ There are some minor limitations set by V8 engine. See `ast-v8-to-istanbul` | Limitations.
- ❌ Does not work on environments that don't use V8, such as Firefox or Bun. Or on environments that don't expose V8 coverage via profiler, such as Cloudflare Workers.

  <Box>Test file</Box>
  <ArrowDown />
  <Box>Enable V8 runtime coverage collection</Box>
  <ArrowDown />
  <Box>Run file</Box>
  <ArrowDown />
  <Box>Collect coverage results from V8</Box>
  <ArrowDown />
  <Box>Remap coverage results to source files</Box>
  <ArrowDown />
  <Box>Coverage report</Box>

## Istanbul Provider

Istanbul code coverage tooling has existed since 2012 and is very well battle-tested. Vitest uses its own `@vitest/istanbuljs` that is a fork of the original `istanbuljs/istanbuljs` project. This provider works on any JavaScript runtime as coverage tracking works by transforming your source code to add instrumentation logic. In practice, the code Vitest will end up running looks something like this:

```js
// Simplified example of branch and function coverage counters
const coverage = { // [!code ++]
  branches: { 1: [0, 0] }, // [!code ++]
  functions: { 1: 0 }, // [!code ++]
} // [!code ++]

export function getUsername(id) {
  // Function coverage increased when this is invoked  // [!code ++]
  coverage.functions['1']++ // [!code ++]

  if (id == null) {
    // Branch coverage increased when this is invoked  // [!code ++]
    coverage.branches['1'][0]++ // [!code ++]

    throw new Error('User ID is required')
  }
  // Implicit else coverage increased when if-statement condition not met  // [!code ++]
  coverage.branches['1'][1]++ // [!code ++]

  return database.getUser(id)
}

globalThis.__VITEST_COVERAGE__ ||= {} // [!code ++]
globalThis.__VITEST_COVERAGE__[filename] = coverage // [!code ++]
```

- ✅ Works on any Javascript runtime
- ✅ Widely used and battle-tested for over 13 years.
- ✅ In some cases faster than V8. Coverage instrumentation can be limited to specific files, as opposed to V8 where all modules are instrumented.
- ❌ Source code is transformed to add instrumentation before running
- ❌ Execution speed is slower than V8 due to instrumentation overhead
- ❌ Memory usage is higher than V8

  <Box>Test file</Box>
  <ArrowDown />
  <Box>Pre‑instrumentation on Javascript side</Box>
  <ArrowDown />
  <Box>Run file</Box>
  <ArrowDown />
  <Box>Collect coverage results from Javascript scope</Box>
  <ArrowDown />
  <Box>Remap coverage results to source files</Box>
  <ArrowDown />
  <Box>Coverage report</Box>

## Coverage Setup

**Tip:**
All coverage options are listed in Coverage Config Reference.

To test with coverage enabled, you can pass the `--coverage` flag in CLI or set `coverage.enabled` in `vitest.config.ts`:

::: code-group

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true
    },
  },
})
```

## Including and Excluding Files from Coverage Report

You can define what files are shown in coverage report by configuring `coverage.include` and `coverage.exclude`.

By default Vitest will show only files that were imported during test run.
To include uncovered files in the report, you'll need to configure `coverage.include` with a pattern that will pick your source files:

::: code-group

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}']
    },
  },
})
```

```sh
├── src
│   ├── components
│   │   └── counter.tsx   # [!code ++]
│   ├── mock-data
│   │   ├── products.json # [!code error]
│   │   └── users.json    # [!code error]
│   └── utils
│       ├── formatters.ts # [!code ++]
│       ├── time.ts       # [!code ++]
│       └── users.ts      # [!code ++]
├── test
│   └── utils.test.ts     # [!code error]
│
├── package.json          # [!code error]
├── tsup.config.ts        # [!code error]
└── vitest.config.ts      # [!code error]
```

To exclude files that are matching `coverage.include`, you can define an additional `coverage.exclude`:

::: code-group

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/utils/users.ts']
    },
  },
})
```

```sh
├── src
│   ├── components
│   │   └── counter.tsx   # [!code ++]
│   ├── mock-data
│   │   ├── products.json # [!code error]
│   │   └── users.json    # [!code error]
│   └── utils
│       ├── formatters.ts # [!code ++]
│       ├── time.ts       # [!code ++]
│       └── users.ts      # [!code error]
├── test
│   └── utils.test.ts     # [!code error]
│
├── package.json          # [!code error]
├── tsup.config.ts        # [!code error]
└── vitest.config.ts      # [!code error]
```

## Custom Coverage Reporter

You can use custom coverage reporters by passing either the name of the package or absolute path in `test.coverage.reporter`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: [
        // Specify reporter using name of the NPM package
        ['@vitest/custom-coverage-reporter', { someOption: true }],

        // Specify reporter using local path
        '/absolute/path/to/custom-reporter.cjs',
      ],
    },
  },
})
```

Custom reporters are loaded by `@vitest/istanbul-lib-report` and must match its reporter interface. See built-in reporters' implementation for reference.

::: code-group

```js
import { ReportBase } from '@vitest/istanbul-lib-report'

export default class CustomReporter extends ReportBase {
  constructor(opts) {
    super()

    if (!opts.file) {
      throw new Error('File is required as custom reporter parameter')
    }

    this.file = opts.file
  }

  onStart(root, context) {
    this.contentWriter = context.writer.writeFile(this.file)
    this.contentWriter.println('Start of custom coverage report ESM')
  }

  onEnd() {
    this.contentWriter.println('End of custom coverage report ESM')
    this.contentWriter.close()
  }
}
```

```js
const { ReportBase } = require('@vitest/istanbul-lib-report')

module.exports = class CustomReporter extends ReportBase {
  constructor(opts) {
    super()

    // Options passed from configuration are available here
    this.file = opts.file
  }

  onStart(root, context) {
    this.contentWriter = context.writer.writeFile(this.file)
    this.contentWriter.println('Start of custom coverage report')
  }

  onEnd() {
    this.contentWriter.println('End of custom coverage report')
    this.contentWriter.close()
  }
}
```

## Custom Coverage Provider

It's also possible to provide your custom coverage provider by passing `'custom'` in `test.coverage.provider`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'custom',
      customProviderModule: 'my-custom-coverage-provider'
    },
  },
})
```

The custom providers require a `customProviderModule` option which is a module name or path where to load the `CoverageProviderModule` from. It must export an object that implements `CoverageProviderModule` as default export:

```ts
import type {
  CoverageProvider,
  CoverageProviderModule,
  ResolvedCoverageOptions,
  Vitest
} from 'vitest'

const CustomCoverageProviderModule: CoverageProviderModule = {
  getProvider(): CoverageProvider {
    return new CustomCoverageProvider()
  },

  // Implements rest of the CoverageProviderModule ...
}

class CustomCoverageProvider implements CoverageProvider {
  name = 'custom-coverage-provider'
  options!: ResolvedCoverageOptions

  initialize(ctx: Vitest) {
    this.options = ctx.config.coverage
  }

  // Implements rest of the CoverageProvider ...
}

export default CustomCoverageProviderModule
```

Please refer to the type definition for more details.

## Ignoring Code

Both coverage providers have their own ways how to ignore code from coverage reports:

- `v8`
- `istanbul`

When using TypeScript the source codes are transpiled using `esbuild`, which strips all comments from the source codes (esbuild#516).
Comments which are considered as legal comments are preserved.

You can include a `@preserve` keyword in the ignore hint.
Beware that these ignore hints may now be included in final production build as well.

**Tip:**
Follow https://github.com/vitest-dev/vitest/issues/2021 for updates about `@preserve` usage.

```diff
-/* istanbul ignore if */
+/* istanbul ignore if -- @preserve */
if (condition) {

-/* v8 ignore if */
+/* v8 ignore if -- @preserve */
if (condition) {
```

### Examples

::: code-group

```ts
/* istanbul ignore start -- @preserve */
if (parameter) { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
else { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
/* istanbul ignore stop -- @preserve */

console.log('Included')

/* v8 ignore start -- @preserve */
if (parameter) { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
else { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
/* v8 ignore stop -- @preserve */

console.log('Included')
```

```ts
/* v8 ignore if -- @preserve */
if (parameter) { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
else {
  console.log('Included')
}

/* v8 ignore else -- @preserve */
if (parameter) {
  console.log('Included')
}
else { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
```

```ts
/* v8 ignore next -- @preserve */
console.log('Ignored') // [!code error]
console.log('Included')

/* v8 ignore next -- @preserve */
function ignored() { // [!code error]
  console.log('all') // [!code error]
  // [!code error]
  console.log('lines') // [!code error]
  // [!code error]
  console.log('are') // [!code error]
  // [!code error]
  console.log('ignored') // [!code error]
} // [!code error]

/* v8 ignore next -- @preserve */
class Ignored { // [!code error]
  ignored() {} // [!code error]
  alsoIgnored() {} // [!code error]
} // [!code error]

/* v8 ignore next -- @preserve */
condition // [!code error]
  ? console.log('ignored') // [!code error]
  : console.log('also ignored') // [!code error]
```

```ts
/* v8 ignore next -- @preserve */
try { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
catch (error) { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]

try {
  console.log('Included')
}
catch (error) {
  /* v8 ignore next -- @preserve */
  console.log('Ignored') // [!code error]
  /* v8 ignore next -- @preserve */
  console.log('Ignored') // [!code error]
}

// Requires rolldown-vite due to esbuild's lack of support.
// See https://vite.dev/guide/rolldown.html#how-to-try-rolldown
try {
  console.log('Included')
}
catch (error) /* v8 ignore next */ { // [!code error]
  console.log('Ignored') // [!code error]
} // [!code error]
```

```ts
switch (type) {
  case 1:
    return 'Included'

  /* v8 ignore next -- @preserve */
  case 2: // [!code error]
    return 'Ignored' // [!code error]

  case 3:
    return 'Included'

  /* v8 ignore next -- @preserve */
  default: // [!code error]
    return 'Ignored' // [!code error]
}
```

```ts
/* v8 ignore file -- @preserve */
export function ignored() { // [!code error]
  return 'Whole file is ignored'// [!code error]
}// [!code error]
```

## Coverage Performance

If code coverage generation is slow on your project, see Profiling Test Performance | Code coverage.

## HTML Report Theme

By default Vitest's HTML coverage report uses Vitest-styled themes. The color theme, dark or light, is set by following order:

- Reporter options: `coverage.reporter: [['html', { theme: 'light' | 'dark' | 'legacy' }]]`
- Your previous selection from the theme picker
- OS color preference

When coverage report is viewed through Vitest UI, it will inherit the UI's color theme. Setting explicit reporter option can override this.

If you do not want to use Vitest-styled reports, you can always set `coverage.reporter: [['html', { theme: 'legacy' }]]` to force the original Istanbul themed styles.

::: tabs key:<example-value>
== Light

== Dark

== Legacy

## Vitest UI

You can check your coverage report in Vitest UI and HTML reporter.

This is integrated with builtin coverage reporters with HTML output (`html`, `html-spa`, and `lcov` reporters). `html` reporter is enabled by default and this works out of the box. To integrate with custom reporters, you can configure `coverage.htmlDir`.
