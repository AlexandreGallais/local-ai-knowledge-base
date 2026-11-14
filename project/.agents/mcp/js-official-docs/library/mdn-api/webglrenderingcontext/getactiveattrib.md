---
title: "WebGLRenderingContext: getActiveAttrib() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getactiveattrib/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getActiveAttrib() method

The **`WebGLRenderingContext.getActiveAttrib()`** method of the
WebGL API returns a
`WebGLActiveInfo` object containing size, type, and name of a vertex
attribute. It is generally used when querying unknown attributes either for debugging or
generic library creation.

## Syntax

```js
getActiveAttrib(program, index)
```

### Parameters

- `program`
    A `WebGLProgram` containing the vertex attribute.
- `index`
    A `GLuint` specifying the index of the vertex attribute to get. This
    value is an index 0 to N - 1 as returned
    by `gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)`.

### Return value

A `WebGLActiveInfo` object.

## Examples

```js
const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
for (let i = 0; i < numAttribs; ++i) {
  const info = gl.getActiveAttrib(program, i);
  console.log("name:", info.name, "type:", info.type, "size:", info.size);
}
```

## See also

- `WebGLActiveInfo`
