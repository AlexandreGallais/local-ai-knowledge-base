---
title: "Plugin API (part 1 of 3)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/api-plugin.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Plugin API

Vite plugins extends Rolldown's plugin interface with a few extra Vite-specific options. As a result, you can write a Vite plugin once and have it work for both dev and build.

**It is recommended to go through Rolldown's plugin documentation first before reading the sections below.**

## Authoring a Plugin

Vite strives to offer established patterns out of the box, so before creating a new plugin make sure that you check the Features guide to see if your need is covered. Also review available community plugins, both in the form of a compatible Rollup plugin and Vite Specific plugins.

When creating a plugin, you can inline it in your `vite.config.js`. There is no need to create a new package for it. Once you see that a plugin was useful in your projects, consider sharing it to help others in the ecosystem.

**Tip:**
When learning, debugging, or authoring plugins, we suggest including vite-plugin-inspect in your project. It allows you to inspect the intermediate state of Vite plugins. After installing, you can visit `localhost:5173/__inspect/` to inspect the modules and transformation stack of your project. Check out install instructions in the vite-plugin-inspect docs.

## Conventions

If the plugin doesn't use Vite specific hooks and can be implemented as a Compatible Rolldown Plugin, then it is recommended to use the Rolldown Plugin naming conventions.

- Rolldown Plugins should have a clear name with `rolldown-plugin-` prefix.
- Include `rolldown-plugin` and `vite-plugin` keywords in package.json `keywords` field.

This exposes the plugin to be also used in pure Rolldown or Rollup based projects.

For Vite only plugins

- Vite Plugins should have a clear name with `vite-plugin-` prefix.
- Include `vite-plugin` keyword in package.json `keywords` field.
- Include a section in the plugin docs detailing why it is a Vite only plugin (for example, it uses Vite specific plugin hooks).

If your plugin is only going to work for a particular framework, its name should be included as part of the prefix.

- `vite-plugin-vue-` prefix for Vue Plugins
- `vite-plugin-react-` prefix for React Plugins
- `vite-plugin-svelte-` prefix for Svelte Plugins

See also Virtual Modules Convention.

## Plugins Config

Users will add plugins to the project `devDependencies` and configure them using the `plugins` array option.

```js
import rollupPlugin from 'rollup-plugin-feature'
import vitePlugin from 'vite-plugin-feature'

export default defineConfig({
  plugins: [vitePlugin(), rollupPlugin()],
})
```

Falsy plugins will be ignored, which can be used to easily activate or deactivate plugins.

`plugins` also accepts presets including several plugins as a single element. This is useful for complex features (like framework integration) that are implemented using several plugins. The array will be flattened internally.

```js
import frameworkDevTools from 'vite-plugin-framework-devtools'
import frameworkRefresh from 'vite-plugin-framework-refresh'

export default function framework(config) {
  return [frameworkRefresh(config), frameworkDevTools(config)]
}
```

```js
import { defineConfig } from 'vite'
import framework from 'vite-plugin-framework'

export default defineConfig({
  plugins: [framework()],
})
```

## Simple Examples

**Tip:**
It is common convention to author a Vite/Rolldown/Rollup plugin as a factory function that returns the actual plugin object. The function can accept options which allows users to customize the behavior of the plugin.

### Transforming Custom File Types

```js
const fileRegex = /\.(my-file-ext)$/

export default function myPlugin() {
  return {
    name: 'transform-file',

    transform: {
      filter: {
        id: fileRegex,
      },
      handler(src, id) {
        return {
          code: compileFileToJS(src),
          map: null, // provide source map if available
        }
      },
    },
  }
}
```

### Importing a Virtual File

Virtual modules allow you to pass build time information to the source files using normal ESM import syntax. See Virtual Modules Convention for the full convention.

```js
import { exactRegex } from '@rolldown/pluginutils'

export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin', // required, will show up in warnings and errors
    resolveId: {
      filter: { id: exactRegex(virtualModuleId) },
      handler() {
        return resolvedVirtualModuleId
      },
    },
    load: {
      filter: { id: exactRegex(resolvedVirtualModuleId) },
      handler() {
        return `export const msg = "from virtual module"`
      },
    },
  }
}
```

Which allows importing the module in JavaScript:

```js
import { msg } from 'virtual:my-module'

console.log(msg)
```

In Vite, since `\0` is not a permitted char in import URLs, a `\0{id}` virtual id ends up encoded as `/@id/__x00__{id}` during dev in the browser. The id is decoded back before entering the plugins pipeline, so this is not seen by plugin hooks code.

## Rolldown Hooks

During dev, the Vite dev server creates a plugin container that invokes Rolldown Build Hooks the same way Rolldown does it.

All rolldown hooks are per-environment hooks.

The following hooks are called once on server start:

- `options`
- `buildStart`

The following hooks are called on each incoming module request:

- `resolveId`
- `load`
- `transform`

These hooks also have an extended `options` parameter with additional Vite-specific properties. You can read more in the SSR documentation.

Some `resolveId` calls' `importer` value may be an absolute path for a generic `index.html` at root as it's not always possible to derive the actual importer due to Vite's unbundled dev server pattern. For imports handled within Vite's resolve pipeline, the importer can be tracked during the import analysis phase, providing the correct `importer` value.

The following hooks are called when the server is closed:

- `buildEnd`
- `closeBundle`

Note that the `moduleParsed` hook is **not** called during dev, because Vite avoids full AST parses for better performance.

Output Generation Hooks (except `closeBundle`) are **not** called during dev.
