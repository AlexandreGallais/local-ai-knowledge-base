---
title: "Reporters | Guide (part 1 of 3)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/reporters.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Reporters

Vitest provides several built-in reporters to display test output in different formats, as well as the ability to use custom reporters. You can select different reporters either by using the `--reporter` command line option, or by including a `reporters` property in your configuration file. If no reporter is specified, Vitest auto-selects reporters based on the environment.

Using reporters via command line:

```bash
npx vitest --reporter=verbose
```

Using reporters via `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['verbose']
  },
})
```

Some reporters can be customized by passing additional options to them. Reporter specific options are described in sections below.

```ts
export default defineConfig({
  test: {
    reporters: [
      'default',
      ['junit', { suiteName: 'UI tests' }]
    ],
  },
})
```

## Default Configuration

When `reporters` is not configured, Vitest uses the following reporters:

- `default` in normal terminal runs
- `minimal` when Vitest detects an AI coding agent
- `github-actions` is added when `process.env.GITHUB_ACTIONS === 'true'`

If you configure your own reporters, the configured list replaces the default list. To add a reporter while keeping Vitest's defaults, extend `configDefaults.reporters`:

```ts
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['json', ...configDefaults.reporters],
  },
})
```

## Reporter Output

By default, Vitest's reporters print their output to the terminal. The `json`, `junit` and `html` reporters instead write to a scoped location under `.vitest/`:

- `json` writes `.vitest/json/output.json`
- `junit` writes `.vitest/junit/output.xml`
- `html` writes `.vitest/index.html`

The `json` and `junit` locations can be overridden with the `outputFile` configuration option in your Vitest configuration file or via CLI. The `html` reporter uses its `outputDir` option instead.

:::code-group

```bash
npx vitest --reporter=json --outputFile=./test-output.json
```

```ts
export default defineConfig({
  test: {
    reporters: ['json'],
    outputFile: './test-output.json'
  },
})
```

The `json` and `junit` reporters also accept `outputFile` as a reporter option, which takes precedence over the top-level `outputFile`:

```ts
export default defineConfig({
  test: {
    reporters: [['json', { outputFile: './test-output.json' }]],
  },
})
```

To print the report to the terminal instead of writing it to a file, set the `stdout` option on the `json` or `junit` reporter. This is ignored when `outputFile` is set:

```ts
export default defineConfig({
  test: {
    reporters: [['json', { stdout: true }]],
  },
})
```

**Warning:**
When `stdout` is enabled, the report can be interleaved with other output written directly to the terminal — for example `process.stdout.write` in a test file, or logs from the main process such as a global setup file — which can make the JSON or XML unparsable. Prefer the default file output when you need to consume the report programmatically.

## Combining Reporters

You can use multiple reporters simultaneously to print your test results in different formats. For example:

```bash
npx vitest --reporter=json --reporter=default
```

```ts
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['json', ...configDefaults.reporters],
    outputFile: './test-output.json'
  },
})
```

The above example will both print the test results to the terminal in the default style and write them as JSON to the designated output file.

When using multiple reporters, it's also possible to designate multiple output files, as follows:

```ts
export default defineConfig({
  test: {
    reporters: ['junit', 'json', 'verbose'],
    outputFile: {
      junit: './junit-report.xml',
      json: './json-report.json',
    },
  },
})
```

This example will write separate JSON and XML reports as well as printing a verbose report to the terminal.
