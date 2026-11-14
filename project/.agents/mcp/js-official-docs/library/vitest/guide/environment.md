---
title: "Test Environment | Guide"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/environment.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Test Environment

Vitest provides `environment` option to run code inside a specific environment. You can modify how environment behaves with `environmentOptions` option.

By default, you can use these environments:

- `node` is default environment
- `jsdom` emulates browser environment by providing Browser API, uses `jsdom` package
- `happy-dom` emulates browser environment by providing Browser API, and considered to be faster than jsdom, but lacks some API, uses `happy-dom` package
- `edge-runtime` emulates Vercel's edge-runtime, uses `@edge-runtime/vm` package

**Info:**
When using `jsdom` or `happy-dom` environments, Vitest follows the same rules that Vite does when importing CSS and assets. If importing external dependency fails with `unknown extension .css` error, you need to inline the whole import chain manually by adding all packages to `server.deps.inline`. For example, if the error happens in `package-3` in this import chain: `source code -> package-1 -> package-2 -> package-3`, you need to add all three packages to `server.deps.inline`.

The `require` of CSS and assets inside the external dependencies are resolved automatically.

**Warning:**
"Environments" exist only when running tests in Node.js.

`browser` is not considered an environment in Vitest. If you wish to run part of your tests using Browser Mode, you can create a test project.

## Environments for Specific Files

When setting `environment` option in your config, it will apply to all the test files in your project. To have more fine-grained control, you can use control comments to specify environment for specific files. Control comments are comments that start with `@vitest-environment` and are followed by the environment name:

```ts
// @vitest-environment jsdom

import { expect, test } from 'vitest'

test('test', () => {
  expect(typeof window).not.toBe('undefined')
})
```

## Custom Environment

You can create your own package to extend Vitest environment. To do so, create package with the name `vitest-environment-${name}` or specify a path to a valid JS/TS file. That package should export an object with the shape of `Environment`:

```ts
import type { Environment } from 'vitest/runtime'

export default <Environment>{
  name: 'custom',
  viteEnvironment: 'ssr',
  // optional - set to false when "setupVM" is fast, so vm pools
  // do not transform the import graph while it runs
  prewarmModules: true,
  // optional - only if you support "vmForks" or "vmThreads" pools
  async setupVM() {
    const vm = await import('node:vm')
    const context = vm.createContext()
    return {
      getVmContext() {
        return context
      },
      teardown() {
        // called after all tests with this env have been run
      }
    }
  },
  setup() {
    // custom setup
    return {
      teardown() {
        // called after all tests with this env have been run
      }
    }
  }
}
```

**Warning:**
Vitest requires `viteEnvironment` option on environment object (fallbacks to the Vitest environment name by default). It should be equal to `ssr`, `client` or any custom Vite environment name. This value determines which environment is used to process file.

You also have access to default Vitest environments through `vitest/runtime` entry:

```ts
import { builtinEnvironments, populateGlobal } from 'vitest/runtime'

console.log(builtinEnvironments) // { jsdom, happy-dom, node, edge-runtime }
```

Vitest also provides `populateGlobal` utility function, which can be used to move properties from object into the global namespace:

```ts
interface PopulateOptions {
  // should non-class functions be bind to the global namespace
  bindFunctions?: boolean
}

interface PopulateResult {
  // a list of all keys that were copied, even if value doesn't exist on original object
  keys: Set<string>
  // a map of property descriptors for keys that might have been overridden
  // you can restore them with `Object.defineProperty` inside `teardown`
  originals: Map<string | symbol, PropertyDescriptor>
}

export function populateGlobal(global: any, original: any, options: PopulateOptions): PopulateResult
```
