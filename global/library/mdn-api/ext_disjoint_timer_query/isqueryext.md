---
title: "EXT_disjoint_timer_query: isQueryEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/isqueryext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: isQueryEXT() method

The **`EXT_disjoint_timer_query.isQueryEXT()`** method of the
WebGL API returns `true` if the
passed object is a `WebGLQuery` object.

## Syntax

```js
isQueryEXT(query)
```

### Parameters

- `query`
    A `WebGLQuery` object to test.

### Return value

A `GLboolean` indicating whether the given object is a
`WebGLQuery` object (`true`) or not
(`false`).

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const query = ext.createQueryEXT();

// …

ext.isQueryEXT(query);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
