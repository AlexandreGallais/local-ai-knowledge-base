---
title: "WebGL2RenderingContext: isSync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/issync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: isSync() method

The **`WebGL2RenderingContext.isSync()`** method of the WebGL 2 API returns `true` if the
passed object is a valid `WebGLSync` object.

## Syntax

```js
isSync(sync)
```

### Parameters

- `sync`
    A `WebGLSync` object to test.

### Return value

A `GLboolean` indicating whether the given object is a valid
`WebGLSync` object (`true`) or not (`false`).

## Examples

`gl` must be a `WebGL2RenderingContext`. `WebGLSync`
objects are not available in WebGL 1.

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);

// …

gl.isSync(sync);
```

## See also

- `WebGLSync`
