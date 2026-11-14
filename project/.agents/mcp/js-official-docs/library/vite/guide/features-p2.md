---
title: "Features (part 2 of 3)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/features.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Features (part 2 of 3)

## CSS

Importing `.css` files will inject its content to the page via a `<style>` tag with HMR support.

### `@import` Inlining and Rebasing

Vite is pre-configured to support CSS `@import` inlining via `postcss-import`. Vite aliases are also respected for CSS `@import`. In addition, all CSS `url()` references, even if the imported files are in different directories, are always automatically rebased to ensure correctness.

`@import` aliases and URL rebasing are also supported for Sass and Less files (see CSS Pre-processors).

### PostCSS

If the project contains valid PostCSS config (any format supported by postcss-load-config, e.g. `postcss.config.js`), it will be automatically applied to all imported CSS.

Note that CSS minification will run after PostCSS and will use the `build.cssTarget` option.

### CSS Modules

Any CSS file ending with `.module.css` is considered a CSS modules file. Importing such a file will return the corresponding module object:

```css
.red {
  color: red;
}
```

```js
import 'vite/client'
// ---cut---
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

CSS modules behavior can be configured via the `css.modules` option.

If `css.modules.localsConvention` is set to enable camelCase locals (e.g. `localsConvention: 'camelCaseOnly'`), you can also use named imports:

```js
import 'vite/client'
// ---cut---
// .apply-color -> applyColor
import { applyColor } from './example.module.css'
document.getElementById('foo').className = applyColor
```

### CSS Pre-processors

Because Vite targets modern browsers only, it is recommended to use native CSS variables with PostCSS plugins that implement CSSWG drafts (e.g. postcss-nesting) and author plain, future-standards-compliant CSS.

That said, Vite does provide built-in support for `.scss`, `.sass`, `.less`, `.styl` and `.stylus` files. There is no need to install Vite-specific plugins for them, but the corresponding pre-processor itself must be installed:

```bash
# .scss and .sass
npm add -D sass-embedded # recommended for performance
npm add -D sass # if the platform is not supported

# .less
npm add -D less

# .styl and .stylus
npm add -D stylus
```

If using Vue single file components, this also automatically enables `<style lang="sass">` et al.

Vite improves `@import` resolving for Sass and Less so that Vite aliases are also respected. In addition, relative `url()` references inside imported Sass/Less files that are in different directories from the root file are also automatically rebased to ensure correctness. Rebasing `url()` references that start with a variable or an interpolation is not supported due to its API constraints.

`@import` alias and url rebasing are not supported for Stylus due to its API constraints.

You can also use CSS modules combined with pre-processors by prepending `.module` to the file extension, for example `style.module.scss`.

### Disabling CSS injection into the page

The automatic injection of CSS contents can be turned off via the `?inline` query parameter. In this case, the processed CSS string is returned as the module's default export as usual, but the styles aren't injected to the page.

```js
import 'vite/client'
// ---cut---
import './foo.css' // will be injected into the page
import otherStyles from './bar.css?inline' // will not be injected
```

**NOTE**
Default and named imports from CSS files (e.g `import style from './foo.css'`) are removed since Vite 5. Use the `?inline` query instead.

### Lightning CSS

Vite uses Lightning CSS to minify CSS in production builds by default. However, PostCSS is still used for other CSS processing.

There is experimental support for using Lightning CSS for CSS processing entirely. You can opt into it by adding `css.transformer: 'lightningcss'`.

To configure it, you can pass <example-value> CSS options to the `css.lightningcss` config option. To configure CSS Modules, you should use `css.lightningcss.cssModules` instead of `css.modules` (which configures the way PostCSS handles CSS modules).

## Static Assets

<ScrimbaLink href="https://scrimba.com/intro-to-vite-c03p6pbbdq/~05pq?via=vite" title="Static Assets in Vite">Watch an interactive lesson on Scrimba</ScrimbaLink>

Importing a static asset will return the resolved public URL when it is served:

```js
import 'vite/client'
// ---cut---
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

