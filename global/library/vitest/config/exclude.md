---
title: "exclude | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/exclude.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# exclude

- **Type:** `string[]`
- **Default:** `['**/node_modules/**', '**/.git/**']`
- **CLI:** `vitest --exclude "**/excluded-file" --exclude "*/other-files/*.js"`

A list of glob patterns that should be excluded from your test files. These patterns are resolved relative to the `root` (`process.cwd()` by default).

Vitest uses the `tinyglobby` package to resolve the globs.

**Warning:**
This option does not affect coverage. If you need to remove certain files from the coverage report, use `coverage.exclude`.

This is the only option that doesn't override your configuration if you provide it with a CLI flag. All glob patterns added via `--exclude` flag will be added to the config's `exclude`.

## Example

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      './temp/**',
    ],
  },
})
```

**Tip:**
Although the CLI `exclude` option is additive, manually setting `exclude` in your config will replace the default value. To extend the default `exclude` patterns, use `configDefaults` from `vitest/config`:

```js
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      'packages/template/*',
      './temp/**',
    ],
  },
})
```
