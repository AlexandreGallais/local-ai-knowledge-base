---
title: "Shared Options (part 2 of 2)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/config/shared-options.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Shared Options (part 2 of 2)

## css.lightningcss

- **Experimental:** Give Feedback
- **Type:**

```js
import type {
  CSSModulesConfig,
  Drafts,
  Features,
  NonStandard,
  PseudoClasses,
  Targets,
} from 'lightningcss'
```

```js
{
  targets?: Targets
  include?: Features
  exclude?: Features
  drafts?: Drafts
  nonStandard?: NonStandard
  pseudoClasses?: PseudoClasses
  unusedSymbols?: string[]
  cssModules?: CSSModulesConfig,
  // ...
}
```

Configures Lightning CSS. Full transform options can be found in the Lightning CSS repo.

## json.namedExports

- **Type:** `boolean`
- **Default:** `true`

Whether to support named imports from `.json` files.

## json.stringify

- **Type:** `boolean | 'auto'`
- **Default:** `'auto'`

If set to `true`, imported JSON will be transformed into `export default JSON.parse("...")` which is significantly more performant than Object literals, especially when the JSON file is large.

If set to `'auto'`, the data will be stringified only if the data is bigger than 10kB.

## oxc

- **Type:** `OxcOptions | false`

`OxcOptions` extends Oxc Transformer's options. The most common use case is customizing JSX:

```js
export default defineConfig({
  oxc: {
    jsx: {
      runtime: 'classic',
      pragma: 'h',
      pragmaFrag: 'Fragment',
    },
  },
})
```

By default, transformation by Oxc is applied to `ts`, `jsx` and `tsx` files. You can customize this with `oxc.include` and `oxc.exclude`, which can be a regex, a picomatch pattern, or an array of either.

In addition, you can also use `oxc.jsxInject` to automatically inject JSX helper imports for every file transformed by Oxc:

```js
export default defineConfig({
  oxc: {
    jsxInject: `import React from 'react'`,
  },
})
```

Set to `false` to disable transformation by Oxc.

## esbuild

- **Type:** `ESBuildOptions | false`
- **Deprecated**

This option is converted to `oxc` option internally. Use `oxc` option instead.

## assetsInclude

- **Type:** `string | RegExp | (string | RegExp)[]`
- **Related:** Static Asset Handling

Specify additional picomatch patterns to be treated as static assets so that:

- They will be excluded from the plugin transform pipeline when referenced from HTML or directly requested over `fetch` or XHR.

- Importing them from JS will return their resolved URL string (this can be overwritten if you have a `enforce: 'pre'` plugin to handle the asset type differently).

The built-in asset type list can be found here.

**Example:**

```js
export default defineConfig({
  assetsInclude: ['**/*.gltf'],
})
```

## logLevel

- **Type:** `'info' | 'warn' | 'error' | 'silent'`

Adjust console output verbosity. Default is `'info'`.

## customLogger

- **Type:**
  ```ts
  interface Logger {
    info(msg: string, options?: LogOptions): void
    warn(msg: string, options?: LogOptions): void
    warnOnce(msg: string, options?: LogOptions): void
    error(msg: string, options?: LogErrorOptions): void
    clearScreen(type: LogType): void
    hasErrorLogged(error: Error | RollupError): boolean
    hasWarned: boolean
  }
  ```

Use a custom logger to log messages. You can use Vite's `createLogger` API to get the default logger and customize it to, for example, change the message or filter out certain warnings.

```ts
import { createLogger, defineConfig } from 'vite'

const logger = createLogger()
const loggerWarn = logger.warn

logger.warn = (msg, options) => {
  // Ignore empty CSS files warning
  if (msg.includes('vite:css') && msg.includes(' is empty')) return
  loggerWarn(msg, options)
}

export default defineConfig({
  customLogger: logger,
})
```

## clearScreen

- **Type:** `boolean`
- **Default:** `true`

Set to `false` to prevent Vite from clearing the terminal screen when logging certain messages. Via command line, use `--clearScreen false`.

## envDir

- **Type:** `string | false`
- **Default:** `root`

The directory from which `.env` files are loaded. Can be an absolute path, or a path relative to the project root. `false` will disable the `.env` file loading.

See here for more about environment files.

## envPrefix

- **Type:** `string | string[]`
- **Default:** `VITE_`

Env variables starting with `envPrefix` will be exposed to your client source code via `import.meta.env`.

**SECURITY NOTES**
`envPrefix` should not be set as `''`, which will expose all your env variables and cause unexpected leaking of sensitive information. Vite will throw an error when detecting `''`.

If you would like to expose an unprefixed variable, you can use define to expose it:

```js
define: {
  'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)
}
```

## appType

- **Type:** `'spa' | 'mpa' | 'custom'`
- **Default:** `'spa'`

Whether your application is a Single Page Application (SPA), a Multi Page Application (MPA), or Custom Application (SSR and frameworks with custom HTML handling):

- `'spa'`: include HTML middlewares and use SPA fallback. Configure sirv with `single: true` in preview
- `'mpa'`: include HTML middlewares
- `'custom'`: don't include HTML middlewares

Learn more in Vite's SSR guide. Related: `server.middlewareMode`.

## devtools

- **Experimental:** Give Feedback
- **Type:** `boolean` | `DevToolsConfig`
- **Default:** `false`

Enable devtools integration for inspecting the dev server and analyzing builds.
Ensure that `@vitejs/devtools` is installed as a dependency. Install `@vitejs/devtools-vite` to inspect the Vite dev server and `@vitejs/devtools-rolldown` to enable build analysis. DevTools runs for both `serve` and `build` by default; use `apply` to limit it to either command.

Plugin `config` hooks cannot change the `devtools` option. Set it in the user config instead.

When installed, `@vitejs/devtools` provides the type definitions for this option:

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  devtools: {
    apply: 'serve',
  },
})
```

See Vite DevTools for more details.

## tsconfig

- **Type:** `string`

Path to the TypeScript configuration file used by Vite. Relative paths are resolved from the project `root`.

When this option is not set, Vite discovers the closest matching `tsconfig.json` for each file. See TypeScript Compiler Options for more details.

**Prefer automatic discovery**
Setting this option is discouraged because it overrides Vite's per-file tsconfig discovery which is aligned with TypeScript language server. Prefer placing a `tsconfig.json` near the files it configures and using TypeScript `references` for multi-project setups.

If the goal is to remap imports, prefer `resolve.alias` or the `imports` and `exports` fields in `package.json` instead of selecting a tsconfig solely for `compilerOptions.paths`. Use this option only when automatic discovery cannot identify the intended configuration.

## future

- **Type:** `Record<string, 'warn' | undefined>`
- **Related:** Breaking Changes

Enable future breaking changes to prepare for a smooth migration to the next major version of Vite. The list may be updated, added, or removed at any time as new features are developed.

See the Breaking Changes page for details of the possible options.
