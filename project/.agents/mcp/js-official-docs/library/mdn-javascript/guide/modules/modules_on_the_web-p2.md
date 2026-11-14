---
title: "Using modules on the web (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/modules_on_the_web/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using modules on the web (part 2 of 3)

## Importing modules using import maps

In addition to relative and absolute URLs, import maps allow developers to specify almost any text they want in the module specifier when importing a module; the map provides a corresponding value that will replace the text when the module URL is resolved. The import map is defined using a JSON object inside a `<script>` element with the `type` attribute set to `importmap`.

> **Note:**
> An import map only applies to the document — the specification does not define how to apply an import map in a worker or worklet context.

For example, the `imports` key in the import map below defines a "module specifier map" JSON object where the property names can be used as module specifiers, and the corresponding values will be substituted when the browser resolves the module URL.

```html
<script type="importmap">
  {
    "imports": {
      "shapes": "./shapes/square.js",
      "shapes/square": "./modules/shapes/square.js",
      "https://example.com/shapes/square.js": "./shapes/square.js",
      "https://example.com/shapes/": "/shapes/square/",
      "../shapes/square": "./shapes/square.js"
    }
  }
</script>
```

> **Note:**
> From this point on, we'll omit the wrapping `<script type="importmap">` element and directly present import maps as JSON code. Just keep in mind that the JSON must be inlined in the HTML and cannot be an external file referenced with `src`.

With this map, you can now use bare specifiers like `shapes` and `shapes/square`, which would be rejected by default:

```js
// Bare module names as module specifiers
import { name as squareNameOne } from "shapes";
import { name as squareNameTwo } from "shapes/square";

// Remap a URL to another URL
import { name as squareNameThree } from "https://example.com/shapes/square.js";
```

There are many use cases of import maps:

- They allow modules to be imported using bare module names (as in Node.js), allowing modules that import npm packages to be directly deployed to the web (as long as the packages are also accessible at some URL). See Literal matching and Prefix matching.
- They allow modules imported using full URLs to be swapped out with other URLs as necessary, without changing the source code. See General URL remapping.
- They allow particular versions of a library to be imported, based on the path of the script that is importing the module. See The `scopes` object.

This can reduce the effort required to use the same JavaScript libraries in both browser and server.

In addition, the import map also allows module dependencies to have hash integrities (the `integrity` attribute on `<script>` only applies to the entrypoint module). This isn't introduced here because it's not relevant to specifier resolution. See Integrity metadata map.

### Feature detection

You can check support for import maps using the `HTMLScriptElement.supports()` static method (which is itself broadly supported):

```js
if (HTMLScriptElement.supports?.("importmap")) {
  console.log("Browser supports import maps.");
}
```

### The `imports` object

The `imports` property contains an object where each property value is a string. Other data types used as values will become `null`. There are many other conditions, introduced below, that will also cause the value to become `null`. When the resolver hits an entry whose value is `null`, the resolution for that specifier immediately fails.

Each key must be one of two kinds:

- The key does not end in `/`: it will be compared to the specifier as-is.
- The key ends in `/`: it will be compared as a prefix of the specifier. In this case, the value must also end in `/`, otherwise it becomes `null`. More on prefix matching later.

