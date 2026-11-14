---
title: "include | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/include.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# include

- **Type:** `string[]`
- **Default:** `['**/*.{test,spec}.?(c|m)[jt]s?(x)']`
- **CLI:** `vitest [...include]`, `vitest **/*.test.js`

A list of glob patterns that match your test files. These patterns are resolved relative to the `root` (`process.cwd()` by default).

Vitest uses the `tinyglobby` package to resolve the globs.

**NOTE**
When using coverage, Vitest automatically adds test files `include` patterns to coverage's default `exclude` patterns. See `coverage.exclude`.

## Example

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      './test',
      './**/*.{test,spec}.ts(x)?',
    ],
  },
})
```

Vitest provides reasonable defaults, so normally you wouldn't override them. A good example of defining `include` is for test projects:

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['./test/unit/*.test.js'],
        },
      },
      {
        test: {
          name: 'e2e',
          include: ['./test/e2e/*.test.js'],
        },
      },
    ],
  },
})
```

**Warning:**
This option will override Vitest defaults. If you just want to extend them, use `configDefaults` from `vitest/config`:

```js
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      ...configDefaults.include,
      './test',
      './**/*.{test,spec}.ts(x)?',
    ],
  },
})
```
