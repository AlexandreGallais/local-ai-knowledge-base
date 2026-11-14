---
title: "WebGLRenderingContext: hint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/hint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: hint() method

The **`WebGLRenderingContext.hint()`** method of the WebGL API specifies hints for certain
behaviors. The interpretation of these hints depend on the implementation.

## Syntax

```js
hint(target, mode)
```

### Parameters

- `target`
    Sets which behavior to be controlled. Possible values:
    - `gl.GENERATE_MIPMAP_HINT`
        Quality of filtering when generating
        mipmap images with `WebGLRenderingContext.generateMipmap()`.

    When using the `OES_standard_derivatives` extension:
    - `ext.FRAGMENT_SHADER_DERIVATIVE_HINT_OES`
        Accuracy of the
        derivative calculation for the GLSL built-in functions: `dFdx`,
        `dFdy`, and `fwidth`.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.FRAGMENT_SHADER_DERIVATIVE_HINT`
        Same as `ext.FRAGMENT_SHADER_DERIVATIVE_HINT_OES`

- `mode`
    Sets the behavior. The default value is `gl.DONT_CARE`. The possible
    values are:
    - `gl.FASTEST`: The most efficient behavior should be used.
    - `gl.NICEST`: The most correct or the highest quality option should be
      used.
    - `gl.DONT_CARE`: There is no preference for this behavior.

### Return value

None (`undefined`).

## Examples

The following example hints that the quality of filtering when generating mipmap images
should be most efficient instead of the best quality.

```js
gl.hint(gl.GENERATE_MIPMAP_HINT, gl.FASTEST);
```

## See also

- `WebGLRenderingContext.generateMipmap()`
- `OES_standard_derivatives`
