---
title: "WebGLRenderingContext"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext

The **`WebGLRenderingContext`** interface provides an interface to the OpenGL ES 2.0 graphics rendering context for the drawing surface of an HTML `<canvas>` element.

To get an access to a WebGL context for 2D and/or 3D graphics rendering, call `getContext()` on a `<canvas>` element, supplying "webgl" as the argument:

```js
const canvas = document.getElementById("myCanvas");
const gl = canvas.getContext("webgl");
```

Once you have the WebGL rendering context for a canvas, you can render within it. The WebGL tutorial has more information, examples, and resources on how to get started with WebGL.

If you require a WebGL 2.0 context, see `WebGL2RenderingContext`; this supplies access to an implementation of OpenGL ES 3.0 graphics.

## Constants

See the WebGL constants page.

## The WebGL context

The following properties and methods provide general information and functionality to deal with the WebGL context:

- `WebGLRenderingContext.canvas` (read-only)
    A back-reference to the `HTMLCanvasElement`. Might be `null` if it is not associated with a `<canvas>` element.
- `WebGLRenderingContext.drawingBufferWidth` (read-only)
    The width of the current drawing buffer. Should match the width of the canvas element associated with this context.
- `WebGLRenderingContext.drawingBufferHeight` (read-only)
    The height of the current drawing buffer. Should match the height of the canvas element associated with this context.
- `WebGLRenderingContext.getContextAttributes()`
    Returns a `WebGLContextAttributes` object that contains the actual context parameters. Might return `null`, if the context is lost.
- `WebGLRenderingContext.isContextLost()`
    Returns `true` if the context is lost, otherwise returns `false`.
- `WebGLRenderingContext.makeXRCompatible()`
    Ensures the context is compatible with the user's XR hardware, re-creating the context if necessary with a new configuration to do so. This can be used to start an application using standard 2D presentation, then transition to using a VR or AR mode later.

## Viewing and clipping

- `WebGLRenderingContext.scissor()`
    Defines the scissor box.
- `WebGLRenderingContext.viewport()`
    Sets the viewport.

## State information

- `WebGLRenderingContext.activeTexture()`
    Selects the active texture unit.
- `WebGLRenderingContext.blendColor()`
    Sets the source and destination blending factors.
- `WebGLRenderingContext.blendEquation()`
    Sets both the RGB blend equation and alpha blend equation to a single equation.
- `WebGLRenderingContext.blendEquationSeparate()`
    Sets the RGB blend equation and alpha blend equation separately.
- `WebGLRenderingContext.blendFunc()`
    Defines which function is used for blending pixel arithmetic.
- `WebGLRenderingContext.blendFuncSeparate()`
    Defines which function is used for blending pixel arithmetic for RGB and alpha components separately.
- `WebGLRenderingContext.clearColor()`
    Specifies the color values used when clearing color buffers.
- `WebGLRenderingContext.clearDepth()`
    Specifies the depth value used when clearing the depth buffer.
- `WebGLRenderingContext.clearStencil()`
    Specifies the stencil value used when clearing the stencil buffer.
- `WebGLRenderingContext.colorMask()`
    Sets which color components to enable or to disable when drawing or rendering to a `WebGLFramebuffer`.
- `WebGLRenderingContext.cullFace()`
    Specifies whether or not front- and/or back-facing polygons can be culled.
- `WebGLRenderingContext.depthFunc()`
    Specifies a function that compares incoming pixel depth to the current depth buffer value.
- `WebGLRenderingContext.depthMask()`
    Sets whether writing into the depth buffer is enabled or disabled.
- `WebGLRenderingContext.depthRange()`
    Specifies the depth range mapping from normalized device coordinates to window or viewport coordinates.
- `WebGLRenderingContext.disable()`
    Disables specific WebGL capabilities for this context.
- `WebGLRenderingContext.enable()`
    Enables specific WebGL capabilities for this context.
- `WebGLRenderingContext.frontFace()`
    Specifies whether polygons are front- or back-facing by setting a winding orientation.
- `WebGLRenderingContext.getParameter()`
    Returns a value for the passed parameter name.
- `WebGLRenderingContext.getError()`
    Returns error information.
- `WebGLRenderingContext.hint()`
    Specifies hints for certain behaviors. The interpretation of these hints depend on the implementation.
- `WebGLRenderingContext.isEnabled()`
    Tests whether a specific WebGL capability is enabled or not for this context.
- `WebGLRenderingContext.lineWidth()`
    Sets the line width of rasterized lines.
- `WebGLRenderingContext.pixelStorei()`
    Specifies the pixel storage modes
- `WebGLRenderingContext.polygonOffset()`
    Specifies the scale factors and units to calculate depth values.
- `WebGLRenderingContext.sampleCoverage()`
    Specifies multi-sample coverage parameters for anti-aliasing effects.
