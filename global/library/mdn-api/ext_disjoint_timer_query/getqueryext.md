---
title: "EXT_disjoint_timer_query: getQueryEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/getqueryext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: getQueryEXT() method

The **`EXT_disjoint_timer_query.getQueryEXT()`** method of the
WebGL API returns information about a query
target.

## Syntax

```js
getQueryEXT(target, pname)
```

### Parameters

- `target`
    A `GLenum` specifying the target of the time query. Must be
    `ext.TIMESTAMP_EXT` or `ext.TIME_ELAPSED_EXT`.
- `pname`
    A `GLenum` specifying which information to return. Must be
    `ext.CURRENT_QUERY_EXT` or `ext.QUERY_COUNTER_BITS_EXT`.

### Return value

Depends on `pname`:

- If `pname` is `ext.CURRENT_QUERY_EXT`: A
  `WebGLQuery` object, which is the currently active query for the
  given target.
- If `pname` is `ext.QUERY_COUNTER_BITS_EXT`: A
  `GLint` indicating the number of bits used to hold the query result for
  the given target.

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const startQuery = ext.createQueryEXT();
ext.queryCounterEXT(startQuery, ext.TIMESTAMP_EXT);

const currentQuery = ext.getQueryEXT(ext.TIMESTAMP_EXT, ext.CURRENT_QUERY_EXT);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
