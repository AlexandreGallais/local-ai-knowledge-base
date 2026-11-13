---
title: "WebGL2RenderingContext: getQuery() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getquery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getQuery() method

The **`WebGL2RenderingContext.getQuery()`** method of the WebGL 2 API returns the currently active
`WebGLQuery` for the `target`, or `null`.

## Syntax

```js
getQuery(target, pname)
```

### Parameters

- `target`
    A `GLenum` specifying the target of the query. Possible values:
    - `gl.ANY_SAMPLES_PASSED`
        Specifies an occlusion query: these queries
        detect whether an object is visible (whether the scoped drawing commands pass the
        depth test and if so, how many samples pass).
    - `gl.ANY_SAMPLES_PASSED_CONSERVATIVE`
        Same as above, but less
        accurate and faster version.
    - `gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN`
        Number of primitives that
        are written to transform feedback buffers.

- `pname`
    A `GLenum` specifying the query object target. Must be
    `gl.CURRENT_QUERY`.

### Return value

A `WebGLQuery` object.

## Examples

```js
const currentQuery = gl.getQuery(gl.ANY_SAMPLES_PASSED, gl.CURRENT_QUERY);
```

## See also

- `WebGLQuery`