- `WebGLRenderingContext.stencilFunc()`
    Sets both the front and back function and reference value for stencil testing.
- `WebGLRenderingContext.stencilFuncSeparate()`
    Sets the front and/or back function and reference value for stencil testing.
- `WebGLRenderingContext.stencilMask()`
    Controls enabling and disabling of both the front and back writing of individual bits in the stencil planes.
- `WebGLRenderingContext.stencilMaskSeparate()`
    Controls enabling and disabling of front and/or back writing of individual bits in the stencil planes.
- `WebGLRenderingContext.stencilOp()`
    Sets both the front and back-facing stencil test actions.
- `WebGLRenderingContext.stencilOpSeparate()`
    Sets the front and/or back-facing stencil test actions.

## Buffers

- `WebGLRenderingContext.bindBuffer()`
    Binds a `WebGLBuffer` object to a given target.
- `WebGLRenderingContext.bufferData()`
    Updates buffer data.
- `WebGLRenderingContext.bufferSubData()`
    Updates buffer data starting at a passed offset.
- `WebGLRenderingContext.createBuffer()`
    Creates a `WebGLBuffer` object.
- `WebGLRenderingContext.deleteBuffer()`
    Deletes a `WebGLBuffer` object.
- `WebGLRenderingContext.getBufferParameter()`
    Returns information about the buffer.
- `WebGLRenderingContext.isBuffer()`
    Returns a Boolean indicating if the passed buffer is valid.

## Framebuffers

- `WebGLRenderingContext.bindFramebuffer()`
    Binds a `WebGLFrameBuffer` object to a given target.
- `WebGLRenderingContext.checkFramebufferStatus()`
    Returns the status of the framebuffer.
- `WebGLRenderingContext.createFramebuffer()`
    Creates a `WebGLFrameBuffer` object.
- `WebGLRenderingContext.deleteFramebuffer()`
    Deletes a `WebGLFrameBuffer` object.
- `WebGLRenderingContext.framebufferRenderbuffer()`
    Attaches a `WebGLRenderingBuffer` object to a `WebGLFrameBuffer` object.
- `WebGLRenderingContext.framebufferTexture2D()`
    Attaches a textures image to a `WebGLFrameBuffer` object.
- `WebGLRenderingContext.getFramebufferAttachmentParameter()`
    Returns information about the framebuffer.
- `WebGLRenderingContext.isFramebuffer()`
    Returns a Boolean indicating if the passed `WebGLFrameBuffer` object is valid.
- `WebGLRenderingContext.readPixels()`
    Reads a block of pixels from the `WebGLFrameBuffer`.

## Renderbuffers

- `WebGLRenderingContext.bindRenderbuffer()`
    Binds a `WebGLRenderBuffer` object to a given target.
- `WebGLRenderingContext.createRenderbuffer()`
    Creates a `WebGLRenderBuffer` object.
- `WebGLRenderingContext.deleteRenderbuffer()`
    Deletes a `WebGLRenderBuffer` object.
- `WebGLRenderingContext.getRenderbufferParameter()`
    Returns information about the renderbuffer.
- `WebGLRenderingContext.isRenderbuffer()`
    Returns a Boolean indicating if the passed `WebGLRenderingBuffer` is valid.
- `WebGLRenderingContext.renderbufferStorage()`
    Creates a renderbuffer data store.

## Textures

- `WebGLRenderingContext.bindTexture()`
    Binds a `WebGLTexture` object to a given target.
- `WebGLRenderingContext.compressedTexImage2D()`
    Specifies a 2D texture image in a compressed format.
- `WebGLRenderingContext.compressedTexSubImage2D()`
    Specifies a 2D texture sub-image in a compressed format.
- `WebGLRenderingContext.copyTexImage2D()`
    Copies a 2D texture image.
- `WebGLRenderingContext.copyTexSubImage2D()`
    Copies a 2D texture sub-image.
- `WebGLRenderingContext.createTexture()`
    Creates a `WebGLTexture` object.
- `WebGLRenderingContext.deleteTexture()`
    Deletes a `WebGLTexture` object.
- `WebGLRenderingContext.generateMipmap()`
    Generates a set of mipmaps for a `WebGLTexture` object.
- `WebGLRenderingContext.getTexParameter()`
    Returns information about the texture.
- `WebGLRenderingContext.isTexture()`
    Returns a Boolean indicating if the passed `WebGLTexture` is valid.
- `WebGLRenderingContext.texImage2D()`
    Specifies a 2D texture image.
- `WebGLRenderingContext.texSubImage2D()`
    Updates a sub-rectangle of the current `WebGLTexture`.
- `WebGLRenderingContext.texParameterf()`
    Sets texture parameters.
