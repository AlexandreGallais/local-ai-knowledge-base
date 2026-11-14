---
title: "Modules across platforms (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/modules_across_platforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Modules across platforms (part 2 of 3)

## Transpilers

Earlier sections mentioned transpilers in passing. They convert certain JavaScript syntaxes to other JavaScript syntaxes. Converting between module formats is, of course, a part of their job. Common transpilers, like Babel, SWC, and tsc, are all capable of taking modules written in native ESM syntax and emitting one of the aforementioned module formats.

For example, take the following source code:

```js
// -- src/square.js --
import * as rectangle from "./rectangle";

export function area(side) {
  return rectangle.area(side, side);
}
```

And run a transpiler to produce CJS. It may output the following:

```js
// -- dist/square.js --
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "area", {
  enumerable: true,
  get: function () {
    return area;
  },
});
const _rectangle = /*#__PURE__*/ _interop_require_wildcard(
  require("./rectangle"),
);
// ... definition for _interop_require_wildcard ...
function area(side) {
  return _rectangle.area(side, side);
}
```

Therefore, while you may feel like you are authoring ESM because you are writing `import` and `export` declarations, unless you configured your transpiler to emit native ESM, you may in fact still be writing CJS code (or some other module format). Transpilers typically work on single files only, preserving the module specifiers as-is. This is why code like `import * as rectangle from "./rectangle"` may still work despite the lack of extensions; it eventually gets compiled to `require("./rectangle")`, which is valid CJS.

The goal of transpilers is that you feel like you are writing native ESM as much as possible if both the target module and the importer module are transpiled. Specifically, most transpilers do not always convert `import rectangle from "./rectangle";` to load the whole `module.exports` object. In the output code above, notice the `__esModule` marker. The marker indicates that this CJS module was produced by transpiling ESM syntax. Most transpilers compile default-imports to read `module.exports.default` (i.e., the value exported by a transpiled `export default` declaration) if this marker is present, and `module.exports` otherwise.

The downside is that if only one side is transpiled while the other side is run in Node's native ESM, you may suddenly see rough edges (as mentioned in ESM/CJS interop). For example, a transpiled `export default` can no longer be imported using default-imports in native ESM.

You need to read the documentation for your transpiler or conduct experiments to understand specific rules about how different kinds of `import` and `export` declarations get transpiled.

## Bundlers

While bundlers usually come with transpilers that convert module formats, they go one step further and actually try to understand the dependency graph in order to transform and optimize it.

Starting from one or more entry modules, a bundler follows their dependencies and combines code into output files. The most primitive bundler only outputs a single JavaScript file (the "bundle"), but multiple files may also be emitted, especially when dynamic `import()` is used. Even if you intend to run ESM directly, bundlers are still very useful, because they perform important transformations and optimizations. For example, Vite lets applications written in ESM use CommonJS and UMD dependencies through dependency pre-bundling. During development, Vite serves transformed modules using native ESM; its production build bundles the application for deployment. Bundlers are even useful outside of browsers: even if you are developing a Node library or application, you may still use a bundler to optimize your code size and/or use non-standard syntax.

Bundlers are not JavaScript hosts because they do not _execute_ code. They only statically analyze files. Nevertheless, they have entire sets of rules for dealing with modules that are comparable to browsers or Node.

### Module resolution

Unlike a transpiler that preserves module specifiers, a bundler needs to locate the dependencies it includes.

Most packages for frontend are also managed using Node package managers in the `node_modules` folder, so bundlers understand Node-style package imports by default. They also tend to support both ESM-style and CJS-style resolution simultaneously (i.e., directory imports and extension-less imports), although they may choose to adhere more to one of them if, for example, the module has an explicit `.mjs`/`.cjs` extension.

Bundlers often offer configurable resolution rules. For example, Vite's `resolve.alias` option lets you configure an alias:

```js
// -- vite.config.js --
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@shapes": fileURLToPath(new URL("./src/shapes", import.meta.url)),
    },
  },
});
```

Your source code can then use this alias:

```js
import { area } from "@shapes/square";
```

With this configuration, Vite can resolve the import to `src/shapes/square.js`. The browser doesn't need to understand this alias because Vite rewrites the import during development and resolves it during bundling. However, the original source cannot run directly in a browser without an import map providing an equivalent mapping.

### Optimizing the module graph

