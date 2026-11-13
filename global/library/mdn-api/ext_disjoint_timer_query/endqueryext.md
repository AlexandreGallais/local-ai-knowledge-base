---
title: "EXT_disjoint_timer_query: endQueryEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/endqueryext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: endQueryEXT() method

The **`EXT_disjoint_timer_query.endQueryEXT()`** method of the
WebGL API ends a timer query.

## Syntax

```js
endQueryEXT(target)
```

### Parameters

- `target`
    A `GLenum` specifying the target of the time query. Must be
    `ext.TIME_ELAPSED_EXT`.

### Return value

None (`undefined`).

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const query = ext.createQueryEXT();
ext.beginQueryEXT(ext.TIME_ELAPSED_EXT, query);

// …

ext.endQueryEXT(ext.TIME_ELAPSED_EXT);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
