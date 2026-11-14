---
title: "WebGL best practices (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/webgl_best_practices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL best practices (part 3 of 3)

### Use invalidateFramebuffer

Storing data that you won't use again can have high cost, particularly on tiled-rendering GPUs common on mobile. When you're done with the contents of a framebuffer attachment, use WebGL 2.0's `invalidateFramebuffer` to discard the data, instead of leaving the driver to waste time storing the data for later use. DEPTH/STENCIL and/or multisampled attachments in particular are great candidates for `invalidateFramebuffer`.

### Use non-blocking async data readback

Operations like `readPixels` and `getBufferSubData` are typically synchronous, but using the same APIs, non-blocking, asynchronous data readback can be achieved. The approach in WebGL 2 is analogous to the approach in OpenGL: Async downloads in blocking APIs

```js
function clientWaitAsync(gl, sync, flags, intervalMs) {
  return new Promise((resolve, reject) => {
    function test() {
      const res = gl.clientWaitSync(sync, flags, 0);
      if (res === gl.WAIT_FAILED) {
        reject(new Error("clientWaitSync failed"));
        return;
      }
      if (res === gl.TIMEOUT_EXPIRED) {
        setTimeout(test, intervalMs);
        return;
      }
      resolve();
    }
    test();
  });
}

async function getBufferSubDataAsync(
  gl,
  target,
  buffer,
  srcByteOffset,
  dstBuffer,
  /* optional */ dstOffset,
  /* optional */ length,
) {
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  gl.flush();

  await clientWaitAsync(gl, sync, 0, 10);
  gl.deleteSync(sync);

  gl.bindBuffer(target, buffer);
  gl.getBufferSubData(target, srcByteOffset, dstBuffer, dstOffset, length);
  gl.bindBuffer(target, null);

  return dstBuffer;
}

async function readPixelsAsync(gl, x, y, w, h, format, type, dest) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buf);
  gl.bufferData(gl.PIXEL_PACK_BUFFER, dest.byteLength, gl.STREAM_READ);
  gl.readPixels(x, y, w, h, format, type, 0);
  gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);

  await getBufferSubDataAsync(gl, gl.PIXEL_PACK_BUFFER, buf, 0, dest);

  gl.deleteBuffer(buf);
  return dest;
}
```

### Use `WEBGL_provoking_vertex` when it's available

When assembling vertices into primitives such as triangles and lines, in OpenGL's convention, the last vertex of the primitive is considered the "provoking vertex". This is relevant when using `flat` vertex attribute interpolation in ESSL300 (WebGL 2); the attribute value from the provoking vertex is used for all of the vertices of the primitive.

Nowadays, many browsers' WebGL implementations are hosted on top of different graphics APIs than OpenGL, and some of these APIs use the first vertex as the provoking vertex for drawing commands. Emulating OpenGL's provoking vertex convention can be computationally expensive on some of these APIs.

For this reason, the WEBGL_provoking_vertex extension has been introduced. If a WebGL implementation exposes this extension, this is a hint to the application that changing the convention to `FIRST_VERTEX_CONVENTION_WEBGL` will improve performance. It is strongly recommended that applications using flat shading check for the presence of this extension, and use it to do so if it's available. Note that this may require changes to the application's vertex buffers or shaders.

## Improve compatibility

### Understand extension availability

The availability of WebGL extensions depends on the browser and client system. Check the result of `getExtension()` before using an extension: it returns `null` if the extension is unavailable. When using WebGL extensions, if possible, try to make them optional by gracefully adapting to the case where they are not supported.

For example, this code optionally enables anisotropic filtering for the texture currently bound to `gl.TEXTURE_2D`. If the extension is unavailable, the texture uses linear filtering:

```js
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

const ext = gl.getExtension("EXT_texture_filter_anisotropic");
if (ext) {
  const maxAnisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
  gl.texParameterf(
    gl.TEXTURE_2D,
    ext.TEXTURE_MAX_ANISOTROPY_EXT,
    Math.min(4, maxAnisotropy),
  );
}
```

### Understand system limits

Similarly to extensions, the limits of your system will be different than your clients' systems. Don't assume you can use thirty texture samplers per shader just because it works on your machine.

The minimum requirements for WebGL are quite low. In practice, effectively all systems support at least the following:

