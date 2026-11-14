---
title: "WebGLRenderingContext: blendFuncSeparate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/blendfuncseparate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: blendFuncSeparate() method

The **`WebGLRenderingContext.blendFuncSeparate()`** method of
the WebGL API defines which function is used
for blending pixel arithmetic for RGB and alpha components separately.

## Syntax

```js
blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha)
```

### Parameters

- `srcRGB`
    A `GLenum` specifying a multiplier for the red, green and blue (RGB)
    source blending factors. The default value is `gl.ONE`. For possible
    values, see below.
- `dstRGB`
    A `GLenum` specifying a multiplier for the red, green and blue (RGB)
    destination blending factors. The default value is `gl.ZERO`. For possible
    values, see below.
- `srcAlpha`
    A `GLenum` specifying a multiplier for the alpha source blending
    factor. The default value is `gl.ONE`. For possible values, see below.
- `dstAlpha`
    A `GLenum` specifying a multiplier for the alpha destination blending
    factor. The default value is `gl.ZERO`. For possible values, see below.

### Return value

None (`undefined`).

### Exceptions

- If _srcRGB_, _dstRGB_, _srcAlpha_, or _dstAlpha_ is not
  one of the listed possible values, a `gl.INVALID_ENUM` error is thrown.
- If a constant color and a constant alpha value are used together as source
  (`srcRGB`) and destination (`dstRGB`) factors, a
  `gl.INVALID_ENUM` error is thrown.

## Constants

The following constants can be used for _srcRGB_, _dstRGB_,
_srcAlpha_, and _dstAlpha_

The formulas for the blending factors can be described like this (all RGBA values are
between 0 and 1):

- color(RGB) = (sourceColor \* _srcRGB_) + (destinationColor \* _dstRGB_)
- color(A) = (sourceAlpha \* _srcAlpha_) + (destinationAlpha \*
  _dstAlpha_)

In the following table, RS, GS, BS, AS represent respectively
the _red_, _green_, _blue_ and _alpha_ component of the source, while
RD, GD, BD, AD represent respectively
the _red_, _green_, _blue_ and _alpha_ component of the destination.
Similarly, RC, GC, BC, AC represent respectively
the _red_, _green_, _blue_ and _alpha_ component of a constant color.
They are all values between 0 and 1, included.

       | Constant
       | RGB factor
       | Alpha factor
       | Description

       | `gl.ZERO`
       | 0,0,0
       | 0
       | Multiplies all colors by 0.

       | `gl.ONE`
       | 1,1,1,1
       | 1
       | Multiplies all colors by 1.

       | `gl.SRC_COLOR`
       | RS, GS, BS
       | AS
       | Multiplies all colors by the source colors.

       | `gl.ONE_MINUS_SRC_COLOR`
       | 1-RS, 1-GS, 1-BS
       | 1-AS
       | Multiplies all colors by 1 minus each source color.

       | `gl.DST_COLOR`
       | RD, GD, BD
       | AD
       | Multiplies all colors by the destination color.

       | `gl.ONE_MINUS_DST_COLOR`
       | 1-RD, 1-GD, 1-BD
       | 1-AD
       | Multiplies all colors by 1 minus each destination color.

       | `gl.SRC_ALPHA`
       | AS, AS, AS
       | AS
       | Multiplies all colors by the source alpha color.

       | `gl.ONE_MINUS_SRC_ALPHA`
       | 1-AS, 1-AS, 1-AS
       | 1-AS
       | Multiplies all colors by 1 minus the source alpha color.

       | `gl.DST_ALPHA`
       | AD, AD, AD
       | AD
       | Multiplies all colors by the destination alpha color.

       | `gl.ONE_MINUS_DST_ALPHA`
       | 1-AD, 1-AD, 1-AD
       | 1-AD
       | Multiplies all colors by 1 minus the destination alpha color.

       | `gl.CONSTANT_COLOR`
       | RC, GC, BC
       | AC
       | Multiplies all colors by a constant color.

       | `gl.ONE_MINUS_CONSTANT_COLOR`
       | 1-RC, 1-GC, 1-BC
       | 1-AC
       | Multiplies all colors by 1 minus a constant color.

       | `gl.CONSTANT_ALPHA`
       | AC, AC, AC
       | AC
       | Multiplies all colors by a constant alpha value.

       | `gl.ONE_MINUS_CONSTANT_ALPHA`
       | 1-AC, 1-AC, 1-AC
       | 1-AC
       | Multiplies all colors by 1 minus a constant alpha value.

       | `gl.SRC_ALPHA_SATURATE`
       |
        min(AS, 1 - AD), min(AS, 1 -
        AD), min(AS, 1 - AD)

       | 1
       |
        Multiplies the RGB colors by the smaller of either the source alpha
        color or the value of 1 minus the destination alpha color. The alpha
        value is multiplied by 1.

## Examples

To use the blend function, you first have to activate blending with
`WebGLRenderingContext.enable()` with the argument `gl.BLEND`.

```js
gl.enable(gl.BLEND);
gl.blendFuncSeparate(gl.SRC_COLOR, gl.DST_COLOR, gl.ONE, gl.ZERO);
```

To get the current blend function, query the `BLEND_SRC_RGB`,
`BLEND_SRC_ALPHA`, `BLEND_DST_RGB`, and
`BLEND_DST_ALPHA` constants which return one of the blend function constants.

```js
gl.enable(gl.BLEND);
gl.blendFuncSeparate(gl.SRC_COLOR, gl.DST_COLOR, gl.ONE, gl.ZERO);
gl.getParameter(gl.BLEND_SRC_RGB) === gl.SRC_COLOR;
// true
```

## See also

- `WebGLRenderingContext.blendColor()`
- `WebGLRenderingContext.blendEquation()`
