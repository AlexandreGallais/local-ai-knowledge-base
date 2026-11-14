---
title: "EXT_disjoint_timer_query: deleteQueryEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/deletequeryext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: deleteQueryEXT() method

The **`EXT_disjoint_timer_query.deleteQueryEXT()`** method of
the WebGL API deletes a given
`WebGLQuery` object.

## Syntax

```js
deleteQueryEXT(query)
```

### Parameters

- `query`
    A `WebGLQuery` object to delete.

### Return value

None (`undefined`).

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const query = ext.createQueryEXT();

// …

ext.deleteQueryEXT(query);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
