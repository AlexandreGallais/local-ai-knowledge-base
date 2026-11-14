---
title: "WebGL2RenderingContext"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext

The **WebGL2RenderingContext** interface provides the OpenGL ES 3.0 rendering context for the drawing surface of an HTML `<canvas>` element.

To get an object of this interface, call `getContext()` on a `<canvas>` element, supplying "webgl2" as the argument:

```js
const canvas = document.getElementById("myCanvas");
const gl = canvas.getContext("webgl2");
```

> **Note:**
> WebGL 2 is an extension to WebGL 1. The `WebGL2RenderingContext` interface implements all members of the `WebGLRenderingContext` interface. Some methods of the WebGL 1 context can accept additional values when used in a WebGL 2 context. You will find this info noted on the WebGL 1 reference pages.

The WebGL tutorial has more information, examples, and resources on how to get started with WebGL.

## Constants

See the WebGL constants page.

## State information

- `WebGL2RenderingContext.getIndexedParameter()`
    Returns the indexed value for the given `target`.

## Buffers

- `WebGL2RenderingContext.bufferData()`
    Initializes and creates the buffer object's data store.
- `WebGL2RenderingContext.bufferSubData()`
    Updates a subset of a buffer object's data store.
- `WebGL2RenderingContext.copyBufferSubData()`
    Copies part of the data of a buffer to another buffer.
- `WebGL2RenderingContext.getBufferSubData()`
    Reads data from a buffer and writes them to an `ArrayBuffer` or `SharedArrayBuffer`.

## Framebuffers

- `WebGL2RenderingContext.blitFramebuffer()`
    Transfers a block of pixels from the read framebuffer to the draw framebuffer.
- `WebGL2RenderingContext.framebufferTextureLayer()`
    Attaches a single layer of a texture to a framebuffer.
- `WebGL2RenderingContext.invalidateFramebuffer()`
    Invalidates the contents of attachments in a framebuffer.
- `WebGL2RenderingContext.invalidateSubFramebuffer()`
    Invalidates portions of the contents of attachments in a framebuffer
- `WebGL2RenderingContext.readBuffer()`
    Selects a color buffer as the source for pixels.

## Renderbuffers

- `WebGL2RenderingContext.getInternalformatParameter()`
    Returns information about implementation-dependent support for internal formats.
- `WebGL2RenderingContext.renderbufferStorageMultisample()`
    Creates and initializes a renderbuffer object's data store and allows specifying the number of samples to be used.

## Textures

- `WebGL2RenderingContext.texStorage2D()`
    Specifies all levels of two-dimensional texture storage.
- `WebGL2RenderingContext.texStorage3D()`
    Specifies all levels of a three-dimensional texture or two-dimensional array texture.
- `WebGL2RenderingContext.texImage3D()`
    Specifies a three-dimensional texture image.
- `WebGL2RenderingContext.texSubImage3D()`
    Specifies a sub-rectangle of the current 3D texture.
- `WebGL2RenderingContext.copyTexSubImage3D()`
    Copies pixels from the current `WebGLFramebuffer` into an existing 3D texture sub-image.
- `WebGL2RenderingContext.compressedTexImage3D`
    Specifies a three-dimensional texture image in a compressed format.
- `WebGL2RenderingContext.compressedTexSubImage3D()`
    Specifies a three-dimensional sub-rectangle for a texture image in a compressed format.

## Programs and shaders

- `WebGL2RenderingContext.getFragDataLocation()`
    Returns the binding of color numbers to user-defined varying out variables.

## Uniforms and attributes

- `WebGL2RenderingContext.uniform1234[v]()`
    Methods specifying values of uniform variables.
- `WebGL2RenderingContext.uniformMatrix[234]x[234]fv()`
    Methods specifying matrix values for uniform variables.
- `WebGL2RenderingContext.vertexAttribI4[u]iv`
    Methods specifying integer values for generic vertex attributes.
- `WebGL2RenderingContext.vertexAttribIPointer()`
    Specifies integer data formats and locations of vertex attributes in a vertex attributes array.

## Color spaces

- `WebGL2RenderingContext.drawingBufferColorSpace`
    Specifies the color space of the WebGL drawing buffer.
- `WebGL2RenderingContext.unpackColorSpace`
    Specifies the color space to convert to when importing textures.

## Drawing buffers

- `WebGL2RenderingContext.vertexAttribDivisor()`
    Modifies the rate at which generic vertex attributes advance when rendering multiple instances of primitives with `gl.drawArraysInstanced()` and `gl.drawElementsInstanced()`.
- `WebGL2RenderingContext.drawArraysInstanced()`
    Renders primitives from array data. In addition, it can execute multiple instances of the range of elements.
- `WebGL2RenderingContext.drawElementsInstanced()`
    Renders primitives from array data. In addition, it can execute multiple instances of a set of elements.
- `WebGL2RenderingContext.drawRangeElements()`
    Renders primitives from array data in a given range.
- `WebGL2RenderingContext.drawBuffers()`
    Specifies a list of color buffers to be drawn into.
- `WebGL2RenderingContext.clearBufferfiuv`
    Clears buffers from the currently bound framebuffer.

## Query objects

