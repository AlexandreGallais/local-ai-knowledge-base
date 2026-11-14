---
title: "WebGLActiveInfo: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglactiveinfo/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLActiveInfo: name property

The read-only **`WebGLActiveInfo.name`** property represents the name of the requested data returned by calling the `getActiveAttrib()` or `getActiveUniform()` methods.

## Examples

```js
const activeAttrib = gl.getActiveAttrib(program, index);
activeAttrib.name;

const activeUniform = gl.getActiveUniform(program, index);
activeUniform.name;
```

## See also

- `WebGLActiveInfo`
