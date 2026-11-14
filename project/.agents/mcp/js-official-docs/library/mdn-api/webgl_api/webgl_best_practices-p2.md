---
title: "WebGL best practices (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/webgl_best_practices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL best practices (part 2 of 3)

## Optimize runtime

### Avoid invalidating FBO attachment bindings

Almost any change to an FBO's attachment bindings will invalidate its framebuffer completeness. Set up your hot framebuffers ahead of time.

In Firefox, setting the pref `webgl.perf.max-warnings` to `-1` in about:config will enable performance warnings that include warnings about FB completeness invalidations.

### Avoid changing VAO attachments (vertexAttribPointer, disable/enableVertexAttribArray)

Drawing from static, unchanging VAOs is faster than mutating the same VAO for every draw call. For unchanged VAOs, browsers can cache the fetch limits, whereas when VAOs change, browsers must revalidate and recalculate limits. The overhead for this is relatively low, but re-using VAOs means fewer `vertexAttribPointer` calls too, so it's worth doing wherever it's easy.

### Flush when expecting results

Call `flush()` when expecting results such as queries, or at completion of a rendering frame.

Flush tells the implementation to push all pending commands out for execution, flushing them out of the queue, instead of waiting for more commands to enqueue before sending for execution.

For example, in WebGL 2, flush after inserting a fence before polling for completion in a later task:

```js
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
gl.flush();

// clientWaitAsync is defined in the async data readback example below.
clientWaitAsync(gl, sync, 0, 10)
  .finally(() => gl.deleteSync(sync))
  .catch(console.error);
```

WebGL doesn't have a SwapBuffers call by default, so a flush can help fill the gap, as well.

#### Use `webgl.flush()` when not using requestAnimationFrame

When not using RAF, use `webgl.flush()` to encourage eager execution of enqueued commands.

Because RAF is directly followed by the frame boundary, an explicit `webgl.flush()` isn't really needed with RAF.

### Avoid blocking API calls in production

Certain WebGL entry points - including `getError` and `getParameter` - cause synchronous stalls on the calling thread. Even basic <example-value> can take as long as 1ms, but they can take even longer if they need to wait for all graphics work to be completed (with an effect similar to `glFinish()` in native OpenGL).

In production code, avoid such entry points, especially on the browser main thread where they can cause the entire page to jank (often including scrolling or even the whole browser).

- `getError()`: causes a flush + round-trip to fetch errors from the GPU process.

  For example, within Firefox, the only time glGetError is checked is after allocations (`bufferData`, `*texImage*`, `texStorage*`) to pick up any GL_OUT_OF_MEMORY errors.

- `getShader/ProgramParameter()`, `getShader/ProgramInfoLog()`, other `get`s on shaders/programs: flush + shader compile + round-trip, if not done after shader compilation is complete. (See also parallel shader compilation below.)
- `get*Parameter()` in general: possible flush + round-trip. In some cases, these will be cached to avoid the round-trip, but try to avoid relying on this.
- `checkFramebufferStatus()`: possible flush + round-trip.
- `getBufferSubData()`: usual finish + round-trip. (This is okay for READ buffers in conjunction with fences - see async data readback below.)
- `readPixels()` to the CPU (i.e., without a PIXEL_PACK buffer bound): finish + round-trip. Instead, use GPU-GPU `readPixels` in conjunction with async data readback.

### Always enable vertex attrib 0 as an array

If you draw without vertex attrib 0 enabled as an array, you will force the browser to do complicated emulation when running on desktop OpenGL (such as on macOS). This is because in desktop OpenGL, nothing gets drawn if vertex attrib 0 is not array-enabled. You can use `bindAttribLocation` to force a vertex attribute to use location 0, and use `enableVertexAttribArray(0)` to make it array-enabled.

### Consider rendering to a smaller back buffer

A common (and easy) way to trade off quality for speed is rendering into a smaller back buffer, and upscaling the result. Consider reducing canvas.width and height and keeping canvas.style.width and height at a constant size.

### Batch draw calls

"Batching" draw calls into fewer, larger draw calls will generally improve performance. If you have 1000 sprites to paint, try to do it as a single `drawArrays()` or `drawElements()` call.

It's common to use "degenerate triangles" if you need to draw discontinuous objects as a single `drawArrays(TRIANGLE_STRIP)` call. Degenerate triangles are triangles with no area, therefore any triangle where more than one point is in the same exact location. These triangles are effectively skipped, which lets you start a new triangle strip unattached to your previous one, without having to split into multiple draw calls.

