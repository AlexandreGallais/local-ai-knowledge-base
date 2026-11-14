---
title: "WebGLRenderingContext: enableVertexAttribArray() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/enablevertexattribarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: enableVertexAttribArray() method

The `WebGLRenderingContext` method
**`enableVertexAttribArray()`**, part of the WebGL API, turns on the generic vertex
attribute array at the specified index into the list of attribute arrays.

> **Note:**
> You can disable the attribute array by calling
> `disableVertexAttribArray()`.

In WebGL, values that apply to a specific vertex are stored in attributes. These are only
available to the JavaScript code and the vertex shader. Attributes are referenced by an
index number into the list of attributes maintained by the GPU. Some vertex attribute
indices may have predefined purposes, depending on the platform and/or the GPU. Others
are assigned by the WebGL layer when you create the attributes.

Either way, since attributes cannot be used unless enabled, and are disabled by
default, you need to call `enableVertexAttribArray()` to enable individual
attributes so that they can be used. Once that's been done, other methods can be used to
access the attribute, including `vertexAttribPointer()`, `vertexAttrib*()`, and `getVertexAttrib()`.

## Syntax

```js
enableVertexAttribArray(index)
```

### Parameters

- `index`
    A `GLuint` specifying the index number that uniquely identifies the
    vertex attribute to enable. If you know the name of the attribute but not its index,
    you can get the index by calling `getAttribLocation()`.

### Return value

None (`undefined`).

### Errors

To check for errors after calling `enableVertexAttribArray()`, call
`getError()`.

- `WebGLRenderingContext.INVALID_VALUE`
    The specified `index` is invalid; that is, it's greater than or equal to
    the maximum number of entries permitted in the context's vertex attribute list, as
    indicated by the value of `WebGLRenderingContext.MAX_VERTEX_ATTRIBS`.

## Examples

This code — a snippet taken from the full example A basic 2D WebGL animation example — shows the use of `enableVertexArray()` to activate
the attribute that will be used by the WebGL layer to pass <example-value> vertexes from the
vertex buffer into the vertex shader function.

```js
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");

gl.enableVertexAttribArray(aVertexPosition);
gl.vertexAttribPointer(
  aVertexPosition,
  vertexNumComponents,
  gl.FLOAT,
  false,
  0,
  0,
);

gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
```

> **Note:**
> This code snippet is taken from the function `animateScene()` in "A basic 2D WebGL animation example." See
> that article for the full sample and to see the resulting animation in action.

This code sets the buffer of vertexes that will be used to draw the triangles of the
shape by calling `bindBuffer()`. Then
the vertex position attribute's index is obtained from the shader program by calling
`getAttribLocation()`.

With the index of the vertex position attribute now available in
`aVertexPosition`, we call `enableVertexAttribArray()` to enable
the position attribute so it can be used by the shader program (in particular, by the
vertex shader).

Then the vertex buffer is bound to the `aVertexPosition` attribute by
calling `vertexAttribPointer()`. This step is not obvious, since this binding is almost a
side effect. But as a result, accessing `aVertexPosition` now obtains data
from the vertex buffer.

With the association in place between the vertex buffer for our shape and the
`aVertexPosition` attribute used to deliver vertexes one by one into the
vertex shader, we're ready to draw the shape by calling
`drawArrays()`.

## See also

- Data in WebGL
- Adding 2D content to a WebGL context
- A basic 2D WebGL animation sample
- `disableVertexAttribArray()`
