---
title: "WebGL2RenderingContext: clientWaitSync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/clientwaitsync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: clientWaitSync() method

The **`WebGL2RenderingContext.clientWaitSync()`** method of the
WebGL 2 API blocks and waits for a
`WebGLSync` object to become signaled or a given timeout to be passed.

## Syntax

```js
clientWaitSync(sync, flags, timeout)
```

### Parameters

- `sync`
    A `WebGLSync` object on which to wait on.
- `flags`
    A `GLbitfield` specifying a bitwise combination of flags controlling
    the flushing behavior. May be `gl.SYNC_FLUSH_COMMANDS_BIT`.
- `timeout`
    A `GLint64` specifying a timeout (in nanoseconds) for which to wait for
    the sync object to become signaled. Must not be larger than
    `gl.MAX_CLIENT_WAIT_TIMEOUT_WEBGL`.

### Return value

A `GLenum` indicating the sync object's status.

- `gl.ALREADY_SIGNALED`: Indicates that the sync object was signaled when
  this method was called.
- `gl.TIMEOUT_EXPIRED`: Indicates that the `timeout` time passed
  and that the sync object did not become signaled.
- `gl.CONDITION_SATISFIED`: Indicates that the sync object was signaled
  before the `timeout` expired.
- `gl.WAIT_FAILED`: Indicates that an error occurred during the execution.

## Examples

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
const status = gl.clientWaitSync(sync, 0, 0);
```

## See also

- `WebGLSync`
