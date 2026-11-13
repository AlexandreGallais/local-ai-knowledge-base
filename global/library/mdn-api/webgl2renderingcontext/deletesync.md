---
title: "WebGL2RenderingContext: deleteSync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/deletesync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: deleteSync() method

The **`WebGL2RenderingContext.deleteSync()`** method of the WebGL 2 API deletes a given
`WebGLSync` object.

## Syntax

```js
deleteSync(sync)
```

### Parameters

- `sync`
    A `WebGLSync` object to delete.

### Return value

None (`undefined`).

## Examples

`gl` must be a `WebGL2RenderingContext`. `WebGLSync`
objects are not available in WebGL 1.

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);

// …

gl.deleteSync(sync);
```

## See also

- `WebGLSync`
