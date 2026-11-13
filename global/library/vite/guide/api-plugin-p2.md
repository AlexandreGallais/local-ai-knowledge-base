---
title: "Plugin API (part 2 of 3)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/api-plugin.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Plugin API (part 2 of 3)

## Vite Specific Hooks

Vite plugins can also provide hooks that serve Vite-specific purposes. These hooks are ignored by Rollup.

### `config`

- **Type:** `(config: UserConfig, env: { mode: 'build' | 'serve', command: string, isSsrBuild?: boolean, isPreview?: boolean }) => UserConfig | null | void`
- **Kind:** `async`, `sequential`
- **Scope:** Global

  Modify Vite config before it's resolved. The hook receives the raw user config (CLI options merged with config file) and the current config env which exposes the `mode` and `command` being used. It can return a partial config object that will be deeply merged into existing config, or directly mutate the config (if the default merging cannot achieve the desired result).

  **Example:**

  ```js
  // return partial config (recommended)
  const partialConfigPlugin = () => ({
    name: 'return-partial',
    config: () => ({
      resolve: {
        alias: {
          foo: 'bar',
        },
      },
    }),
  })

  // mutate the config directly (use only when merging doesn't work)
  const mutateConfigPlugin = () => ({
    name: 'mutate-config',
    config(config, { command }) {
      if (command === 'build') {
        config.root = 'foo'
      }
    },
  })
  ```

**Note**
  User plugins are resolved before running this hook so injecting other plugins inside the `config` hook will have no effect.

### `configResolved`

- **Type:** `(config: ResolvedConfig) => void | Promise<void>`
- **Kind:** `async`, `parallel`
- **Scope:** Global

  Called after the Vite config is resolved. Use this hook to read and store the final resolved config. It is also useful when the plugin needs to do something different based on the command being run.

  **Example:**

  ```js
  const examplePlugin = () => {
    let config

    return {
      name: 'read-config',

      configResolved(resolvedConfig) {
        // store the resolved config
        config = resolvedConfig
      },

      // use stored config in other hooks
      transform(code, id) {
        if (config.command === 'serve') {
          // dev: plugin invoked by dev server
        } else {
          // build: plugin invoked by Rollup
        }
      },
    }
  }
  ```

  Note that the `command` value is `serve` in dev (in the cli `vite`, `vite dev`, and `vite serve` are aliases).

### `configureServer`

- **Type:** `(server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>`
- **Kind:** `async`, `sequential`
- **See also:** ViteDevServer
- **Scope:** Global

  Hook for configuring the dev server. The most common use case is adding custom middlewares to the internal connect app:

  ```js
  const myPlugin = () => ({
    name: 'configure-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // custom handle request...
      })
    },
  })
  ```

  **Injecting Post Middleware**

  The `configureServer` hook is called before internal middlewares are installed, so the custom middlewares will run before internal middlewares by default. If you want to inject a middleware **after** internal middlewares, you can return a function from `configureServer`, which will be called after internal middlewares are installed:

  ```js
  const myPlugin = () => ({
    name: 'configure-server',
    configureServer(server) {
      // return a post hook that is called after internal middlewares are
      // installed
      return () => {
        server.middlewares.use((req, res, next) => {
          // custom handle request...
        })
      }
    },
  })
  ```

  **Storing Server Access**

  In some cases, other plugin hooks may need access to the dev server instance (e.g. accessing the WebSocket server, the file system watcher, or the module graph). This hook can also be used to store the server instance for access in other hooks:

  ```js
  const myPlugin = () => {
    let server
    return {
      name: 'configure-server',
      configureServer(_server) {
        server = _server
      },
      transform(code, id) {
        if (server) {
          // use server...
        }
      },
    }
  }
  ```

  Note `configureServer` is not called when running the production build so your other hooks need to guard against its absence.

### `configurePreviewServer`

- **Type:** `(server: PreviewServer) => (() => void) | void | Promise<(() => void) | void>`
- **Kind:** `async`, `sequential`
- **See also:** PreviewServer
- **Scope:** Global

  Same as `configureServer` but for the preview server. Similarly to `configureServer`, the `configurePreviewServer` hook is called before other middlewares are installed. If you want to inject a middleware **after** other middlewares, you can return a function from `configurePreviewServer`, which will be called after internal middlewares are installed:

  ```js
  const myPlugin = () => ({
    name: 'configure-preview-server',
    configurePreviewServer(server) {
      // return a post hook that is called after other middlewares are
      // installed
      return () => {
        server.middlewares.use((req, res, next) => {
          // custom handle request...
        })
      }
    },
  })
  ```

