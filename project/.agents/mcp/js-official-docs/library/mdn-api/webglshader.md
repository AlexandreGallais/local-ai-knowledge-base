---
title: "WebGLShader"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglshader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLShader

The **WebGLShader** is part of the WebGL API and can either be a vertex or a fragment shader. A `WebGLProgram` requires both types of shaders.

## Description

To create a **WebGLShader** use `WebGLRenderingContext.createShader`, then hook up the GLSL source code using `WebGLRenderingContext.shaderSource()`, and finally invoke `WebGLRenderingContext.compileShader()` to finish and compile the shader. At this point the **WebGLShader** is still not in a usable form and must still be attached to a `WebGLProgram`.

```js
function createShader(gl, sourceCode, type) {
  // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    throw new Error(`Could not compile WebGL program. \n\n${info}`);
  }
  return shader;
}
```

See `WebGLProgram` for information on attaching the shaders.

## Examples

### Creating a vertex shader

Note that there are many other strategies for writing and accessing shader source code strings. These example are for illustration purposes only.

```js
const vertexShaderSource =
  "attribute vec4 position;\n" +
  "void main() {\n" +
  "  gl_Position = position;\n" +
  "}\n";

// Use the createShader function from the example above
const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
```

### Creating a fragment shader

```js
const fragmentShaderSource = `void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

// Use the createShader function from the example above
const fragmentShader = createShader(
  gl,
  fragmentShaderSource,
  gl.FRAGMENT_SHADER,
);
```

## See also

- `WebGLProgram`
- `WebGLRenderingContext.attachShader()`
- `WebGLRenderingContext.bindAttribLocation()`
- `WebGLRenderingContext.compileShader()`
- `WebGLRenderingContext.createProgram()`
- `WebGLRenderingContext.createShader()`
- `WebGLRenderingContext.deleteProgram()`
- `WebGLRenderingContext.deleteShader()`
- `WebGLRenderingContext.detachShader()`
- `WebGLRenderingContext.getAttachedShaders()`
- `WebGLRenderingContext.getProgramParameter()`
- `WebGLRenderingContext.getProgramInfoLog()`
- `WebGLRenderingContext.getShaderParameter()`
- `WebGLRenderingContext.getShaderPrecisionFormat()`
- `WebGLRenderingContext.getShaderInfoLog()`
- `WebGLRenderingContext.getShaderSource()`
- `WebGLRenderingContext.isProgram()`
- `WebGLRenderingContext.isShader()`
- `WebGLRenderingContext.linkProgram()`
- `WebGLRenderingContext.shaderSource()`
- `WebGLRenderingContext.useProgram()`
- `WebGLRenderingContext.validateProgram()`