Special queries can modify how assets are loaded:

```js
import 'vite/client'
// ---cut---
// Explicitly load assets as URL (automatically inlined depending on the file size)
import assetAsURL from './asset.js?url'
```

```js
import 'vite/client'
// ---cut---
// Load assets as strings
import assetAsString from './shader.glsl?raw'
```

```js
import 'vite/client'
// ---cut---
// Load Web Workers
import Worker from './worker.js?worker'
```

```js
import 'vite/client'
// ---cut---
// Web Workers inlined as base64 strings at build time
import InlineWorker from './worker.js?worker&inline'
```

More details in Static Asset Handling.

## JSON

JSON files can be directly imported - named imports are also supported:

```js
import 'vite/client'
// ---cut---
// import the entire object
import json from './example.json'
// import a root field as named exports - helps with tree-shaking!
import { field } from './example.json'
```

## Glob Import

Vite supports importing multiple modules from the file system via the special `import.meta.glob` function:

```js
import 'vite/client'
// ---cut---
const modules = import.meta.glob('./dir/*.js')
```

The above will be transformed into the following:

```js
// code produced by vite
const modules = {
  './dir/bar.js': () => import('./dir/bar.js'),
  './dir/foo.js': () => import('./dir/foo.js'),
}
```

You can then iterate over the keys of the `modules` object to access the corresponding modules:

```js
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```

Matched files are by default lazy-loaded via dynamic import and will be split into separate chunks during build. If you'd rather import all the modules directly (e.g. relying on side-effects in these modules to be applied first), you can pass `{ eager: true }` as the second argument:

```js
import 'vite/client'
// ---cut---
const modules = import.meta.glob('./dir/*.js', { eager: true })
```

The above will be transformed into the following:

```js
// code produced by vite
import * as __vite_glob_0_0 from './dir/bar.js'
import * as __vite_glob_0_1 from './dir/foo.js'
const modules = {
  './dir/bar.js': __vite_glob_0_0,
  './dir/foo.js': __vite_glob_0_1,
}
```

### Multiple Patterns

The first argument can be an array of globs, for example

```js
import 'vite/client'
// ---cut---
const modules = import.meta.glob(['./dir/*.js', './another/*.js'])
```

### Negative Patterns

Negative glob patterns are also supported (prefixed with `!`). To ignore some files from the result, you can add exclude glob patterns to the first argument:

```js
import 'vite/client'
// ---cut---
const modules = import.meta.glob(['./dir/*.js', '!**/bar.js'])
```

```js
// code produced by vite
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
}
```

#### Named Imports

It's possible to only import parts of the modules with the `import` options.

```ts
import 'vite/client'
// ---cut---
const modules = import.meta.glob('./dir/*.js', { import: 'setup' })
```

```ts
// code produced by vite
const modules = {
  './dir/bar.js': () => import('./dir/bar.js').then((m) => m.setup),
  './dir/foo.js': () => import('./dir/foo.js').then((m) => m.setup),
}
```

When combined with `eager` it's even possible to have tree-shaking enabled for those modules.

```ts
import 'vite/client'
// ---cut---
const modules = import.meta.glob('./dir/*.js', {
  import: 'setup',
  eager: true,
})
```

```ts
// code produced by vite:
import { setup as __vite_glob_0_0 } from './dir/bar.js'
import { setup as __vite_glob_0_1 } from './dir/foo.js'
const modules = {
  './dir/bar.js': __vite_glob_0_0,
  './dir/foo.js': __vite_glob_0_1,
}
```

Set `import` to `default` to import the default export.

```ts
import 'vite/client'
// ---cut---
const modules = import.meta.glob('./dir/*.js', {
  import: 'default',
  eager: true,
})
```