Bundlers concatenate all files in the module graph together. If you import `lodash`, you copy the entire source code of Lodash—with over 100 utility functions—into your bundle, which is very costly. Bundlers can remove code that isn't used by the application, commonly called tree shaking. ESM's static imports and exports help the bundler determine which bindings are used.

> **Note:**
> This is a big reason why, if you are publishing a package that's intended to be consumed by bundlers and not run directly, you should publish in ESM syntax so bundlers can understand it more easily.

For example:

```js
// -- big-library --
export function map() {}

export function filter() {}

export function reduce() {}
```

```js
// -- my-app.js --
import { map } from "big-library";
```

The bundler will be able to see that the `filter` and `reduce` exports are never used by your app, and remove them from the final bundle. It can even go one step further and see that even though you imported `map`, you never called it (so it's "dead code") and therefore avoid bundling the entire `big-library`.

> **Note:**
> You may wonder why one would keep this import at all if it's unused. This is because it may be conditionally used, but the condition is known at build time. For example:
>
> ```js
> if (import.meta.env.PROD) {
>   map();
> } else {
>   someOtherCode();
> }
> ```
>
> The `import.meta.env.PROD` value is statically set by the bundler during the build, so if it's `false`, then the final bundle only contains the `someOtherCode()` branch, and the `import` becomes unused.

This doesn't mean the whole module can be discarded: executing the module may have side effects, such as registering an event listener or modifying a global object. So even after dead code elimination you may end up with a side-effect import like `import "big-library";`, and all unused declarations within that module are removed. Some bundlers recognize a `"sideEffects"` field in `package.json` that identifies files whose execution must be preserved. If your package doesn't have side effects on import (including any CSS files that must be applied), you can set `"sideEffects": false`, which allows bundlers to elide the whole `import`.

Bundling doesn't necessarily produce one file. With code splitting, a bundler can put dynamically imported code into separate files, called _chunks_, that are loaded when needed. This is useful because it minimizes the size of code to load on initialization and avoids loading code that may not be used by the user. Some bundlers may automatically split code, but generally you need to explicitly trigger code splitting using dynamic imports:

```js
button.addEventListener("click", async () => {
  const { showChart } = await import("./chart.js");
  showChart();
});
```

Depending on the build configuration, `chart.js` and its dependencies may be emitted separately from the initial application code. The bundler rewrites the import to load the generated chunk:

```js
button.addEventListener("click", async () => {
  // A unique hash is appended for caching purposes
  const { showChart } = await import("./chart-ABCDEF.js");
  showChart();
});
```

You must deploy these additional files as well as the entry file.

The bundler must be able to discover the modules to include during the build. Native `import()` accepts an arbitrary string at runtime, but if you write `import(someVariable)` and the bundler cannot statically determine what values that `someVariable` may be, it may fail to bundle necessary files. Support for variable module specifiers varies between tools. For a known set of modules, explicitly listing the imports makes the dependencies clear:

```js
// A bundler may need to bundle everything under shapes/
const shape = await import(`./shapes/${shapeName}.js`);
```

```js
// The bundler knows exactly which files to bundle
const loaders = {
  square: () => import("./shapes/square.js"),
  circle: () => import("./shapes/circle.js"),
};

const shape = await loaders[shapeName]();
```

Bundlers can also leave dependencies _external_, meaning their code is not included in the bundle. Vite's library mode supports this when publishing a library whose consumers should provide a dependency themselves. If the output still contains `import` or `require()` calls for these dependencies, the runtime must be able to resolve them. A bare specifier left in browser ESM output still needs an import map, even if the bundler could locate that package during the build.

### Non-JavaScript resources

Bundlers can interpret imports of non-JavaScript resources using built-in features or plugins. For example, Vite supports CSS imports and static asset imports:

```js
import "./styles.css";
import logoURL from "./logo.svg";
```

Vite inserts the CSS into the page during development and normally extracts it into a separate stylesheet during the production build. The SVG import returns an asset URL, which may point to an emitted image or be an inlined data URL. These meanings come from the build tool (and you can create custom `module specifier → module object` mapping logic using custom loaders). They are not equivalent to native non-JavaScript module imports, which use import attributes and follow the runtime's module type rules.

Check your bundler's documentation when relying on its module resolution or resource handling. An import that works through a bundler may need different configuration when loaded directly by a runtime. For code intended to run directly in browsers, see Using modules on the web.
