---
title: "console: dir() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/dir_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: dir() static method

The **`console.dir()`** static method displays a list of the properties of the specified JavaScript object. In browser consoles, the output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.

Unlike other logging methods, `console.dir()` does not attempt to pretty-print the object. For example, if you pass a DOM element to `console.dir()`, it will not be displayed like in the element inspector, but will instead show a list of properties.

In runtimes like Node and Deno, where console output goes to the terminal and is therefore not interactive, the `options` parameter provides a way to customize the way the object is presented.

## Syntax

```js
console.dir(object)
console.dir(object, options)
```

### Parameters

- `object`
    A JavaScript object whose properties should be printed.
- `options` (optional)
    An object with the following properties, all optional:
    - `colors` (non-standard) (optional)
        A boolean value: if `true`, style the properties of the object according to their type. Defaults to `true`.
    - `depth` (non-standard) (optional)
        A number representing the number of nesting levels to print when an object contains other objects or arrays. The value `null` means: print all levels. Defaults to 2.
    - `showHidden` (non-standard) (optional)
        A boolean value: if `true`, print the object's non-enumerable and symbol properties. Defaults to `false`.

### Return value

None (`undefined`).

## See also

- Microsoft Edge's documentation for `console.dir()`
- Node.js documentation for `console.dir()`
- Google Chrome's documentation for `console.dir()`
