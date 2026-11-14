---
title: "EXT_disjoint_timer_query: queryCounterEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/querycounterext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: queryCounterEXT() method

The **`EXT_disjoint_timer_query.queryCounterEXT()`** method of
the WebGL API records the current time into
the corresponding query object.

## Syntax

```js
queryCounterEXT(query, target)
```

### Parameters

- `query`
    A `WebGLQuery` object for which to record the current time.
- `target`
    A `GLenum` specifying the target of the time query. Must be
    `ext.TIMESTAMP_EXT`.

### Return value

None (`undefined`).

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const startQuery = ext.createQueryEXT();
const endQuery = ext.createQueryEXT();
ext.queryCounterEXT(startQuery, ext.TIMESTAMP_EXT);

// …

ext.queryCounterEXT(endQuery, ext.TIMESTAMP_EXT);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
