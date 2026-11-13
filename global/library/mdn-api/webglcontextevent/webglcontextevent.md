---
title: "WebGLContextEvent: WebGLContextEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglcontextevent/webglcontextevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLContextEvent: WebGLContextEvent() constructor

The **`WebGLContextEvent()`** constructor creates a new `WebGLContextEvent` object.

> **Note:**
> You typically don't need to call this constructor; the browser creates these objects automatically when WebGL context events get fired. To manually trigger a `webglcontextlost` event, use `WEBGL_lose_context.loseContext()`.

## Syntax

```js
new WebGLContextEvent(type, options)
```

### Parameters

- `type`
    A string indicating the type of the event.
    It is case-sensitive and should be one of `webglcontextcreationerror`, `webglcontextlost`, or `webglcontextrestored`.
- `options` (optional)
    An object that, _in addition to the properties defined in `Event()`_, has the following properties:
    - `statusMessage` (optional)
        A string with additional status information. It defaults to the empty string (`""`).

### Return value

A new `WebGLContextEvent` object.

## See also

- `webglcontextlost`
- `webglcontextrestored`
- `webglcontextcreationerror`
