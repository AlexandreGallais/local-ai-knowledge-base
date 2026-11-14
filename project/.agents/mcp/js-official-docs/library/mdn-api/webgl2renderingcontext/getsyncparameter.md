---
title: "WebGL2RenderingContext: getSyncParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getsyncparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getSyncParameter() method

The **`WebGL2RenderingContext.getSyncParameter()`** method of
the WebGL 2 API returns parameter
information of a `WebGLSync` object.

## Syntax

```js
getSyncParameter(sync, pname)
```

### Parameters

- `sync`
    A `WebGLSync` object.
- `pname`
    A `GLenum` specifying which information to return. Possible values:
    - `gl.OBJECT_TYPE`
        Returns a `GLenum` indicating the type
        of the sync object (always `gl.SYNC_FENCE`).
    - `gl.SYNC_STATUS`
        Returns a `GLenum` indicating the
        status of the sync object (`gl.SIGNALED` or
        `gl.UNSIGNALED`).
    - `gl.SYNC_CONDITION`
        Returns a `GLenum` indicating the
        sync objects' condition (always `gl.SYNC_GPU_COMMANDS_COMPLETE`).
    - `gl.SYNC_FLAGS`
        Returns a `GLenum` indicating the flags
        with which the sync object was created (always 0 as no flags are supported).

### Return value

Depends on the `pname` parameter, either a `GLenum` or a
`GLbitfield`.

## Examples

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
gl.getSyncParameter(sync, gl.SYNC_STATUS);
```

## See also

- `WebGLSync`
