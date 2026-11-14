---
title: "WebGLRenderingContext: activeTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/activetexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: activeTexture() method

The **`WebGLRenderingContext.activeTexture()`** method of the
WebGL API specifies which texture unit to
make active.

## Syntax

```js
activeTexture(texture)
```

### Parameters

- `texture`
    The texture unit to make active. The value is a `gl.TEXTUREI`
    where _I_ is within the range from 0 to
    `gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1`.

### Return value

None (`undefined`).

### Exceptions

If _texture_ is not one of `gl.TEXTUREI`, where _I_
is within the range from 0 to `gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1`, a
`gl.INVALID_ENUM` error is thrown.

## Examples

The following call selects `gl.TEXTURE1` as the current texture. Subsequent
calls that modify the texture state will affect this texture.

```js
gl.activeTexture(gl.TEXTURE1);
```

The number of texture units is implementation dependent, you can get this number with
the help of the `MAX_COMBINED_TEXTURE_IMAGE_UNITS` constant. It is, per
specification, at least 8.

```js
gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
```

To get the active texture, query the `ACTIVE_TEXTURE` constant.

```js
gl.activeTexture(gl.TEXTURE0);
gl.getParameter(gl.ACTIVE_TEXTURE);
// returns "33984" (0x84C0, gl.TEXTURE0 enum value)
```

## See also

- `WebGLRenderingContext.getParameter()`
