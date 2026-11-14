---
title: "Plugin API"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/advanced/plugin.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Plugin API <Version>3.1.0</Version> {#plugin-api}

**Warning:**
This is an advanced API. If you just want to run tests, you probably don't need this. It is primarily used by library authors.

This guide assumes you know how to work with Vite plugins.

Vitest supports a `configureVitest` plugin hook since version 3.1.

::: code-group

```ts
import type { Vite, VitestPluginContext } from 'vitest/node'

export function plugin(): Vite.Plugin {
  return {
    name: 'vitest:my-plugin',
    configureVitest(context: VitestPluginContext) {
      // ...
    }
  }
}
```

```ts
/// <reference types="vitest/config" />

import type { Plugin } from 'vite'

export function plugin(): Plugin {
  return {
    name: 'vitest:my-plugin',
    transform() {
      // ...
    },
    configureVitest(context) {
      // ...
    }
  }
}
```

**TypeScript**
Vitest re-exports all Vite type-only imports via a `Vite` namespace, which you can use to keep your versions in sync. However, if you are writing a plugin for both Vite and Vitest, you can continue using the `Plugin` type from the `vite` entrypoint. Just make sure you have `vitest/config` referenced somewhere so that `configureVitest` is augmented correctly:

```ts
/// <reference types="vitest/config" />
```

Unlike `reporter.onInit`, this hooks runs early in Vitest lifecycle allowing you to make changes to configuration like `coverage` and `reporters`. A more notable change is that you can manipulate the global config from a test project if your plugin is defined in the project and not in the global config.

## Context

### project

The current test project that the plugin belongs to.

**Browser Mode**
Note that if you are relying on a browser feature, the `project.browser` field is not set yet. Use `reporter.onBrowserInit` event instead.

### vitest

The global Vitest instance. You can change the global configuration by directly mutating the `vitest.config` property:

```ts
vitest.config.coverage.enabled = false
vitest.config.reporters.push([['my-reporter', {}]])
```

**Config is Resolved**
Note that Vitest already resolved the config, so some types might be different from the usual user configuration. This also means that some properties will not be resolved again, like `setupFile`. If you are adding new files, make sure to resolve it first.

At this point reporters are not created yet, so modifying `vitest.reporters` will have no effect because it will be overwritten. If you need to inject your own reporter, modify the config instead.

### injectTestProjects

```ts
function injectTestProjects(
  config: TestProjectConfiguration | TestProjectConfiguration[]
): Promise<TestProject[]>
```

This methods accepts a config glob pattern, a filepath to the config or an inline configuration. It returns an array of resolved test projects.

```ts
// inject a single project with a custom alias
const newProjects = await injectTestProjects({
  // you can inherit the current project config by referencing `extends`
  // note that you cannot have a project with the name that already exists,
  // so it's a good practice to define a custom name
  extends: project.vite.config.configFile,
  test: {
    name: 'my-custom-alias',
    alias: {
      customAlias: resolve('./custom-path.js'),
    },
  },
})
```

**Projects are Filtered**
Vitest filters projects during the config resolution, so if the user defined a filter, injected project might not be resolved unless it matches the filter. You can update the filter via the `vitest.config.project` option to always include your test project:

```ts
vitest.config.project.push('my-project-name')
```

Note that this will only affect projects injected with `injectTestProjects` method.

**Referencing the Current Config**
Inline configurations inherit the root config by default. If you want to inherit a specific configuration file instead, set the `extends` property to its path. All other properties will be merged with the user defined config.

The project's `configFile` can be accessed in Vite's config: `project.vite.config.configFile`.

Note that the `name` is never inherited because Vitest doesn't allow multiple projects with the same name. Make sure every project has a unique name. You can access the current name via the `project.name` property and all used names are available in the `vitest.projects` array.

### defineCacheKeyGenerator <Version>5.0.0</Version> {#definecachekeygenerator}

```ts
interface CacheKeyIdGeneratorContext {
  environment: DevEnvironment
  id: string
  sourceCode: string
}

function defineCacheKeyGenerator(
  callback: (context: CacheKeyIdGeneratorContext) => string | undefined | null | false
): void
```

Define a generator that will be applied before hashing the cache key.

Use this to make sure Vitest generates correct hash. It is a good idea to define this function if your plugin can be registered with different options.

This is called only if `fsModuleCache` is enabled.

```ts
interface PluginOptions {
  replacePropertyKey: <example-value>
  replacePropertyValue: string
}

export function plugin(options: PluginOptions) {
  return {
    name: 'plugin-that-replaces-property',
    transform(code) {
      return code.replace(
        options.replacePropertyKey,
        options.replacePropertyValue
      )
    },
    configureVitest({ defineCacheKeyGenerator }) {
      defineCacheKeyGenerator(() => {
        // since these options affect the transform result,
        // return them together as a unique string
        return options.replacePropertyKey + options.replacePropertyValue
      })
    }
  }
}
```

If `false` is returned, the module will not be cached on the file system.
