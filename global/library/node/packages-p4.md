---
title: "Modules: Packages (part 4 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/packages.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: Packages (part 4 of 4)

## Node.js `package.json` field definitions

This section describes the fields used by the Node.js runtime. Other tools (such
as npm) use
additional fields which are ignored by Node.js and not documented here.

The following fields in `package.json` files are used in Node.js:

* `"name"` - Relevant when using named imports within a package. Also used
  by package managers as the name of the package.
* `"main"` - The default module when loading the package, if exports is not
  specified, and in versions of Node.js prior to the introduction of exports.
* `"type"` - The package type determining whether to load `.js` files as
  CommonJS or ES modules.
* `"exports"` - Package exports and conditional exports. When present,
  limits which submodules can be loaded from within the package.
* `"imports"` - Package imports, for use by modules within the package
  itself.

### `"name"`

* Type: {string}

```json
{
  "name": "package-name"
}
```

The `"name"` field defines your package's name. Publishing to the
_npm_ registry requires a name that satisfies
certain requirements.

The `"name"` field can be used in addition to the `"exports"` field to
self-reference a package using its name.

### `"main"`

* Type: {string}

```json
{
  "main": "./index.js"
}
```

The `"main"` field defines the entry point of a package when imported by name
via a `node_modules` lookup.  Its value is a path.

The `"exports"` field, if it exists, takes precedence over the
`"main"` field when importing the package by name.

It also defines the script that is used when the package directory is loaded
via `require()`.

```cjs
// This resolves to ./path/to/directory/index.js.
require('./path/to/directory');
```

### `"type"`

* Type: {string}

The `"type"` field defines the module format that Node.js uses for all
`.js` files that have that `package.json` file as their nearest parent.

Files ending with `.js` are loaded as ES modules when the nearest parent
`package.json` file contains a top-level field `"type"` with a value of
`"module"`.

The nearest parent `package.json` is defined as the first `package.json` found
when searching in the current folder, that folder's parent, and so on up
until a node\_modules folder or the volume root is reached.

```json
// package.json
{
  "type": "module"
}
```

```bash
# In same folder as preceding package.json
node my-app.js # Runs as ES module
```

If the nearest parent `package.json` lacks a `"type"` field, or contains
`"type": "commonjs"`, `.js` files are treated as CommonJS. If the volume
root is reached and no `package.json` is found, `.js` files are treated as
CommonJS.

`import` statements of `.js` files are treated as ES modules if the nearest
parent `package.json` contains `"type": "module"`.

```js
// my-app.js, part of the same example as above
import './startup.js'; // Loaded as ES module because of package.json
```

Regardless of the value of the `"type"` field, `.mjs` files are always treated
as ES modules and `.cjs` files are always treated as CommonJS.

### `"exports"`

* Type: {Object|string|string\[]}

```json
{
  "exports": "./index.js"
}
```

The `"exports"` field allows defining the entry points of a package when
imported by name loaded either via a `node_modules` lookup or a
self-reference to its own name. It is supported in Node.js 12+ as an
alternative to the `"main"` that can support defining subpath exports
and conditional exports while encapsulating internal unexported modules.

Conditional Exports can also be used within `"exports"` to define different
package entry points per environment, including whether the package is
referenced via `require` or via `import`.

All paths defined in the `"exports"` must be relative file URLs starting with
`./`.

### `"imports"`

* Type: {Object}

```json
// package.json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
```

Entries in the imports field must be strings starting with `#`.

Package imports permit mapping to external packages.

This field defines subpath imports for the current package.
