---
title: "WebGL2RenderingContext: waitSync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/waitsync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: waitSync() method

The **`WebGL2RenderingContext.waitSync()`** method of the WebGL 2 API returns immediately, but waits on
the GL server until the given `WebGLSync` object is signaled.

The method is a no-op in the absence of the possibility of synchronizing between
multiple GL contexts.

## Syntax

```js
waitSync(sync, flags, timeout)
```

### Parameters

- `sync`
    A `WebGLSync` object on which to wait on.
- `flags`
    A `GLbitfield` specifying a bitwise combination of flags controlling
    the flushing behavior. Must be `0` (exists for extensions only).
- `timeout`
    A `GLint64` specifying a timeout the server should wait before
    continuing. Must be `gl.TIMEOUT_IGNORED`.

### Return value

None (`undefined`).

## Examples

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
gl.waitSync(sync, 0, gl.TIMEOUT_IGNORED);
```

## See also

- `WebGLSync`
