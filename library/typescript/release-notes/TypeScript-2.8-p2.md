---
title: "TypeScript 2.8 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 2.8.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 2.8 (part 2 of 2)

## Prototype assignment

You can assign an object literal directly to the prototype property. Individual prototype assignments still work too:

```ts
var C = function(p) {
  this.p = p;
};
C.prototype = {
  m() {
    console.log(this.p);
  }
};
C.prototype.q = function(r) {
  return this.p === r;
};
```

## Nested and merged declarations

Nesting works to any level now, and merges correctly across files. Previously neither was the case.

```js
var app = window.app || {};
app.C = class {};
```

## Per-file JSX factories

TypeScript 2.8 adds support for a per-file configurable JSX factory name using `@jsx dom` pragma.
JSX factory can be configured for a compilation using `jsxFactory` (default is `React.createElement`). With TypeScript 2.8 you can override this on a per-file-basis by adding a comment to the beginning of the file.

##### Example

```ts
/** @jsx dom */
import { dom } from "./renderer";
<h></h>;
```

Generates:

```js
var renderer_1 = require("./renderer");
renderer_1.dom("h", null);
```

## Locally scoped JSX namespaces

JSX type checking is driven by definitions in a JSX namespace, for instance `JSX.Element` for the type of a JSX element, and `JSX.IntrinsicElements` for built-in elements.
Before TypeScript 2.8 the `JSX` namespace was expected to be in the global namespace, and thus only allowing one to be defined in a project.
Starting with TypeScript 2.8 the `JSX` namespace will be looked under the `jsxNamespace` (e.g. `React`) allowing for multiple jsx factories in one compilation.
For backward compatibility the global `JSX` namespace is used as a fallback if none was defined on the factory function.
Combined with the per-file `@jsx` pragma, each file can have a different JSX factory.

## New `--emitDeclarationOnly`

`emitDeclarationOnly` allows for _only_ generating declaration files; `.js`/`.jsx` output generation will be skipped with this flag. The flag is useful when the `.js` output generation is handled by a different transpiler like Babel.
