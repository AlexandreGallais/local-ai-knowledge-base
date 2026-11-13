---
title: "EXT_disjoint_timer_query: beginQueryEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/beginqueryext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: beginQueryEXT() method

The **`EXT_disjoint_timer_query.beginQueryEXT()`** method of
the WebGL API starts a timer query.

## Syntax

```js
beginQueryEXT(target, query)
```

### Parameters

- `target`
    A `GLenum` specifying the target of the time query. Must be
    `ext.TIME_ELAPSED_EXT`.
- `query`
    A `WebGLQuery` object for which to start the time querying.

### Return value

None (`undefined`).

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const query = ext.createQueryEXT();
ext.beginQueryEXT(ext.TIME_ELAPSED_EXT, query);

// …
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
