---
title: "import.meta"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/import.meta/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# import.meta

The **`import.meta`** meta-property exposes context-specific metadata to a JavaScript module. It contains information about the module, such as the module's URL.

## Syntax

```js
import.meta
```

### Value

The `import.meta` object is created by the host environment, as an extensible `null`-prototype object where all properties are writable, configurable, and enumerable. The spec doesn't specify any properties to be defined on it, but hosts usually implement the following properties:

- `url`
    The full URL to the module, includes query parameters and/or hash (following the `?` or `#`). In browsers, this is either the URL from which the script was obtained (for external scripts), or the document's base URL when the module script was created (for inline scripts). In Node.js, file-based modules use a `file:` URL, while modules loaded from other supported URL schemes use their corresponding URLs.
- `resolve`
    Resolves a module specifier to a URL using the current module's URL as base.

## Description

The `import.meta` syntax consists of the keyword `import`, a dot, and the identifier `meta`. Because `import` is a reserved word, not an identifier, this is not a property accessor, but a special expression syntax.

The `import.meta` meta-property is available in JavaScript modules; using `import.meta` outside of a module (including direct `eval()` within a module) is a syntax error.

## Examples

### Passing query parameters

Using query parameters in the `import` specifier allows module-specific argument passing, which may be complementary to reading parameters from the application-wide `window.location` (or on Node.js, through `process.argv`). For example, with the following HTML:

```html
<script type="module">
  import "./index.mjs?someURLInfo=5";
</script>
```

The `index.mjs` module is able to retrieve the `someURLInfo` parameter through `import.meta`:

```js
// -- index.mjs --
new URL(import.meta.url).searchParams.get("someURLInfo"); // 5
```

The same applies when a module imports another:

```js
// -- index.mjs --
import "./index2.mjs?someURLInfo=5";

// -- index2.mjs --
new URL(import.meta.url).searchParams.get("someURLInfo"); // 5
```

The ES module implementation in Node.js supports resolving module specifiers containing query parameters (or the hash), as in the latter example. However, you cannot use queries or hashes when the module is specified through the CLI command (like `node index.mjs?someURLInfo=5`), because the CLI entrypoint uses a more CommonJS-like resolution mode, treating the path as a file path rather than a URL. To pass <example-value> to the entrypoint module, use CLI arguments and read them through `process.argv` instead (like `node index.mjs --someURLInfo=5`).

### Resolving a file relative to the current one

In Node.js CommonJS modules, there's a `__dirname` variable that contains the absolute path to the folder containing current module, which is useful for resolving relative paths. However, Node.js does not provide this variable in ES modules. To resolve a relative file you can use `import.meta.url`. Note that this uses URLs rather than filesystem paths.

Before (CommonJS):

```js
const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "someFile.txt");
fs.readFile(filePath, "utf8").then(console.log);
```

After (ES modules):

```js
import fs from "node:fs/promises";

const fileURL = new URL("./someFile.txt", import.meta.url);
fs.readFile(fileURL, "utf8").then(console.log);
```

## See also

- `import`
- `export`