The value must be a URL, resolved relative to the base URL of the document containing the import map. If URL parsing failed, the value becomes `null`. (Note that relative URLs can be "bare"; only module specifiers aren't allowed to be bare.)

The property order of the `imports` object does not matter: internally, they are always sorted in descending lexicographic order by keys. During resolution, the properties are matched in order.

#### Literal matching

Suppose the following `<script>` element is included in the page at `https://example.com/welcome`.

```json
{
  "imports": {
    "square": "./shapes/square.js"
  }
}
```

Here, we use a relative URL as the value, which is resolved relative to the document's base URL, so it's equivalent to writing `https://example.com/welcome/shapes/square.js`. Had this `<script>` element been contained in the page `https://example.com/welcome/`, the value would be equivalent to `https://example.com/welcome/shapes/square.js` instead.

Now when the specifier resolver encounters a specifier like the following:

```js
import { name, draw, reportArea, reportPerimeter } from "square";
```

It will go through the `imports` entries one-by-one (of which there's only one), see that the `"square"` key is equal to the requested specifier, and use its value. The module at `https://example.com/shapes/square.js` will now be requested.

#### Prefix matching

If the key has a trailing slash `/` (in which case the value also needs a trailing slash), then in addition to literal matching, it can be matched as a prefix.

For example, consider the following import map:

```json
{
  "imports": {
    "shapes/": "./shapes/"
  }
}
```

Again, the relative URL value is resolved at the time the import map is parsed, relative to the document URL, so it's equivalent to writing `https://example.com/shapes/`.

Now when the specifier resolver encounters a specifier like the following:

```js
import { name as squareNameFour } from "shapes/square.js";
```

It will go through the `imports` entries one-by-one (of which there's only one), see that the `"shapes/"` key is a prefix of the requested specifier, and use its mapped value. The key <example-value> is stripped from the specifier, leaving `square.js`. This remainder is resolved using the mapped value (`https://example.com/shapes/`) as the base URL. The module at `https://example.com/shapes/square.js` will now be requested.

The remainder of the specifier is not allowed to "escape" the mapped value. For example, if you write the following:

```js
import { name as squareNameFour } from "shapes/../square.js";
```

Then the remainder is `../square.js`, which when resolved relative to `https://example.com/shapes/` will give `https://example.com/square.js`. The mapped value is no longer a prefix of the final URL. The resolver will throw an error in this case.

Keys ending in `/` can still be matched literally. For example:

```js
import { name as squareNameFour } from "shapes/";
```

The resolver will resolve this to `https://example.com/shapes/` and request that URL.

Once again, the entries of the `imports` object is always sorted such that if key A is a prefix of key B, then B comes before A, so with the following import map:

```json
{
  "imports": {
    "shapes/": "./shapes/",
    "shapes/square/": "./squares/"
  }
}
```

The module specifier `shapes/square/index.js` will still match the more-specific `shapes/square/` in priority to `shapes/`.

#### Mixing literal matching and prefix matching

In Node, you can import either a package itself, which imports the `main` file, or a file inside the package (assuming the package.json has no `exports` field):

```js
import _ from "lodash";
import fp from "lodash/fp.js";
```

In this case, you must provide separate entries for `lodash` and the `lodash/` prefix:

```json
{
  "imports": {
    "lodash": "/node_modules/lodash-es/lodash.js",
    "lodash/": "/node_modules/lodash-es/"
  }
}
```

#### General URL remapping

The key does not need to be a bare name. It can also be an absolute or relative URL. Given the following import map:

```json
{
  "imports": {
    "https://www.unpkg.com/lodash/": "/node_modules/lodash-es/"
  }
}
```

Now when the specifier resolver encounters a specifier like the following:

```js
import { name as squareNameFour } from "https://www.unpkg.com/lodash/fp.js";
```

It will use the corresponding prefix entry and resolve this to `https://example.com/node_modules/lodash-es/fp.js`. This is especially useful for testing because you can mock a module with an alternative version.

URL remapping is also helpful for removing hashes from the module name. Script files used by websites often have hashed filenames to simplify caching. The downside of this approach is that if a module changes, any modules that import it using its hashed filename will also need to be updated/regenerated. This potentially results in a cascade of updates, which is wasteful of network resources.

Import maps provide a convenient solution to this problem. Rather than depending on specific hashed filenames, applications and scripts instead depend on an un-hashed version of the module name. An import map like the one below then provides a mapping to the actual script file.

```json
{
  "imports": {
    "/node/srcs/application.js": "/node/srcs/application-fg7744e1b.js",
    "/node/srcs/dependency.js": "/node/srcs/dependency-3qn7e4b1q.js"
  }
}
```

If `dependency.js` changes, then its hash contained in the file name changes as well. In this case, we only need to update the import map to reflect the changed name of the module. The JavaScript source code continues to import from `"/node/srcs/dependency.js"`.

Unfortunately, import maps don't provide "suffix matching", so you can't say something like "replace `application.js` with `application-fg7744e1b.js`, whatever the path before it is". You must now always import from `/node/srcs/application.js` instead of `./application.js`, `https://example.com/node/srcs/application.js`, etc. Ultimately, you may still find that using a bundler to compile the code and rewrite the imports to be more convenient.

### The `scopes` object

The `imports` object is global: the remapping is applied to all modules in the application, regardless of where they live. The same `lodash` specifier always resolves to the same module.

In real life, different modules may want to import different versions of the `lodash` package. For example, package A may depend on `lodash` v3, while package B may depend on `lodash` v4. In Node, this is achieved by giving each package its own `node_modules`:

```plain
https://example.com
└── node_modules
    ├── lodash          <-- v4; your application and package B will use this
    ├── package-a
    │   └── node_modules
    │       └── lodash  <-- v3; package A will use this
    └── package-b
```

To directly deploy this `node_modules` to your website without rewriting its source code, you must write the import map such that modules within `package-a` will have their `lodash` specifier resolve to a different address from `package-b`. You implement this with the `scopes` object, like the following:

```json
{
  "imports": {
    "lodash": "/node_modules/lodash/lodash.js"
  },
  "scopes": {
    "/node_modules/package-a/": {
      "lodash": "/node_modules/package-a/lodash/lodash.js"
    }
  }
}
```

Within the `scopes` object, each key is a scope, and each value is a module specifier map, just like `imports`. Just like keys of `imports`:

- The scope can either not end in `/`, in which case it's matched literally against the importer's URL, or it can end in `/`, in which case it can additionally match as a prefix of the importer's URL.
- The scope keys are sorted in descending lexicographic order (after URL resolution), so more specific prefixes match in priority to less specific ones.

The only difference is that scopes must be valid URLs which are resolved relative to the document base URL.

The scopes are attempted in order: if a scope doesn't provide the corresponding import mapping for the requested specifier, the resolver moves to the next matching scope, if any. If no scope key <example-value> the importer, or if all matching scopes don't provide the import mapping, then the global `imports` map is used. However, if it does hit an entry anywhere in this process, but the value is `null` (e.g., if the value isn't a valid URL), resolution fails immediately without falling back.

So for example, in the example above, the scope key is `/node_modules/package-a/`, which is resolved to `https://example/node_modules/package-a/`. If the module at `https://example.com/node_modules/package-a/index.js` contains:

```js
import _ from "lodash";
```

The resolver will look at the `scopes` in priority, see that the importer's URL is a prefix of the scope key, and use its specifier map, which defines that `lodash` should map to `https://example.com/node_modules/package-a/lodash/lodash.js`, the v3 version.

On the other hand, if the module at `https://example.com/node_modules/package-b/index.js` contains the same line, then the resolver will check `scopes` and find no matching key, and fall back to the global `imports` map, which imports `https://example.com/node_modules/lodash/lodash.js`, the v4 version.

Note that the scope key is only used to match the importer's URL; it does not provide the base URL for resolving or validating any other URL. The final mapped URL does not have to match the scope path, and relative mapped URLs are still resolved to the base URL of the script that contains the import map.
