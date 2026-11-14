---
title: "EXT_disjoint_timer_query: createQueryEXT() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_disjoint_timer_query/createqueryext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_disjoint_timer_query: createQueryEXT() method

The **`EXT_disjoint_timer_query.createQueryEXT()`** method of
the WebGL API creates and initializes
`WebGLQuery` objects, which track the time needed to fully complete
a set of GL commands.

## Syntax

```js
createQueryEXT()
```

### Parameters

None.

### Return value

A `WebGLQuery` object.

## Examples

```js
const ext = gl.getExtension("EXT_disjoint_timer_query");
const query = ext.createQueryExt();
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLQuery`
- `EXT_disjoint_timer_query`
