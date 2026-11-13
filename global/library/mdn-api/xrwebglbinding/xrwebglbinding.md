---
title: "XRWebGLBinding: XRWebGLBinding() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/xrwebglbinding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding: XRWebGLBinding() constructor

The **`XRWebGLBinding()`** constructor creates and
returns a new `XRWebGLBinding` object.

## Syntax

```js
new XRWebGLBinding(session, context)
```

### Parameters

- `session`
    An `XRSession` object specifying the WebXR session which will be
    rendered using the WebGL context.
- `context`
    A `WebGLRenderingContext` or `WebGL2RenderingContext`
    identifying the WebGL drawing context to use for rendering the scene for the specified
    WebXR session.

### Return value

A new `XRWebGLBinding`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the new `XRWebGLBinding` could not be created due to one of the following situations:
    - The `XRSession` specified by `session` has already been
      stopped.
    - The specified WebGL context, `context`, has been lost for any reason, such as a GPU switch or reset.
    - The specified `session` is immersive but the `context` is
      not WebXR compatible.

## Examples

```js
const canvasElement = document.querySelector(".output-canvas");
const gl = canvasElement.getContext("webgl");
const xrSession = await navigator.xr.requestSession("immersive-vr");
await gl.makeXRCompatible();

const glBinding = new XRWebGLBinding(xrSession, gl);
```

## See also

- `WebGLRenderingContext.makeXRCompatible()`
