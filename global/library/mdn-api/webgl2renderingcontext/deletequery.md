---
title: "WebGL2RenderingContext: deleteQuery() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/deletequery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: deleteQuery() method

The **`WebGL2RenderingContext.deleteQuery()`** method of the WebGL 2 API deletes a given
`WebGLQuery` object.

## Syntax

```js
deleteQuery(query)
```

### Parameters

- `query`
    A `WebGLQuery` object to delete.

### Return value

None (`undefined`).

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLQuery` objects are not available in WebGL 1.

```js
const query = gl.createQuery();

// …

gl.deleteQuery(query);
```

## See also

- `WebGLQuery`
