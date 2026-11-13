---
title: "WebGLProgram"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglprogram/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLProgram

The **`WebGLProgram`** is part of the WebGL API and is a combination of two compiled `WebGLShader`s consisting of a vertex shader and a fragment shader (both written in GLSL).

To create a `WebGLProgram`, call the GL context's `createProgram()` function. After attaching the shader programs using `attachShader()`, you link them into a usable program. This is shown in the code below.

```js
const program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  const info = gl.getProgramInfoLog(program);
  throw new Error(`Could not compile WebGL program. \n\n${info}`);
}
```

See `WebGLShader` for information on creating the `vertexShader` and `fragmentShader` in the above example.

## Examples

### Using the program

The steps to actually do some work with the program involve telling the GPU to use the program, bind the appropriate data and configuration options, and finally draw something to the screen.

```js
// Use the program
gl.useProgram(program);

// Bind existing attribute data
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAttribArray(attributeLocation);
gl.vertexAttribPointer(attributeLocation, 3, gl.FLOAT, false, 0, 0);

// Draw a single triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

### Deleting the program

If there is an error linking the program or you wish to delete an existing program, then it is as simple as running `WebGLRenderingContext.deleteProgram()`. This frees the memory of the linked program.

```js
gl.deleteProgram(program);
```

## See also

- `WebGLShader`
- `WebGLRenderingContext.attachShader()`
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
