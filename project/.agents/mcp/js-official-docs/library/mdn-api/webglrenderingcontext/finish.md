---
title: "WebGLRenderingContext: finish() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/finish/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: finish() method

The **`WebGLRenderingContext.finish()`** method of the WebGL API blocks execution until all
previously called commands are finished.

## Syntax

```js
finish()
```

### Parameters

None.

### Return value

None (`undefined`).

## See also

- `WebGLRenderingContext.flush()`
- WebGL best practices (which recommends avoiding `finish()` as it may slow down
  your main rendering loop)