- `WebGLRenderingContext.texParameteri()`
    Sets texture parameters.

## Programs and shaders

- `WebGLRenderingContext.attachShader()`
    Attaches a `WebGLShader` to a `WebGLProgram`.
- `WebGLRenderingContext.bindAttribLocation()`
    Binds a generic vertex index to a named attribute variable.
- `WebGLRenderingContext.compileShader()`
    Compiles a `WebGLShader`.
- `WebGLRenderingContext.createProgram()`
    Creates a `WebGLProgram`.
- `WebGLRenderingContext.createShader()`
    Creates a `WebGLShader`.
- `WebGLRenderingContext.deleteProgram()`
    Deletes a `WebGLProgram`.
- `WebGLRenderingContext.deleteShader()`
    Deletes a `WebGLShader`.
- `WebGLRenderingContext.detachShader()`
    Detaches a `WebGLShader`.
- `WebGLRenderingContext.getAttachedShaders()`
    Returns a list of `WebGLShader` objects attached to a `WebGLProgram`.
- `WebGLRenderingContext.getProgramParameter()`
    Returns information about the program.
- `WebGLRenderingContext.getProgramInfoLog()`
    Returns the information log for a `WebGLProgram` object.
- `WebGLRenderingContext.getShaderParameter()`
    Returns information about the shader.
- `WebGLRenderingContext.getShaderPrecisionFormat()`
    Returns a `WebGLShaderPrecisionFormat` object describing the precision for the numeric format of the shader.
- `WebGLRenderingContext.getShaderInfoLog()`
    Returns the information log for a `WebGLShader` object.
- `WebGLRenderingContext.getShaderSource()`
    Returns the source code of a `WebGLShader` as a string.
- `WebGLRenderingContext.isProgram()`
    Returns a Boolean indicating if the passed `WebGLProgram` is valid.
- `WebGLRenderingContext.isShader()`
    Returns a Boolean indicating if the passed `WebGLShader` is valid.
- `WebGLRenderingContext.linkProgram()`
    Links the passed `WebGLProgram` object.
- `WebGLRenderingContext.shaderSource()`
    Sets the source code in a `WebGLShader`.
- `WebGLRenderingContext.useProgram()`
    Uses the specified `WebGLProgram` as part the current rendering state.
- `WebGLRenderingContext.validateProgram()`
    Validates a `WebGLProgram`.

## Uniforms and attributes

- `WebGLRenderingContext.disableVertexAttribArray()`
    Disables a vertex attribute array at a given position.
- `WebGLRenderingContext.enableVertexAttribArray()`
    Enables a vertex attribute array at a given position.
- `WebGLRenderingContext.getActiveAttrib()`
    Returns information about an active attribute variable.
- `WebGLRenderingContext.getActiveUniform()`
    Returns information about an active uniform variable.
- `WebGLRenderingContext.getAttribLocation()`
    Returns the location of an attribute variable.
- `WebGLRenderingContext.getUniform()`
    Returns the value of a uniform variable at a given location.
- `WebGLRenderingContext.getUniformLocation()`
    Returns the location of a uniform variable.
- `WebGLRenderingContext.getVertexAttrib()`
    Returns information about a vertex attribute at a given position.
- `WebGLRenderingContext.getVertexAttribOffset()`
    Returns the address of a given vertex attribute.
- `WebGLRenderingContext.uniform1234[v]()`
    Specifies a value for a uniform variable.
- `WebGLRenderingContext.uniformMatrix[234]fv()`
    Specifies a matrix value for a uniform variable.
- `WebGLRenderingContext.vertexAttrib[1234]fv`
    Specifies a value for a generic vertex attribute.
- `WebGLRenderingContext.vertexAttribPointer()`
    Specifies the data formats and locations of vertex attributes in a vertex attributes array.

## Drawing buffers

- `WebGLRenderingContext.clear()`
    Clears specified buffers to preset values.
- `WebGLRenderingContext.drawArrays()`
    Renders primitives from array data.
- `WebGLRenderingContext.drawElements()`
    Renders primitives from element array data.
- `WebGLRenderingContext.finish()`
    Blocks execution until all previously called commands are finished.
- `WebGLRenderingContext.flush()`
    Empties different buffer commands, causing all commands to be executed as quickly as possible.

## Color spaces

- `WebGLRenderingContext.drawingBufferColorSpace`
    Specifies the color space of the WebGL drawing buffer.
- `WebGLRenderingContext.unpackColorSpace`
    Specifies the color space to convert to when importing textures.

## Working with extensions

These methods manage WebGL extensions:

- `WebGLRenderingContext.getSupportedExtensions()`
    Returns an `Array` of strings containing all the supported WebGL extensions.
- `WebGLRenderingContext.getExtension()`
    Returns an extension object.

## See also

- `HTMLCanvasElement`