```ts
// code produced by vite:
import { default as __vite_glob_0_0 } from './dir/bar.js'
import { default as __vite_glob_0_1 } from './dir/foo.js'
const modules = {
  './dir/bar.js': __vite_glob_0_0,
  './dir/foo.js': __vite_glob_0_1,
}
```

#### Custom Queries

You can also use the `query` option to provide queries to imports, for example, to import assets as a string or as a url:

```ts
import 'vite/client'
// ---cut---
const moduleStrings = import.meta.glob('./dir/*.svg', {
  query: '?raw',
  import: 'default',
})
const moduleUrls = import.meta.glob('./dir/*.svg', {
  query: '?url',
  import: 'default',
})
```

```ts
// code produced by vite:
const moduleStrings = {
  './dir/bar.svg': () => import('./dir/bar.svg?raw').then((m) => m['default']),
  './dir/foo.svg': () => import('./dir/foo.svg?raw').then((m) => m['default']),
}
const moduleUrls = {
  './dir/bar.svg': () => import('./dir/bar.svg?url').then((m) => m['default']),
  './dir/foo.svg': () => import('./dir/foo.svg?url').then((m) => m['default']),
}
```

You can also provide custom queries for other plugins to consume:

```ts
import 'vite/client'
// ---cut---
const modules = import.meta.glob('./dir/*.js', {
  query: { foo: 'bar', bar: true },
})
```

#### Base Path

You can also use the `base` option to provide base path for the imports:

```ts
import 'vite/client'
// ---cut---
const modulesWithBase = import.meta.glob('./**/*.js', {
  base: './base',
})
```

```ts
// code produced by vite:
const modulesWithBase = {
  './dir/foo.js': () => import('./base/dir/foo.js'),
  './dir/bar.js': () => import('./base/dir/bar.js'),
}
```

The base option can only be a directory path relative to the importer file or absolute against the project root. Aliases and virtual modules aren't supported.

Only the globs that are relative paths are interpreted as relative to the resolved base.

All the resulting module keys are modified to be relative to the base if provided.

#### Case Sensitive Matching

By default, glob pattern matching is case-sensitive. You can use the `caseSensitive` option to change this behavior:

```ts
import 'vite/client'
// ---cut---
const modules = import.meta.glob('./dir/module*.js', {
  caseSensitive: false,
})
```

With `caseSensitive: false`, the glob will match files regardless of case (e.g., `Module.js`, `module.js`, `MODULE.js` will all be matched by `module*.js`).

### Glob Import Caveats

Note that:

- This is a Vite-only feature and is not a web or ES standard.
- The glob patterns are treated like import specifiers: they must be either relative (start with `./`) or absolute (start with `/`, resolved relative to project root) or an alias path (see `resolve.alias` option).
- The glob matching is done via `tinyglobby` - check out its documentation for supported glob patterns.
- You should also be aware that all the arguments in the `import.meta.glob` must be **passed as literals**. You can NOT use variables or expressions in them.

## Dynamic Import

Similar to glob import, Vite also supports dynamic import with variables.

```ts
const module = await import(`./dir/${file}.js`)
```

Note that variables only represent file names one level deep. If `file` is `'foo/bar'`, the import would fail. For more advanced usage, you can use the glob import feature.

Also note that the dynamic import must match the following rules to be bundled:

- Imports must start with `./` or `../` or `#`: ``import(`./dir/${foo}.js`)`` is valid, but ``import(`${foo}.js`)`` is not.
- Imports must end with a file extension: ``import(`./dir/${foo}.js`)`` is valid, but ``import(`./dir/${foo}`)`` is not.
- Imports to the own directory must specify a file name pattern: ``import(`./prefix-${foo}.js`)`` is valid, but ``import(`./${foo}.js`)`` is not.

These rules are enforced to prevent accidentally importing files that are not intended to be bundled. For example, without these rules, `import(foo)` would bundle everything in the file system.
