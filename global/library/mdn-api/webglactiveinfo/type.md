---
title: "WebGLActiveInfo: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglactiveinfo/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLActiveInfo: type property

The read-only **`WebGLActiveInfo.type`** property represents the type of the requested data returned by calling the `getActiveAttrib()` or `getActiveUniform()` methods.

## Examples

```js
const activeAttrib = gl.getActiveAttrib(program, index);
activeAttrib.type;

const activeUniform = gl.getActiveUniform(program, index);
activeUniform.type;
```

## See also

- `WebGLActiveInfo`
