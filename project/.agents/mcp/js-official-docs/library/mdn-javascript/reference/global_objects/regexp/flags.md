---
title: "RegExp.prototype.flags"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/flags/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.flags

The **`flags`** accessor property of `RegExp` instances returns the flags of this regular expression.

```js
// Outputs RegExp flags in alphabetical order

console.log(/foo/gi.flags);
// Expected output: "gi"

console.log(/^bar/muy.flags);
// Expected output: "muy"
```

## Description

`RegExp.prototype.flags` has a string as its value. Flags in the `flags` property are sorted alphabetically (from left to right, e.g., `"dgimsuvy"`). It actually invokes the other flag accessors (`hasIndices`, `global`, etc.) one-by-one and concatenates the results.

All built-in functions read the `flags` property instead of reading individual flag accessors.

The set accessor of `flags` is `undefined`. You cannot change this property directly.

## Examples

### Using flags

```js
/foo/ig.flags; // "gi"
/^bar/myu.flags; // "muy"
```

## See also

- Polyfill of `RegExp.prototype.flags` in `core-js`
- es-shims polyfill of `RegExp.prototype.flags`
- Advanced searching with flags in the Regular expressions guide
- `RegExp.prototype.source`
