---
title: "WebGLQuery"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglquery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLQuery

The **`WebGLQuery`** interface is part of the WebGL 2 API and provides ways to asynchronously query for information. By default, occlusion queries and primitive queries are available.

Another kind of queries are disjoint timer queries, which allow you to measure performance and profiling of your GPU. Disjoint timer queries are available with the `EXT_disjoint_timer_query` extension only.

When working with `WebGLQuery` objects, the following methods of the `WebGL2RenderingContext` are useful:

- `WebGL2RenderingContext.createQuery()`
- `WebGL2RenderingContext.deleteQuery()`
- `WebGL2RenderingContext.isQuery()`
- `WebGL2RenderingContext.beginQuery()`
- `WebGL2RenderingContext.endQuery()`
- `WebGL2RenderingContext.getQuery()`
- `WebGL2RenderingContext.getQueryParameter()`

## Examples

### Creating a `WebGLQuery` object

in this example, `gl` must be a `WebGL2RenderingContext`. `WebGLQuery` objects are not available in WebGL 1.

```js
const query = gl.createQuery();
```

## See also

- `EXT_disjoint_timer_query`
