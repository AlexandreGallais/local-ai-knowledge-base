---
title: "Plugin API (part 3 of 3)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/api-plugin.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Plugin API (part 3 of 3)

## Rolldown Plugin Compatibility

A fair number of Rolldown / Rollup plugins will work directly as a Vite plugin (e.g. `@rollup/plugin-alias` or `@rollup/plugin-json`), but not all of them, since some plugin hooks do not make sense in an unbundled dev server context.

In general, as long as a Rolldown / Rollup plugin fits the following criteria then it should just work as a Vite plugin:

- It doesn't use the `moduleParsed` hook.
- It doesn't rely on the Rolldown specific options like `transform.inject`
- It doesn't have strong coupling between bundle-phase hooks and output-phase hooks.

If a Rolldown / Rollup plugin only makes sense for the build phase, then it can be specified under `build.rolldownOptions.plugins` instead. It will work the same as a Vite plugin with `enforce: 'post'` and `apply: 'build'`.

You can also augment an existing Rolldown / Rollup plugin with Vite-only properties:

```js
import example from 'rolldown-plugin-example'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...example(),
      enforce: 'post',
      apply: 'build',
    },
  ],
})
```

## Path Normalization

Vite normalizes paths while resolving ids to use POSIX separators ( / ) while preserving the volume in Windows. On the other hand, Rollup keeps resolved paths untouched by default, so resolved ids have win32 separators ( \\ ) in Windows. However, Rollup plugins use a `normalizePath` utility function from `@rollup/pluginutils` internally, which converts separators to POSIX before performing comparisons. This means that when these plugins are used in Vite, the `include` and `exclude` config pattern and other similar paths against resolved ids comparisons work correctly.

So, for Vite plugins, when comparing paths against resolved ids it is important to first normalize the paths to use POSIX separators. An equivalent `normalizePath` utility function is exported from the `vite` module.

```js
import { normalizePath } from 'vite'

normalizePath('foo\\bar') // 'foo/bar'
normalizePath('foo/bar') // 'foo/bar'
```

## Filtering, include/exclude pattern

Vite exposes `@rollup/pluginutils`'s `createFilter` function to encourage Vite specific plugins and integrations to use the standard include/exclude filtering pattern, which is also used in Vite core itself.

### Hook Filters

Rolldown introduced a hook filter feature to reduce the communication overhead between the Rust and JavaScript runtimes. This feature allows plugins to specify patterns that determine when hooks should be called, improving performance by avoiding unnecessary hook invocations.

This is also supported by Rollup 4.38.0+ and Vite 6.3.0+. To make your plugin backward compatible with older versions, make sure to also run the filter inside the hook handlers.

```js
export default function myPlugin() {
  const jsFileRegex = /\.js$/

  return {
    name: 'my-plugin',
    // Example: only call transform for .js files
    transform: {
      filter: {
        id: jsFileRegex,
      },
      handler(code, id) {
        // Additional check for backward compatibility
        if (!jsFileRegex.test(id)) return null

        return {
          code: transformCode(code),
          map: null,
        }
      },
    },
  }
}
```

**Tip:**
`@rolldown/pluginutils` exports some utilities for hook filters like `exactRegex` and `prefixRegex`. These are also re-exported from `rolldown/filter` for convenience.

## Chunk Import Map Information

**Experimental**

This feature is experimental and may change in the future.

When `build.chunkImportMap` option is enabled, the import statements in the generated chunks will use a unique ID for each chunk instead of the file path.

To get the mapping from the chunk ID to the file path, you can access the import map emitted to the bundle in the `generateBundle` hook or the `writeBundle` hook. The import map has the name specified by `build.rolldownOptions.experimental.chunkImportMap.fileName` (defaults to `importmap.json`).

```ts
function accessImportMap() {
  let config: ResolvedConfig
  return {
    name: 'access-import-map',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    generateBundle(options, bundle) {
      const chunkImportMap =
        config.build.rolldownOptions.experimental?.chunkImportMap
      if (chunkImportMap) {
        const importMapFilename =
          typeof chunkImportMap === 'object' && chunkImportMap.fileName
            ? chunkImportMap.fileName
            : 'importmap.json'
        const importMap = bundle[importMapFilename]! as OutputAsset
        const mapping = JSON.parse(importMap.source).imports
        console.log(mapping)
        // { "./entry.hash1.js": "./entry.hash2.js" }
      }
    },
  }
}
```

## Client-server Communication

Since Vite 2.9, we provide some utilities for plugins to help handle the communication with clients.

### Server to Client

On the plugin side, we could use `server.ws.send` to broadcast events to the client:

```js
export default defineConfig({
  plugins: [
    {
      // ...
      configureServer(server) {
        server.ws.on('connection', () => {
          server.ws.send('my:greetings', { msg: 'hello' })
        })
      },
    },
  ],
})
```

**NOTE**
We recommend **always prefixing** your event names to avoid collisions with other plugins.

On the client side, use `hot.on` to listen to the events:

```ts
import 'vite/client'
// ---cut---
// client side
if (import.meta.hot) {
  import.meta.hot.on('my:greetings', (data) => {
    console.log(data.msg) // hello
  })
}
```

### Client to Server

To send events from the client to the server, we can use `hot.send`:

```ts
// client side
if (import.meta.hot) {
  import.meta.hot.send('my:from-client', { msg: 'Hey!' })
}
```

Then use `server.ws.on` and listen to the events on the server side:

```js
export default defineConfig({
  plugins: [
    {
      // ...
      configureServer(server) {
        server.ws.on('my:from-client', (data, client) => {
          console.log('Message from client:', data.msg) // Hey!
          // reply only to the client (if needed)
          client.send('my:ack', { msg: 'Hi! I got your message!' })
        })
      },
    },
  ],
})
```

### TypeScript for Custom Events

Internally, vite infers the type of a payload from the `CustomEventMap` interface, it is possible to type custom events by extending the interface:

**Note**
Make sure to include the `.d.ts` extension when specifying TypeScript declaration files. Otherwise, TypeScript may not know which file the module is trying to extend.

```ts
import 'vite/types/customEvent.d.ts'

declare module 'vite/types/customEvent.d.ts' {
  interface CustomEventMap {
    'custom:foo': { msg: string }
    // 'event-key': <example-value>
  }
}
```

This interface extension is utilized by `InferCustomEventPayload<T>` to infer the payload type for event `T`. For more information on how this interface is utilized, refer to the HMR API Documentation.

```ts
import 'vite/client'
import type { InferCustomEventPayload } from 'vite/types/customEvent.d.ts'
declare module 'vite/types/customEvent.d.ts' {
  interface CustomEventMap {
    'custom:foo': { msg: string }
  }
}
// ---cut---
type CustomFooPayload = InferCustomEventPayload<'custom:foo'>
import.meta.hot?.on('custom:foo', (payload) => {
  // The type of payload will be { msg: string }
})
import.meta.hot?.on('unknown:event', (payload) => {
  // The type of payload will be any
})
```
