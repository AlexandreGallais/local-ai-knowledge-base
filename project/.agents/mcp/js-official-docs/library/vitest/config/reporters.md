---
title: "reporters | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/reporters.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# reporters <CRoot />

- **Type:**

```ts
interface UserConfig {
  reporters?: ConfigReporter | Array<ConfigReporter>
}

type ConfigReporter = string | Reporter | [string, object?]
```

- **Default:** `'default'`. See Default Reporters for environment-specific behavior.
- **CLI:**
  - `--reporter=tap` for a single reporter
  - `--reporter=verbose --reporter=github-actions` for multiple reporters

This option defines a single reporter or a list of reporters available to Vitest during the test run.

Alongside built-in reporters, you can also pass down a custom implementation of a `Reporter` interface, or a path to a module that exports it as a default export (e.g. `'./path/to/reporter.ts'`, `'@scope/reporter'`).

You can configure a reporter by providing a tuple: `[string, object]`, where the string is a reporter name, and the object is the reporter's options.

**Warning:**
Note that the coverage feature uses a different `coverage.reporter` option instead of this one.

## Built-in Reporters

- `default`
- `verbose`
- `tree`
- `dot`
- `junit`
- `json`
- `html`
- `tap`
- `tap-flat`
- `hanging-process`
- `github-actions`
- `minimal` (aliased as `agent`)
- `blob`

## Example

::: code-group

```js
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: [
      ...configDefaults.reporters,
      // conditional reporter
      ...(process.env.CI ? ['html'] : []),
      // custom reporter from npm package
      // options are passed down as a tuple
      [
        'vitest-sonar-reporter',
        { outputFile: 'sonar-report.xml' }
      ],
    ]
  }
})
```

```bash
vitest --reporter=github-actions --reporter=junit
```