Another important method for batching is texture atlasing, where multiple images are placed into a single texture, often like a checkerboard. Since you need to split draw call batches to change textures, texture atlasing lets you combine more draw calls into fewer, bigger batches. See this example demonstrating how to combine even sprites referencing multiple texture atlases into a single draw call.

### Prefer doing work in the vertex shader

Do as much work as you can in the vertex shader, rather than in the fragment shader. This is because per draw call, fragment shaders generally run many more times than vertex shaders. Any calculation that can be done on the vertices and then just interpolated among fragments (via `varying`s) is a performance boon. (The interpolation of varyings is very cheap, and is done automatically for you through the fixed functionality rasterization phase of the graphics pipeline.)

For example, a simple animation of a textured surface can be achieved through a time-dependent transformation of texture coordinates. (The simplest case being adding a uniform vector to the texture coordinates attribute vector) If visually acceptable, one can transform the texture coordinates in the vertex shader rather than in the fragment shader, to get better performance.

One common trade-off is to do some lighting calculations per-vertex instead of per-fragment (pixel). In some cases, especially with simple models or dense vertices, this looks good enough.

The inversion of this is if a model has more vertices than pixels in the rendered output. However, LOD meshes is usually the answer to this problem, rarely moving work from the vertex _to_ the fragment shader.

### Compile Shaders and Link Programs in parallel

It's tempting to compile shaders and link programs serially, but many browsers can compile and link in parallel on background threads.

Instead of:

```js
function compileOnce(gl, shader) {
  if (shader.compiled) return;
  gl.compileShader(shader);
  shader.compiled = true;
}
for (const [vs, fs, prog] of programs) {
  compileOnce(gl, vs);
  compileOnce(gl, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(`Link failed: ${gl.getProgramInfoLog(prog)}`);
    console.error(`vs info-log: ${gl.getShaderInfoLog(vs)}`);
    console.error(`fs info-log: ${gl.getShaderInfoLog(fs)}`);
  }
}
```

Consider:

```js
function compileOnce(gl, shader) {
  if (shader.compiled) return;
  gl.compileShader(shader);
  shader.compiled = true;
}
for (const [vs, fs, prog] of programs) {
  compileOnce(gl, vs);
  compileOnce(gl, fs);
}
for (const [vs, fs, prog] of programs) {
  gl.linkProgram(prog);
}
for (const [vs, fs, prog] of programs) {
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(`Link failed: ${gl.getProgramInfoLog(prog)}`);
    console.error(`vs info-log: ${gl.getShaderInfoLog(vs)}`);
    console.error(`fs info-log: ${gl.getShaderInfoLog(fs)}`);
  }
}
```

### Prefer KHR_parallel_shader_compile

While we've described a pattern to allow browsers to compile and link in parallel, normally checking `COMPILE_STATUS` or `LINK_STATUS` blocks until the compile or link completes. In browsers where it's available, the KHR_parallel_shader_compile extension provides a _non-blocking_ `COMPLETION_STATUS` query. Prefer to enable and use this extension.

Example usage:

```js
const ext = gl.getExtension("KHR_parallel_shader_compile");
gl.compileShader(vs);
gl.compileShader(fs);
gl.attachShader(prog, vs);
gl.attachShader(prog, fs);
gl.linkProgram(prog);

// Store program in your data structure.
// Later, for example the next frame:

if (ext) {
  if (gl.getProgramParameter(prog, ext.COMPLETION_STATUS_KHR)) {
    // Check program link status; if OK, use and draw with it.
  }
} else {
  // Checking link status may block until linking completes.
  // Check program link status; if OK, use and draw with it.
}
```

This technique may not work in all applications, for example those which require programs to be immediately available for rendering. Still, consider how variations may work.

### Don't check shader compile status unless linking fails

There are very few errors that are guaranteed to cause shader compilation failure, but cannot be deferred to link time. The ESSL3 spec says this under "Error Handling":

> The implementation should report errors as early a possible but in any case must satisfy the following:
>
> - All lexical, grammatical and semantic errors must have been detected following a call to glLinkProgram
> - Errors due to mismatch between the vertex and fragment shader (link errors) must have been detected following a call to glLinkProgram
> - Errors due to exceeding resource limits must have been detected following any draw call or a call to glValidateProgram
> - A call to glValidateProgram must report all errors associated with a program object given the current GL state.
>
> The allocation of tasks between the compiler and linker is implementation dependent. Consequently there are many errors which may be detected either at compile or link time, depending on the implementation.

Additionally, querying compile status is a synchronous call, which breaks pipelining.

Instead of:

```js
gl.compileShader(vs);
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
  console.error(`vs compile failed: ${gl.getShaderInfoLog(vs)}`);
}

gl.compileShader(fs);
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
  console.error(`fs compile failed: ${gl.getShaderInfoLog(fs)}`);
}

gl.linkProgram(prog);
if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
  console.error(`Link failed: ${gl.getProgramInfoLog(prog)}`);
}
```

Consider:

```js
gl.compileShader(vs);
gl.compileShader(fs);
gl.linkProgram(prog);
if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
  console.error(`Link failed: ${gl.getProgramInfoLog(prog)}`);
  console.error(`vs info-log: ${gl.getShaderInfoLog(vs)}`);
  console.error(`fs info-log: ${gl.getShaderInfoLog(fs)}`);
}
```

### Prefer builtins instead of building your own

Prefer builtins like `dot`, `mix`, and `normalize`. At best, custom implementations might run as fast as the builtins they replace, but don't expect them to. Hardware often has hyper-optimized or even specialized instructions for builtins, and the compiler can't reliably replace your custom builtin-replacements with the special builtin codepaths.

### Some formats (e.g., RGB) may be emulated

A number of formats (particularly three-channel formats) are emulated. For example, RGB32F is often actually RGBA32F, and Luminance8 may actually be RGBA8. RGB8 in particular is often surprisingly slow, as masking out the alpha channel and/or patching blend functions has fairly high overhead. Prefer to use RGBA8 and ignore the alpha yourself for better performance.

### Avoid alpha:false, which can be expensive

Specifying `alpha:false` during context creation causes the browser to composite the WebGL-rendered canvas as though it were opaque, ignoring any alpha values the application writes in its fragment shader. On some platforms, this capability unfortunately comes at a significant performance cost. The RGB back buffer may have to be emulated on top of an RGBA surface, and there are relatively few techniques available in the OpenGL API for making it appear to the application that an RGBA surface has no alpha channel. It has been found that all of these techniques have approximately equal performance impact on affected platforms.

Most applications, even those requiring alpha blending, can be structured to produce `1.0` for the alpha channel. The primary exception is any application requiring destination alpha in the blending function. If feasible, it is recommended to do this rather than using `alpha:false`.

### texImage/texSubImage uploads (esp. videos) can cause pipeline flushes

Most texture uploads from DOM elements will incur a processing pass that will temporarily switch GL Programs internally, causing a pipeline flush. (Pipelines are formalized explicitly in Vulkan et al, but are implicit behind-the-scenes in OpenGL and WebGL. Pipelines are more or less the tuple of shader program, depth/stencil/multisample/blend/rasterization state)

In WebGL:

```glsl
    …
    useProgram(prog1)
<pipeline flush>
    bindFramebuffer(target)
    drawArrays()
    bindTexture(webgl_texture)
    texImage2D(HTMLVideoElement)
    drawArrays()
    …
```

Behind the scenes in the browser:

```glsl
    …
    useProgram(prog1)
<pipeline flush>
    bindFramebuffer(target)
    drawArrays()
    bindTexture(webgl_texture)
    -texImage2D(HTMLVideoElement):
        +useProgram(_internal_tex_transform_prog)
<pipeline flush>
        +bindFramebuffer(webgl_texture._internal_framebuffer)
        +bindTexture(HTMLVideoElement._internal_video_tex)
        +drawArrays() // y-flip/colorspace-transform/alpha-(un)premultiply
        +bindTexture(webgl_texture)
        +bindFramebuffer(target)
        +useProgram(prog1)
<pipeline flush>
    drawArrays()
    …
```

Prefer doing uploads before starting drawing, or at least between pipelines:

In WebGL:

```glsl
    …
    bindTexture(webgl_texture)
    texImage2D(HTMLVideoElement)
    useProgram(prog1)
<pipeline flush>
    bindFramebuffer(target)
    drawArrays()
    bindTexture(webgl_texture)
    drawArrays()
    …
```

Behind the scenes in the browser:

```glsl
    …
    bindTexture(webgl_texture)
    -texImage2D(HTMLVideoElement):
        +useProgram(_internal_tex_transform_prog)
<pipeline flush>
        +bindFramebuffer(webgl_texture._internal_framebuffer)
        +bindTexture(HTMLVideoElement._internal_video_tex)
        +drawArrays() // y-flip/colorspace-transform/alpha-(un)premultiply
        +bindTexture(webgl_texture)
        +bindFramebuffer(target)
    useProgram(prog1)
<pipeline flush>
    bindFramebuffer(target)
    drawArrays()
    bindTexture(webgl_texture)
    drawArrays()
    …
```
