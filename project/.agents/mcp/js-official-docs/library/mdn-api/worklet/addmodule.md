---
title: "Worklet: addModule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/worklet/addmodule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Worklet: addModule() method

The **`addModule()`** method of the
`Worklet` interface loads the module in the given JavaScript file and
adds it to the current `Worklet`.

## Syntax

```js
addModule(moduleURL)
addModule(moduleURL, options)
```

### Parameters

- `moduleURL`
    A `String` containing the URL of a JavaScript file with the module to
    add.
- `options` (optional)
    An object with any of the following options:
    - `credentials`
        A `Request.credentials` value that
        indicates whether to send credentials (e.g., cookies and HTTP authentication)
        when loading the module. Can be one of `"omit"`,
        `"same-origin"`, or `"include"`. Defaults to
        `"same-origin"`. See also `Request.credentials`.

### Return value

A `Promise` that resolves once the module from the given URL has been
added. The promise doesn't return any value.

### Exceptions

If `addModule()` fails, it rejects the promise, delivering one of the
following errors to the rejection handler.

- `AbortError` `DOMException`
    The specified script is invalid or could not be loaded.
- `SyntaxError` `DOMException`
    The specified `moduleURL` is invalid.

## Examples

### AudioWorklet example

```js
const audioCtx = new AudioContext();
const audioWorklet = audioCtx.audioWorklet;
audioWorklet.addModule("modules/bypassFilter.js", {
  credentials: "omit",
});
```

### PaintWorklet example

```js
CSS.paintWorklet.addModule(
  "https://mdn.github.io/houdini-examples/cssPaint/intro/worklets/hilite.js",
);
```

Once the script has been added to the paint worklet, the CSS `paint()` function
can be used to include the image created by the worklet:

```css
@supports (background-image: paint(id)) {
  h1 {
    background-image: paint(hollow-highlights, filled, 3px);
  }
}
```