```plain
MAX_CUBE_MAP_TEXTURE_SIZE: 4096
MAX_RENDERBUFFER_SIZE: 4096
MAX_TEXTURE_SIZE: 4096
MAX_VIEWPORT_DIMS: [4096,4096]
MAX_VERTEX_TEXTURE_IMAGE_UNITS: 4
MAX_TEXTURE_IMAGE_UNITS: 8
MAX_COMBINED_TEXTURE_IMAGE_UNITS: 8
MAX_VERTEX_ATTRIBS: 16
MAX_VARYING_VECTORS: 8
MAX_VERTEX_UNIFORM_VECTORS: 128
MAX_FRAGMENT_UNIFORM_VECTORS: 64
ALIASED_POINT_SIZE_RANGE: [1,100]
```

Your desktop may support 16k textures but lower-end systems may not and the same content will not work there.

### Avoid "#ifdef GL_ES"

You should never use `#ifdef GL_ES` in your WebGL shaders; this condition is always true in WebGL. Although some early examples used this, it's not necessary.

### Don't assume you can render into float textures

There are many, many systems that support RGBA32F textures, but if you attach one to a framebuffer you'll get `FRAMEBUFFER_INCOMPLETE_ATTACHMENT` from `checkFramebufferStatus()`.

On WebGL 1, use the `EXT_color_buffer_half_float` and `WEBGL_color_buffer_float` extensions to check for render-to-float-texture support for float16 and float32 respectively.

On WebGL 2, `EXT_color_buffer_float` checks for render-to-float-texture support for both float32 and float16. `EXT_color_buffer_half_float` is present on systems which only support rendering to float16 textures.

#### Render-to-float32 doesn't imply float32-blending!

It may work on your system, but on many others it won't. Avoid it if you can. Check for the `EXT_float_blend` extension to check for support.

Float16-blending is always supported.

## Improve quality

### Be precise with GLSL precision annotations

If you expect to pass an essl300 `int` between shaders, and you need it to have 32-bits, you _must_ use `highp` or you will have portability problems. (Works on Desktop, not on Android)

If you have a float texture, iOS requires that you use `highp sampler2D foo;`, or it will very painfully give you `lowp` texture samples! (+/-2.0 max is probably not good enough for you)

#### Implicit defaults

The vertex language has the following predeclared globally scoped default precision statements:

```glsl
precision highp float;
precision highp int;
precision lowp sampler2D;
precision lowp samplerCube;
```

The fragment language has the following predeclared globally scoped default precision statements:

```glsl
precision mediump int;
precision lowp sampler2D;
precision lowp samplerCube;
```

#### In WebGL 1, "highp float" support is optional in fragment shaders

Using `highp` precision unconditionally in fragment shaders will prevent your content from working on some older mobile hardware.

You can use `mediump float` instead, but be aware that this often results in corrupted rendering due to lack of precision (particularly mobile systems) though the corruption is not going to be visible on a typical desktop computer.

If you know your precision requirements, `getShaderPrecisionFormat()` will tell you what the system supports.

If `highp float` is available, `GL_FRAGMENT_PRECISION_HIGH` will be defined as `1`.

A good pattern for "always give me the highest precision":

```glsl
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
```

#### ESSL100 minimum requirements (WebGL 1)

| `float`   | think               | range         | min above zero | precision      |
| --------- | ------------------- | ------------- | -------------- | -------------- |
| `highp`   | float24\*           | (-2^62, 2^62) | 2^-62          | 2^-16 relative |
| `mediump` | IEEE float16        | (-2^14, 2^14) | 2^-14          | 2^-10 relative |
| `lowp`    | 10-bit signed fixed | (-2, 2)       | 2^-8           | 2^-8 absolute  |

| `int`     | think | range         |
| --------- | ----- | ------------- |
| `highp`   | int17 | (-2^16, 2^16) |
| `mediump` | int11 | (-2^10, 2^10) |
| `lowp`    | int9  | (-2^8, 2^8)   |

_\*float24: sign bit, 7-bit for exponent, 16-bit for mantissa._

#### ESSL300 minimum requirements (WebGL 2)

| `float`   | think               | range           | min above zero | precision      |
| --------- | ------------------- | --------------- | -------------- | -------------- |
| `highp`   | IEEE float32        | (-2^126, 2^127) | 2^-126         | 2^-24 relative |
| `mediump` | IEEE float16        | (-2^14, 2^14)   | 2^-14          | 2^-10 relative |
| `lowp`    | 10-bit signed fixed | (-2, 2)         | 2^-8           | 2^-8 absolute  |

| `(u)int`  | think    | `int` range       | `unsigned int` range |
| --------- | -------- | ----------------- | -------------------- |
| `highp`   | (u)int32 | [-2^31, 2^31 - 1] | [0, 2^32 - 1]        |
| `mediump` | (u)int16 | [-2^15, 2^15 - 1] | [0, 2^16 - 1]        |
| `lowp`    | (u)int9  | [-2^8, 2^8 - 1]   | [0, 2^9 - 1]         |

