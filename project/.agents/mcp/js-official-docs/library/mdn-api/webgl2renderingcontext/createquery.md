---
title: "WebGL2RenderingContext: createQuery() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/createquery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: createQuery() method

The **`WebGL2RenderingContext.createQuery()`** method of the WebGL 2 API creates and initializes
`WebGLQuery` objects, which provide ways to asynchronously query for
information.

## Syntax

```js
createQuery()
```

### Parameters

None.

### Return value

A `WebGLQuery` object.

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLQuery` objects are not available in WebGL 1.

```js
const query = gl.createQuery();
```

## See also

- `WebGLQuery`
