---
title: "WebGL2RenderingContext: isQuery() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/isquery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: isQuery() method

The **`WebGL2RenderingContext.isQuery()`** method of the WebGL 2 API returns `true` if the
passed object is a valid `WebGLQuery` object.

## Syntax

```js
isQuery(query)
```

### Parameters

- `query`
    A `WebGLQuery` object to test.

### Return value

A `GLboolean` indicating whether the given object is a valid
`WebGLQuery` object (`true`) or not (`false`).

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLQuery` objects are not available in WebGL 1.

```js
const query = gl.createQuery();

// …

gl.isQuery(query);
```

## See also

- `WebGLQuery`