### Use mipmaps for any texture you'll see in 3d

When in doubt, call `generateMipmap()` after texture uploads. Mipmaps are cheap on memory (about 33% overhead for square textures) while providing often-large performance advantages when textures are "zoomed out" or generally downscaled in the distance in 3d, or even for cube-maps!

It's quicker to sample from smaller texture images due to better inherent texture fetch cache locality: Zooming out on a non-mipmapped texture ruins texture fetch cache locality, because neighboring pixels no longer sample from neighboring texels!

However, for 2d resources that are never "zoomed out", don't pay the extra memory surcharge for mipmaps:

```js
const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // Defaults to NEAREST_MIPMAP_LINEAR, for mipmapping!
```

(In WebGL 2, you should just use `texStorage` with `levels=1`)

One caveat: for sized internal formats, `generateMipmap` only works if you would be able to render into the texture if you attached it to a framebuffer and the format supports texture filtering. (The spec calls these "color-renderable" and "texture-filterable" formats.) Unsized formats such as WebGL 1's `ALPHA`, `LUMINANCE`, and `LUMINANCE_ALPHA` can support mipmap generation without being color-renderable. Compressed and depth/stencil formats do not support `generateMipmap`. In WebGL 1, texture dimensions must also be powers of two.

### `devicePixelRatio` and high-dpi rendering

Handling `devicePixelRatio !== 1.0` is tricky. While the common approach is to set `canvas.width = width * devicePixelRatio`, rounding differences can cause moiré artifacts with non-integer values of `devicePixelRatio`, as is common with UI scaling on Windows, as well as zooming on all platforms.

The most reliable way to avoid this is to ask the browser for the exact size of the canvas in device pixels, using `ResizeObserver` with `'device-pixel-content-box'`, as described in the next section. This works with normal CSS layout, so the canvas can keep filling whatever container it's in.

As a fallback, you can use non-integer values for CSS's `top`/`bottom`/`left`/`right` to fairly reliably 'pre-snap' your canvas to whole integer device coordinates. This only works if you position the canvas yourself, so it doesn't fit layouts where the canvas is sized by its container.

Demo: Device pixel presnap

### ResizeObserver and 'device-pixel-content-box'

On supporting browsers, `devicePixelContentBoxSize` reports the content box in device pixels. Observe with `box: "device-pixel-content-box"` to receive callbacks when this size changes. The example below falls back to observing the content box in CSS pixels when device-pixel sizes are unavailable. It assumes horizontal writing mode and a canvas whose CSS width and height are set independently of its `width` and `height` attributes, to avoid a resize feedback loop.

```js
let pendingWidth = canvas.width;
let pendingHeight = canvas.height;

function onResize(entries) {
  for (const entry of entries) {
    let width;
    let height;
    if (entry.devicePixelContentBoxSize) {
      width = entry.devicePixelContentBoxSize[0].inlineSize;
      height = entry.devicePixelContentBoxSize[0].blockSize;
    } else {
      // Fallback for browsers without device-pixel-content-box support
      const dpr = window.devicePixelRatio;
      width = Math.round(entry.contentBoxSize[0].inlineSize * dpr);
      height = Math.round(entry.contentBoxSize[0].blockSize * dpr);
    }
    pendingWidth = width;
    pendingHeight = height;
  }
}

const observer = new ResizeObserver(onResize);
try {
  observer.observe(canvas, { box: "device-pixel-content-box" });
} catch {
  // Browsers that don't support this box option throw an error
  observer.observe(canvas, { box: "content-box" });
}

function resizeCanvas() {
  if (canvas.width !== pendingWidth || canvas.height !== pendingHeight) {
    canvas.width = pendingWidth;
    canvas.height = pendingHeight;
  }
}
```

If you render in a `requestAnimationFrame()` loop, call `resizeCanvas()` before drawing: each frame can then read `canvas.width` and `canvas.height` and pass them to `gl.viewport()`. Resizing directly in the observer could clear a frame that has already been drawn, because observer callbacks run after animation-frame callbacks. If you only render on demand, call your render function at the end of the callback, and have it call `resizeCanvas()` before drawing, because changing the size of a canvas clears it.

The content-box fallback is approximate: the rounded size may not exactly match the device pixels the canvas covers, and the callback doesn't run when only `devicePixelRatio` changes, for example when the window moves to a display with a different pixel density. To handle that case, you can also listen for changes to a resolution media query with `Window.matchMedia()`.
