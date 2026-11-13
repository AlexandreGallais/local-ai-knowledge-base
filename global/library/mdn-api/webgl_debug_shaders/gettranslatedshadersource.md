---
title: "WEBGL_debug_shaders: getTranslatedShaderSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_debug_shaders/gettranslatedshadersource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_debug_shaders: getTranslatedShaderSource() method

The **`WEBGL_debug_shaders.getTranslatedShaderSource()`**
method is part of the WebGL API and allows
you to debug a translated shader.

## Syntax

```js
getTranslatedShaderSource(shader)
```

### Parameters

- `shader`
    A `WebGLShader` to get the translated source from.

### Return value

A `String` containing the translated shader source. An empty string is
returned, if:

- no source has been defined or,
- `WebGLRenderingContext.compileShader()` has not yet been called or,
- the translation for the shader failed.

## Examples

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

const shader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  shader,
  "void main() { gl_FragColor = vec4(gl_FragCoord.x, 0.0, 0.0, 1.0); }",
);
gl.compileShader(shader);

const src = gl
  .getExtension("WEBGL_debug_shaders")
  .getTranslatedShaderSource(shader);
console.log(src);
// "void main(){
// (gl_FragColor = vec4(gl_FragCoord.x, 0.0, 0.0, 1.0));
// }"
```

## See also

- `WebGLShader`
- `WebGLRenderingContext.compileShader()`
