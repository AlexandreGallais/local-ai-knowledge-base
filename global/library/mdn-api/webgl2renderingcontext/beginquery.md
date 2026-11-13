---
title: "WebGL2RenderingContext: beginQuery() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/beginquery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: beginQuery() method

The **`WebGL2RenderingContext.beginQuery()`** method of the WebGL 2 API starts an asynchronous query. The
`target` parameter indicates which kind of query to begin.

## Syntax

```js
beginQuery(target, query)
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

- `query`
    A `WebGLQuery` object for which to start the querying.

### Return value

None (`undefined`).

## Examples

```js
const query = gl.createQuery();
gl.beginQuery(gl.ANY_SAMPLES_PASSED, query);

// …
```

## See also

- `WebGLQuery`
