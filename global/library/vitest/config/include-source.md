---
title: "includeSource | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/include-source.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# includeSource

- **Type:** `string[]`
- **Default:** `[]`

A list of glob patterns that match your in-source test files. These patterns are resolved relative to the `root` (`process.cwd()` by default).

When defined, Vitest will run all matched files that have `import.meta.vitest` inside.

**Warning:**
Vitest performs a simple text-based inclusion check on source files. If a file contains `import.meta.vitest`, even in a comment, it will be matched as an in-source test file.

Vitest uses the `tinyglobby` package to resolve the globs.

## Example

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
})
```

Then you can write tests inside your source files:

```ts
export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0)
}

// #region in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}
// #endregion
```

For your production build, you need to replace the `import.meta.vitest` with `undefined`, letting the bundler do the dead code elimination.

::: code-group

```js
import { defineConfig } from 'vite'

export default defineConfig({
  define: { // [!code ++]
    'import.meta.vitest': 'undefined', // [!code ++]
  }, // [!code ++]
})
```

```js
import { defineConfig } from 'rolldown/config'

export default defineConfig({
  transform: {
    define: { // [!code ++]
      'import.meta.vitest': 'undefined', // [!code ++]
    }, // [!code ++]
  },
})
```

```js
import replace from '@rollup/plugin-replace' // [!code ++]

export default {
  plugins: [
    replace({ // [!code ++]
      'import.meta.vitest': 'undefined', // [!code ++]
    }) // [!code ++]
  ],
  // other options
}
```

```js
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  replace: { // [!code ++]
    'import.meta.vitest': 'undefined', // [!code ++]
  }, // [!code ++]
  // other options
})
```

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({ // [!code ++]
      'import.meta.vitest': 'undefined', // [!code ++]
    })// [!code ++]
  ],
}
```

**Tip:**
To get TypeScript support for `import.meta.vitest`, add `vitest/importMeta` to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vitest/importMeta"]
  }
}
```
