---
title: "WebGL2RenderingContext: getQueryParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getqueryparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getQueryParameter() method

The **`WebGL2RenderingContext.getQueryParameter()`** method of
the WebGL 2 API returns parameter
information of a `WebGLQuery` object.

## Syntax

```js
getQueryParameter(query, pname)
```

### Parameters

- `query`
    A `WebGLQuery` object.
- `pname`
    A `GLenum` specifying which information to return. Possible values:
    - `gl.QUERY_RESULT`
        Returns a `GLuint` containing the
        query result.
    - `gl.QUERY_RESULT_AVAILABLE`
        Returns a `GLboolean`
        indicating whether or not a query result is available.

### Return value

Depends on the `pname` parameter, either a `GLuint` or a
`GLboolean`.

## Examples

```js
const query = gl.createQuery();
gl.beginQuery(gl.ANY_SAMPLES_PASSED, query);

const result = gl.getQueryParameter(query, gl.QUERY_RESULT);
```

## See also

- `WebGLQuery`
