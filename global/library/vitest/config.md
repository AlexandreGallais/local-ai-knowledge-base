---
title: "Configuring Vitest"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/index.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Configuring Vitest

If you are using Vite and have a `vite.config` file, Vitest will read it to match with the plugins and setup as your Vite app. If you want to have a different configuration for testing or your main app doesn't rely on Vite specifically, you could either:

- Create `vitest.config.ts`, which will have the higher priority and will **override** the configuration from `vite.config.ts` (Vitest supports all conventional JS and TS extensions, but doesn't support `json`) - it means all options in your `vite.config` will be **ignored**
- Pass `--config` option to CLI, e.g. `vitest --config ./path/to/vitest.config.ts`
- Use `process.env.VITEST` or `mode` property on `defineConfig` (will be set to `test` if not overridden with `--mode`) to conditionally apply different configuration in `vite.config.ts`. Note that like any other environment variable, `VITEST` is also exposed on `import.meta.env` in your tests

When an explicit `--config` option is not provided, Vitest looks for `vitest.config.{ts,mts,cts,js,mjs,cjs}` first and `vite.config.{ts,mts,cts,js,mjs,cjs}` second in the project `root`. If no config file is found, Vitest will run without one.

To configure `vitest` itself, add `test` property in your Vite config. You'll also need to add a reference to Vitest types using a triple slash command at the top of your config file, if you are importing `defineConfig` from `vite` itself.

If you are not using `vite`, add `defineConfig` imported from `vitest/config` to your config file:

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ... Specify options here.
  },
})
```

If you have a `vite` config already, you can add `/// <reference types="vitest/config" />` to include the `test` types:

```js
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ... Specify options here.
  },
})
```

You can retrieve Vitest's default options to expand them if needed:

```js
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
})
```

When using a separate `vitest.config.js`, you can also extend Vite's options from another config file if needed:

```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    exclude: ['packages/template/*'],
  },
}))
```

If your Vite config is defined as a function, you can define the config like this:

```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(configEnv => mergeConfig(
  viteConfig(configEnv),
  defineConfig({
    test: {
      exclude: ['packages/template/*'],
    },
  })
))
```

Since Vitest uses Vite config, you can also use any configuration option from Vite. For example, `define` to define global variables, or `resolve.alias` to define aliases - these options should be defined on the top level, _not_ within a `test` property.

## Automatic Dependency Installation

Vitest will prompt you to install certain dependencies if they are not already installed. You can disable this behavior by setting the `VITEST_SKIP_INSTALL_CHECKS=1` environment variable.

## Config Options

Configuration options that are not supported inside a project config have <CRoot /> icon next to them. This means they can only be set in the root Vitest config.
