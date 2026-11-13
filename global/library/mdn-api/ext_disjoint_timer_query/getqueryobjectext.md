---
title: "EXT_disjoint_timer_query: getQueryObjectEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/getqueryobjectext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: getQueryObjectEXT() method

The **`EXT_disjoint_timer_query.getQueryObjectEXT()`** method
of the WebGL API returns the state of a
query object.

## Syntax

```js
getQueryObjectEXT(query, pname)
```

### Parameters

- `query`
    A `WebGLQuery` object from which to return information.
- `pname`
    A `GLenum` specifying which information to return. Must be
    `ext.QUERY_RESULT_EXT` or `ext.QUERY_RESULT_AVAILABLE_EXT`.

### Return value

Depends on `pname`:

- If `pname` is `ext.QUERY_RESULT_EXT`: A
  `GLuint64EXT` containing the query result.
- If `pname` is `ext.QUERY_RESULT_AVAILABLE_EXT`: A
  `GLboolean` indicating whether or not a query result is available.

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const query = ext.createQueryEXT();
ext.beginQueryEXT(ext.TIME_ELAPSED_EXT, query);

// Draw
ext.endQueryEXT(ext.TIME_ELAPSED_EXT);

// At some point in the future, after returning control to the browser
const available = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_AVAILABLE_EXT);
const disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT);

if (available && !disjoint) {
  // See how much time the rendering of the object took in nanoseconds.
  const timeElapsed = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_EXT);
}
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