Methods for working with `WebGLQuery` objects.

- `WebGL2RenderingContext.createQuery()`
    Creates a new `WebGLQuery` object.
- `WebGL2RenderingContext.deleteQuery()`
    Deletes a given `WebGLQuery` object.
- `WebGL2RenderingContext.isQuery()`
    Returns `true` if a given object is a valid `WebGLQuery` object.
- `WebGL2RenderingContext.beginQuery()`
    Begins an asynchronous query.
- `WebGL2RenderingContext.endQuery()`
    Marks the end of an asynchronous query.
- `WebGL2RenderingContext.getQuery()`
    Returns a `WebGLQuery` object for a given target.
- `WebGL2RenderingContext.getQueryParameter()`
    Returns information about a query.

## Sampler objects

- `WebGL2RenderingContext.createSampler()`
    Creates a new `WebGLSampler` object.
- `WebGL2RenderingContext.deleteSampler()`
    Deletes a given `WebGLSampler` object.
- `WebGL2RenderingContext.bindSampler()`
    Binds a given `WebGLSampler` to a texture unit.
- `WebGL2RenderingContext.isSampler()`
    Returns `true` if a given object is a valid `WebGLSampler` object.
- `WebGL2RenderingContext.samplerParameterif`
    Sets sampler parameters.
- `WebGL2RenderingContext.getSamplerParameter()`
    Returns sampler parameter information.

## Sync objects

- `WebGL2RenderingContext.fenceSync()`
    Creates a new `WebGLSync` object and inserts it into the GL command stream.
- `WebGL2RenderingContext.isSync()`
    Returns `true` if the passed object is a valid `WebGLSync` object.
- `WebGL2RenderingContext.deleteSync()`
    Deletes a given `WebGLSync` object.
- `WebGL2RenderingContext.clientWaitSync()`
    Blocks and waits for a `WebGLSync` object to become signaled or a given timeout to be passed.
- `WebGL2RenderingContext.waitSync()`
    Returns immediately, but waits on the GL server until the given `WebGLSync` object is signaled.
- `WebGL2RenderingContext.getSyncParameter()`
    Returns parameter information of a `WebGLSync` object.

## Transform feedback

- `WebGL2RenderingContext.createTransformFeedback()`
    Creates and initializes `WebGLTransformFeedback` objects.
- `WebGL2RenderingContext.deleteTransformFeedback()`
    Deletes a given `WebGLTransformFeedback` object.
- `WebGL2RenderingContext.isTransformFeedback()`
    Returns `true` if the passed object is a valid `WebGLTransformFeedback` object.
- `WebGL2RenderingContext.bindTransformFeedback()`
    Binds a passed `WebGLTransformFeedback` object to the current GL state.
- `WebGL2RenderingContext.beginTransformFeedback()`
    Starts a transform feedback operation.
- `WebGL2RenderingContext.endTransformFeedback()`
    Ends a transform feedback operation.
- `WebGL2RenderingContext.transformFeedbackVaryings()`
    Specifies values to record in `WebGLTransformFeedback` buffers.
- `WebGL2RenderingContext.getTransformFeedbackVarying()`
    Returns information about varying variables from `WebGLTransformFeedback` buffers.
- `WebGL2RenderingContext.pauseTransformFeedback()`
    Pauses a transform feedback operation.
- `WebGL2RenderingContext.resumeTransformFeedback()`
    Resumes a transform feedback operation.

## Uniform buffer objects

- `WebGL2RenderingContext.bindBufferBase()`
    Binds a given `WebGLBuffer` to a given binding point (`target`) at a given `index`.
- `WebGL2RenderingContext.bindBufferRange()`
    Binds a range of a given `WebGLBuffer` to a given binding point (`target`) at a given `index`.
- `WebGL2RenderingContext.getUniformIndices()`
    Retrieves the indices of a number of uniforms within a `WebGLProgram`.
- `WebGL2RenderingContext.getActiveUniforms()`
    Retrieves information about active uniforms within a `WebGLProgram`.
- `WebGL2RenderingContext.getUniformBlockIndex()`
    Retrieves the index of a uniform block within a `WebGLProgram`.
- `WebGL2RenderingContext.getActiveUniformBlockParameter()`
    Retrieves information about an active uniform block within a `WebGLProgram`.
- `WebGL2RenderingContext.getActiveUniformBlockName()`
    Retrieves the name of the active uniform block at a given index within a `WebGLProgram`.
- `WebGL2RenderingContext.uniformBlockBinding()`
    Assigns binding points for active uniform blocks.

## Vertex array objects

Methods for working with `WebGLVertexArrayObject` (VAO) objects.

- `WebGL2RenderingContext.createVertexArray()`
    Creates a new `WebGLVertexArrayObject`.
- `WebGL2RenderingContext.deleteVertexArray()`
    Deletes a given `WebGLVertexArrayObject`.
- `WebGL2RenderingContext.isVertexArray()`
    Returns `true` if a given object is a valid `WebGLVertexArrayObject`.
- `WebGL2RenderingContext.bindVertexArray()`
    Binds a given `WebGLVertexArrayObject` to the buffer.

## See also

- `HTMLCanvasElement`
- `WebGLRenderingContext`