### `closeServer`

- **Type:** `(context: { reason: 'restart' | 'close' }) => void | Promise<void>`
- **Kind:** `async`, `parallel`
- **Scope:** Global

  Called when the dev server is restarted or closed, after the server has been torn down. Typically used to dispose resources created in `configureServer`.

  The `context.reason` distinguishes the two cases:
  - `'restart'`: the server is restarting (e.g. a config file change or a call to `server.restart()`).
  - `'close'`: the server is shutting down (e.g. the `q` shortcut, or a call to `server.close()`).

  ```js
  const myPlugin = () => {
    let resource
    return {
      name: 'close-server',
      configureServer(server) {
        resource = createResource()
      },
      async closeServer({ reason }) {
        if (reason === 'close') {
          await resource.dispose()
        }
      },
    }
  }
  ```

### `closePreviewServer`

- **Type:** `() => void | Promise<void>`
- **Kind:** `async`, `parallel`
- **Scope:** Global

  Same as `closeServer` but for the preview server. The preview server never restarts, so there is no `reason`.

  ```js
  const myPlugin = () => {
    let resource
    return {
      name: 'close-preview-server',
      configurePreviewServer(server) {
        resource = createResource()
      },
      async closePreviewServer() {
        await resource.dispose()
      },
    }
  }
  ```

### `transformIndexHtml`

- **Type:** `IndexHtmlTransformHook | { order?: 'pre' | 'post', handler: IndexHtmlTransformHook }`
- **Kind:** `async`, `sequential`
- **Scope:** Per-environment

  Dedicated hook for transforming HTML entry point files such as `index.html`. The hook receives the current HTML string and a transform context. The context exposes the `ViteDevServer` instance during dev, and exposes the Rollup output bundle during build.

  The hook can be async and can return one of the following:
  - Transformed HTML string
  - An array of tag descriptor objects (`{ tag, attrs, children }`) to inject to the existing HTML. Each tag can also specify where it should be injected to (default is prepending to `<head>`)
  - An object containing both as `{ html, tags }`

  By default `order` is `undefined`, with this hook applied after the HTML has been transformed. In order to inject a script that should go through the Vite plugins pipeline, `order: 'pre'` will apply the hook before processing the HTML. `order: 'post'` applies the hook after all hooks with `order` undefined are applied.

  **Basic <example-value>:**

  ```js
  const htmlPlugin = () => {
    return {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /<title>(.*?)<\/title>/,
          `<title>Title replaced!</title>`,
        )
      },
    }
  }
  ```

  **Full Hook Signature:**

  ```ts
  type IndexHtmlTransformHook = (
    html: string,
    ctx: {
      path: string
      filename: string
      server?: ViteDevServer
      bundle?: import('rolldown').OutputBundle
      chunk?: import('rolldown').OutputChunk
      originalUrl?: string
    },
  ) =>
    | IndexHtmlTransformResult
    | void
    | Promise<IndexHtmlTransformResult | void>

  type IndexHtmlTransformResult =
    | string
    | HtmlTagDescriptor[]
    | {
        html: string
        tags: HtmlTagDescriptor[]
      }

  interface HtmlTagDescriptor {
    tag: string
    /**
     * attribute values will be escaped automatically if needed
     */
    attrs?: Record<string, string | boolean>
    children?: string | HtmlTagDescriptor[]
    /**
     * default: 'head-prepend'
     */
    injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend'
  }
  ```

**Note**
  This hook won't be called if you are using a framework that has custom handling of entry files (for example SvelteKit).

### `handleHotUpdate`

