---
title: "WEBGL_draw_buffers extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_draw_buffers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_draw_buffers extension

The **`WEBGL_draw_buffers`** extension is part of the WebGL API and enables a fragment shader to write to several textures, which is useful for deferred shading, for example.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default. In WebGL 2, the constants are available without the "WEBGL" suffix and the new GLSL built-ins require GLSL `#version 300 es`.

## Constants

This extension exposes new constants, which can be used in the `gl.framebufferRenderbuffer()`, `gl.framebufferTexture2D()`, `gl.getFramebufferAttachmentParameter()` `ext.drawBuffersWEBGL()`, and `gl.getParameter()` methods.

- `ext.COLOR_ATTACHMENT0_WEBGL`, `ext.COLOR_ATTACHMENT1_WEBGL`, `ext.COLOR_ATTACHMENT2_WEBGL`, `ext.COLOR_ATTACHMENT3_WEBGL`, `ext.COLOR_ATTACHMENT4_WEBGL`, `ext.COLOR_ATTACHMENT5_WEBGL`, `ext.COLOR_ATTACHMENT6_WEBGL`, `ext.COLOR_ATTACHMENT7_WEBGL`, `ext.COLOR_ATTACHMENT8_WEBGL`, `ext.COLOR_ATTACHMENT9_WEBGL`, `ext.COLOR_ATTACHMENT10_WEBGL`, `ext.COLOR_ATTACHMENT11_WEBGL`, `ext.COLOR_ATTACHMENT12_WEBGL`, `ext.COLOR_ATTACHMENT13_WEBGL`, `ext.COLOR_ATTACHMENT14_WEBGL`, `ext.COLOR_ATTACHMENT15_WEBGL`
    A `GLenum` specifying a color buffer.
- `ext.DRAW_BUFFER0_WEBGL`, `ext.DRAW_BUFFER1_WEBGL`, `ext.DRAW_BUFFER2_WEBGL`, `ext.DRAW_BUFFER3_WEBGL`, `ext.DRAW_BUFFER4_WEBGL`, `ext.DRAW_BUFFER5_WEBGL`, `ext.DRAW_BUFFER6_WEBGL`, `ext.DRAW_BUFFER7_WEBGL`, `ext.DRAW_BUFFER8_WEBGL ext.DRAW_BUFFER9_WEBGL`, `ext.DRAW_BUFFER10_WEBGL`, `ext.DRAW_BUFFER11_WEBGL`, `ext.DRAW_BUFFER12_WEBGL`, `ext.DRAW_BUFFER13_WEBGL`, `ext.DRAW_BUFFER14_WEBGL`, `ext.DRAW_BUFFER15_WEBGL`
    A `GLenum` returning a draw buffer.
- `ext.MAX_COLOR_ATTACHMENTS_WEBGL`
    A `GLint` indicating the maximum number of framebuffer color attachment points.
- `ext.MAX_DRAW_BUFFERS_WEBGL`
    A `GLint` indicating the maximum number of draw buffers.

## Instance methods

This extension exposes one new method.

- `ext.drawBuffersWEBGL()`
    Defines the draw buffers to which all fragment colors are written. (When using `WebGL2`, this method is available as `gl.drawBuffers()` by default).

## Examples

Enabling the extension:

```js
const ext = gl.getExtension("WEBGL_draw_buffers");
```

Binding multiple textures (to a `tx[]` array) to different framebuffer color attachments:

```js
const fb = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  ext.COLOR_ATTACHMENT0_WEBGL,
  gl.TEXTURE_2D,
  tx[0],
  0,
);
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  ext.COLOR_ATTACHMENT1_WEBGL,
  gl.TEXTURE_2D,
  tx[1],
  0,
);
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  ext.COLOR_ATTACHMENT2_WEBGL,
  gl.TEXTURE_2D,
  tx[2],
  0,
);
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  ext.COLOR_ATTACHMENT3_WEBGL,
  gl.TEXTURE_2D,
  tx[3],
  0,
);
```

Mapping the color attachments to draw buffer slots that the fragment shader will write to using `gl_FragData`:

```js
ext.drawBuffersWEBGL([
  ext.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]
  ext.COLOR_ATTACHMENT1_WEBGL, // gl_FragData[1]
  ext.COLOR_ATTACHMENT2_WEBGL, // gl_FragData[2]
  ext.COLOR_ATTACHMENT3_WEBGL, // gl_FragData[3]
]);
```

Shader code that writes to multiple textures:

```html
<script type="x-shader/x-fragment">
  #extension GL_EXT_draw_buffers : require

  precision highp float;

  void main(void) {
    gl_FragData[0] = vec4(0.25);
    gl_FragData[1] = vec4(0.5);
    gl_FragData[2] = vec4(0.75);
    gl_FragData[3] = vec4(1.0);
  }
</script>
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGL2RenderingContext.drawBuffers()`
- WebGL deferred shading - Mozilla Hacks blog
