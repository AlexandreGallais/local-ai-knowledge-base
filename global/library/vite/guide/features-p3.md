---
title: "Features (part 3 of 3)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/features.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Features (part 3 of 3)

## WebAssembly

Vite supports importing pre-compiled `.wasm` files in two ways: directly as an ES module when you only need the module's exports, or with `?init` when you need explicit control over instantiation.

### ESM Integration

A `.wasm` file can be imported directly. Vite reads the module's imports and exports from the binary, instantiates it, and re-exposes its exports as named ES module exports:

```js
import { add } from './add.wasm'

console.log(add(1, 2)) // 3
```

If the WebAssembly module declares imports of its own, Vite resolves them from JavaScript modules. Each import's module name is treated as an import specifier (resolved relative to the `.wasm` file) and the requested members are wired into the instance automatically.

This follows the WebAssembly/ES Module Integration proposal. Because a WebAssembly module is instantiated asynchronously, a directly imported `.wasm` file behaves as an async module and requires top-level `await` support.

**TypeScript support**

Since the types of `.wasm` files are unknown, TypeScript will report errors like `Module '"*.wasm"' has no exported member 'add'`. To fix this, enable `allowArbitraryExtensions` in your `tsconfig.json` and create a declaration file next to your `.wasm` file. With `allowArbitraryExtensions` enabled, TypeScript will look for a declaration file named `{filename}.d.wasm.ts` when resolving a `.wasm` import. For example, for `add.wasm`, create `add.d.wasm.ts`:

```ts
export function add(a: number, b: number): number
```

### Manual Initialization

When you need control over when and how the module is instantiated, import it with `?init`. The default export will be an initialization function that returns a Promise of the `WebAssembly.Instance`:

```js
import 'vite/client'
// ---cut---
import init from './example.wasm?init'

init().then((instance) => {
  instance.exports.test()
})
```

The init function can also take an importObject which is passed along to `WebAssembly.instantiate` as its second argument:

```js
import 'vite/client'
import init from './example.wasm?init'
// ---cut---
init({
  imports: {
    someFunc: () => {
      /* ... */
    },
  },
}).then(() => {
  /* ... */
})
```

In the production build, `.wasm` files smaller than `assetsInlineLimit` will be inlined as base64 strings. Otherwise, they will be treated as a static asset and fetched on-demand.

**For SSR build, Node.js compatible runtimes are only supported**

Due to the lack of a universal way to load a file, the internal implementation for both direct `.wasm` imports and `.wasm?init` relies on the `node:fs` module. This means that these features will only work in Node.js compatible runtimes for SSR builds.

### Accessing the WebAssembly Module

If you need access to the `Module` object, e.g. to instantiate it multiple times, use an explicit URL import to resolve the asset, and then perform the instantiation:

```js
import 'vite/client'
// ---cut---
import wasmUrl from 'foo.wasm?url'

const main = async () => {
  const responsePromise = fetch(wasmUrl)
  const { module, instance } =
    await WebAssembly.instantiateStreaming(responsePromise)
  /* ... */
}

main()
```

## Web Workers

### Import with Constructors

A web worker script can be imported using `new Worker()` and `new SharedWorker()`. Compared to the worker suffixes, this syntax leans closer to the standards and is the **recommended** way to create workers.

```ts
const worker = new Worker(new URL('./worker.js', import.meta.url))
```

The worker constructor also accepts options, which can be used to create "module" workers:

```ts
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
})
```

The worker detection will only work if the `new URL()` constructor is used directly inside the `new Worker()` declaration. Otherwise it is handled as a static asset URL instead. Additionally, all options parameters must be static values (i.e. string literals).

### Import with Query Suffixes

A web worker script can be directly imported by appending `?worker` or `?sharedworker` to the import request. The default export will be a custom worker constructor:

```js
import 'vite/client'
// ---cut---
import MyWorker from './worker?worker'

const worker = new MyWorker()
```

The worker script can also use ESM `import` statements instead of `importScripts()`. **Note**: During development this relies on browser native support, but for the production build it is compiled away.

By default, the worker script will be emitted as a separate chunk in the production build. If you wish to inline the worker as base64 strings, add the `inline` query:

```js
import 'vite/client'
// ---cut---
import MyWorker from './worker?worker&inline'
```

If you wish to retrieve the worker as a URL, add the `url` query:

