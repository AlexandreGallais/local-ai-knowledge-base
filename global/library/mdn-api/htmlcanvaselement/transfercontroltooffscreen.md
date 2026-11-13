---
title: "HTMLCanvasElement: transferControlToOffscreen() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/transfercontroltooffscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: transferControlToOffscreen() method

The **`HTMLCanvasElement.transferControlToOffscreen()`** method transfers control to an `OffscreenCanvas` object, either on the main thread or on a worker.

## Syntax

```js
transferControlToOffscreen()
```

### Parameters

None.

### Return value

An `OffscreenCanvas` object.

### Exceptions

- `InvalidStateError` `DOMException`
    Throws if:
    - the canvas has been set a context mode by calling `HTMLCanvasElement.getContext()`
    - the canvas has already transferred its control to offscreen.

## Examples

The following example shows how to transfer control to an `OffscreenCanvas` object on the main thread.

```js
const htmlCanvas = document.createElement("canvas");
const offscreen = htmlCanvas.transferControlToOffscreen();
const gl = offscreen.getContext("webgl");

// Some drawing using the gl context…
```

The following example shows how to transfer control to an `OffscreenCanvas` object on a worker.

```js
const offscreen = document.querySelector("canvas").transferControlToOffscreen();
const worker = new Worker("my-worker-url.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

## See also

- The interface defining this method, `HTMLCanvasElement`
- `OffscreenCanvas`
