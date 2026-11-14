---
title: "WebGLActiveInfo: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglactiveinfo/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLActiveInfo: size property

The read-only **`WebGLActiveInfo.size`** property is a `Number` representing the size of the requested data returned by calling the `getActiveAttrib()` or `getActiveUniform()` methods.

## Examples

```js
const activeAttrib = gl.getActiveAttrib(program, index);
activeAttrib.size;

const activeUniform = gl.getActiveUniform(program, index);
activeUniform.size;
```

## See also

- `WebGLActiveInfo`