```js
import 'vite/client'
// ---cut---
import MyWorker from './worker?worker&url'
```

See Worker Options for details on configuring the bundling of all workers.

## Content Security Policy (CSP)

To deploy CSP, certain directives or configs must be set due to Vite's internals.

### `'nonce-{RANDOM}'`

When `html.cspNonce` is set, Vite adds a nonce attribute with the specified value to any `<script>` and `<style>` tags, as well as `<link>` tags for stylesheets and module preloading. Additionally, when this option is set, Vite will inject a meta tag (`<meta property="csp-nonce" nonce="PLACEHOLDER" />`).

The nonce value of a meta tag with `property="csp-nonce"` will be used by Vite whenever necessary during both dev and after build.

**Warning:**
Ensure that you replace the placeholder with a unique value for each request. This is important to prevent bypassing a resource's policy, which can otherwise be easily done.

### `data:`

By default, during build, Vite inlines small assets as data URIs. Allowing `data:` for related directives (e.g. `img-src`, `font-src`), or, disabling it by setting `build.assetsInlineLimit: 0` is necessary.

**Warning:**
Do not allow `data:` for `script-src`. It will allow injection of arbitrary scripts.

## License

Vite can generate a file of all the dependencies' licenses used in the build with the `build.license` option. It can be hosted to display and acknowledge the dependencies used by the app.

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    license: true,
  },
})
```

This will generate a `.vite/license.md` file with an output that may look like this:

```md
# Licenses

The app bundles dependencies which contain the following licenses:

## dep-1 - 1.2.3 (CC0-1.0)

CC0 1.0 Universal

...

## dep-2 - 4.5.6 (MIT)

MIT License

...
```

To serve the file at a different path, you can pass `{ fileName: 'license.md' }` for example, so that it's served at `https://example.com/license.md`. See the `build.license` docs for more information.

## Build Optimizations

> Features listed below are automatically applied (except for the experimental chunk import map feature) as part of the build process and there is no need for explicit configuration unless you want to disable them.

### CSS Code Splitting

Vite automatically extracts the CSS used by modules in an async chunk and generates a separate file for it. The CSS file is automatically loaded via a `<link>` tag when the associated async chunk is loaded, and the async chunk is guaranteed to only be evaluated after the CSS is loaded to avoid FOUC.

If you'd rather have all the CSS extracted into a single file, you can disable CSS code splitting by setting `build.cssCodeSplit` to `false`.

### Preload Directives Generation

Vite automatically generates `<link rel="modulepreload">` directives for entry chunks and their direct imports in the built HTML.

### Async Chunk Loading Optimization

In real world applications, Rollup often generates "common" chunks - code that is shared between two or more other chunks. Combined with dynamic imports, it is quite common to have the following scenario:

In the non-optimized scenarios, when async chunk `A` is imported, the browser will have to request and parse `A` before it can figure out that it also needs the common chunk `C`. This results in an extra network roundtrip:

```
Entry ---> A ---> C
```

Vite automatically rewrites code-split dynamic import calls with a preload step so that when `A` is requested, `C` is fetched **in parallel**:

```
Entry ---> (A + C)
```

It is possible for `C` to have further imports, which will result in even more roundtrips in the un-optimized scenario. Vite's optimization will trace all the direct imports to completely eliminate the roundtrips regardless of import depth.

### Chunk Import Map Optimization

To improve the cache hit rate of chunks, Vite can create an import map for chunks. This prevents the cascading cache invalidation issue, which is a problem with ES Modules.

For example, consider the following scenario:

```
Entry --> A ---> C
```

If `C` is updated, the only chunk that inherently needs to be invalidated is `C`. However, if `A` references `C` via a normal URL in a static import (i.e. the hash of `C` is included in the URL), the content of `A` is changed, thus `A` would also need to be invalidated. The same applies to `Entry`.

By utilizing the import maps feature, this issue can be avoided. When this optimization is enabled, Vite will create an import map that maps each chunk's ID to its URL and uses the chunk ID in the import statements instead of the URL. This way, when a chunk is updated, only the updated chunk needs to be invalidated, while the chunks that reference it will not be invalidated.

Note that this optimization currently does not apply to CSS and assets. If you update an asset, the chunks that reference it will be invalidated. That said, the invalidation would not cascade and the chunk importing the invalidated chunk would not be invalidated.

To enable this feature, set `build.chunkImportMap` to `true`.
