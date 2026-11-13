---
title: "WebGL2RenderingContext: fenceSync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/fencesync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: fenceSync() method

The **`WebGL2RenderingContext.fenceSync()`** method of the WebGL 2 API creates a new
`WebGLSync` object and inserts it into the GL command stream.

## Syntax

```js
fenceSync(condition, flags)
```

### Parameters

- `condition`
    A `GLenum` specifying the condition that must be met to set the sync
    object's state to signaled. Must be `gl.SYNC_GPU_COMMANDS_COMPLETE`.
- `flags`
    A `GLbitfield` specifying a bitwise combination of flags controlling
    the behavior of the sync object. Must be `0` (exists for extensions only).

### Return value

A `WebGLSync` object.

## Examples

`gl` must be a `WebGL2RenderingContext`. `WebGLSync`
objects are not available in WebGL 1.

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
```

## See also

- `WebGLSync`
