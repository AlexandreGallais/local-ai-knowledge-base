---
title: "WebGLSync"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglsync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLSync

The **`WebGLSync`** interface is part of the WebGL 2 API and is used to synchronize activities between the GPU and the application.

When working with `WebGLSync` objects, the following methods of the `WebGL2RenderingContext` are useful:

- `WebGL2RenderingContext.fenceSync()`
- `WebGL2RenderingContext.deleteSync()`
- `WebGL2RenderingContext.isSync()`
- `WebGL2RenderingContext.clientWaitSync()`
- `WebGL2RenderingContext.waitSync()`
- `WebGL2RenderingContext.getSyncParameter()`

## Examples

### Creating a `WebGLSync` object

in this example, `gl` must be a `WebGL2RenderingContext`. `WebGLSync` objects are not available in WebGL 1.

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
```

## See also

- `WebGLRenderingContext.finish()`