- **Type:** `(ctx: HmrContext) => Array<ModuleNode> | void | Promise<Array<ModuleNode> | void>`
- **Kind:** `async`, `sequential`
- **See also:** HMR API
- **Scope:** Per-environment

  Perform custom HMR update handling. The hook receives a context object with the following signature:

  ```ts
  interface HmrContext {
    file: string
    timestamp: number
    modules: Array<ModuleNode>
    read: () => string | Promise<string>
    server: ViteDevServer
  }
  ```

  - `modules` is an array of modules that are affected by the changed file. It's an array because a single file may map to multiple served modules (e.g. Vue SFCs).

  - `read` is an async read function that returns the content of the file. This is provided because on some systems, the file change callback may fire too fast before the editor finishes updating the file and direct `fs.readFile` will return empty content. The read function passed in normalizes this behavior.

  The hook can choose to:
  - Filter and narrow down the affected module list so that the HMR is more accurate.

  - Return an empty array and perform a full reload:

    ```js
    handleHotUpdate({ server, modules, timestamp }) {
      // Invalidate modules manually
      const invalidatedModules = new Set()
      for (const mod of modules) {
        server.moduleGraph.invalidateModule(
          mod,
          invalidatedModules,
          timestamp,
          true
        )
      }
      server.ws.send({ type: 'full-reload' })
      return []
    }
    ```

  - Return an empty array and perform complete custom HMR handling by sending custom events to the client:

    ```js
    handleHotUpdate({ server }) {
      server.ws.send({
        type: 'custom',
        event: 'special-update',
        data: {}
      })
      return []
    }
    ```

    Client code should register corresponding handler using the HMR API (this could be injected by the same plugin's `transform` hook):

    ```js
    if (import.meta.hot) {
      import.meta.hot.on('special-update', (data) => {
        // perform custom update
      })
    }
    ```

## Plugin Context Meta

For plugin hooks that have access to the plugin context, Vite exposes additional properties on `this.meta`:

- `this.meta.viteVersion`: The current Vite version string (e.g. `"8.0.0"`).

**Detecting Rolldown powered Vite**

`this.meta.rolldownVersion` is only available for Rolldown powered Vite (i.e. Vite 8+). You can use it to detect whether the current Vite instance is powered by Rolldown:

```ts
function versionCheckPlugin(): Plugin {
  return {
    name: 'version-check',
    buildStart() {
      if (this.meta.rolldownVersion) {
        // only do something if running on a Rolldown powered Vite
      } else {
        // do something else if running on a Rollup powered Vite
      }
    },
  }
}
```

## Output Bundle Metadata

During build, Vite augments Rolldown's build output objects with a Vite-specific `viteMetadata` field.

This is available through:

- `RenderedChunk` (for example in `renderChunk` and `augmentChunkHash`)
- `OutputChunk` and `OutputAsset` (for example in `generateBundle` and `writeBundle`)

`viteMetadata` provides:

- `viteMetadata.importedCss: Set<string>`
- `viteMetadata.importedAssets: Set<string>`

This is useful when writing plugins that need to inspect emitted CSS and static assets without relying on `build.manifest`.

Example:

```ts
function outputMetadataPlugin(): Plugin {
  return {
    name: 'output-metadata-plugin',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const output of Object.values(bundle)) {
        const css = output.viteMetadata?.importedCss
        const assets = output.viteMetadata?.importedAssets
        if (!css?.size && !assets?.size) continue

        console.log(output.fileName, {
          css: css ? [...css] : [],
          assets: assets ? [...assets] : [],
        })
      }
    },
  }
}
```

## Referencing Emitted Assets

To emit an asset from a plugin, call `this.emitFile({ type: 'asset', ... })`. It returns a `referenceId` that you can use to generate the asset's URL, since its final file name isn't known until the bundle is generated.

### In JavaScript

Use `import.meta.ROLLDOWN_FILE_URL_<referenceId>`:

```js
const referenceId = this.emitFile({
  type: 'asset',
  name: 'icon.png',
  source: fileContent,
})

// it's a JavaScript expression, so append any query or hash with string concatenation
return `export default import.meta.ROLLDOWN_FILE_URL_${referenceId} + '#frag'`
```

### In CSS or HTML

`import.meta.ROLLDOWN_FILE_URL_<referenceId>` only works in JavaScript expression position. In CSS or HTML, use the `__VITE_ASSET__<referenceId>__` token <example-value>, appending any query or hash right after it:

```css
background: url(__VITE_ASSET__<referenceId>__#frag);
```

## Plugin Ordering

A Vite plugin can additionally specify an `enforce` property (similar to webpack loaders) to adjust its application order. The value of `enforce` can be either `"pre"` or `"post"`. The resolved plugins will be in the following order:

- Alias
- User plugins with `enforce: 'pre'`
- Vite core plugins
- User plugins without enforce value
- Vite build plugins
- User plugins with `enforce: 'post'`
- Vite post build plugins (minify, manifest, reporting)

Note that this is separate from hooks ordering, those are still separately subject to their `order` attribute as usual for Rolldown hooks.

## Conditional Application

By default plugins are invoked for both serve and build. In cases where a plugin needs to be conditionally applied only during serve or build, use the `apply` property to only invoke them during `'build'` or `'serve'`:

```js
function myPlugin() {
  return {
    name: 'build-only',
    apply: 'build', // or 'serve'
  }
}
```

A function can also be used for more precise control:

```js
apply(config, { command }) {
  // apply only on build but not for SSR
  return command === 'build' && !config.build.ssr
}
```
