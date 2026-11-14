---
title: "WebGL: 2D and 3D graphics for the web"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL: 2D and 3D graphics for the web

**WebGL** (Web Graphics Library) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins. WebGL does so by introducing an API that closely conforms to OpenGL ES 2.0 that can be used in HTML `<canvas>` elements. This conformance makes it possible for the API to take advantage of hardware graphics acceleration provided by the user's device.

Support for WebGL is present in all modern browsers (see the compatibility tables below); however, the user's device must also have hardware that supports these features.

The WebGL 2 API introduces support for much of the OpenGL ES 3.0 feature set; it's provided through the `WebGL2RenderingContext` interface.

The `<canvas>` element is also used by the Canvas API to do 2D graphics on web pages.

## Reference

### Standard interfaces

- `WebGLRenderingContext`
- `WebGL2RenderingContext`
- `WebGLActiveInfo`
- `WebGLBuffer`
- `WebGLContextEvent`
- `WebGLFramebuffer`
- `WebGLObject` (experimental)
- `WebGLProgram`
- `WebGLQuery`
- `WebGLRenderbuffer`
- `WebGLSampler`
- `WebGLShader`
- `WebGLShaderPrecisionFormat`
- `WebGLSync`
- `WebGLTexture`
- `WebGLTransformFeedback`
- `WebGLUniformLocation`
- `WebGLVertexArrayObject`

### Extensions

- `ANGLE_instanced_arrays`
- `EXT_blend_minmax`
- `EXT_color_buffer_float`
- `EXT_color_buffer_half_float`
- `EXT_disjoint_timer_query`
- `EXT_float_blend`
- `EXT_frag_depth`
- `EXT_polygon_offset_clamp`
- `EXT_shader_texture_lod`
- `EXT_sRGB`
- `EXT_texture_compression_bptc`
- `EXT_texture_compression_rgtc`
- `EXT_texture_filter_anisotropic`
- `EXT_texture_norm16`
- `KHR_parallel_shader_compile`
- `OES_draw_buffers_indexed`
- `OES_element_index_uint`
- `OES_fbo_render_mipmap`
- `OES_standard_derivatives`
- `OES_texture_float`
- `OES_texture_float_linear`
- `OES_texture_half_float`
- `OES_texture_half_float_linear`
- `OES_vertex_array_object`
- `OVR_multiview2`
- `WEBGL_color_buffer_float`
- `WEBGL_compressed_texture_astc`
- `WEBGL_compressed_texture_etc`
- `WEBGL_compressed_texture_etc1`
- `WEBGL_compressed_texture_pvrtc`
- `WEBGL_compressed_texture_s3tc`
- `WEBGL_compressed_texture_s3tc_srgb`
- `WEBGL_debug_renderer_info`
- `WEBGL_debug_shaders`
- `WEBGL_depth_texture`
- `WEBGL_draw_buffers`
- `WEBGL_lose_context`
- `WEBGL_multi_draw`

### Events

- `webglcontextlost`
- `webglcontextrestored`
- `webglcontextcreationerror`

### Constants and types

- WebGL constants
- WebGL types

### WebGL 2

WebGL 2 is a major update to WebGL which is provided through the `WebGL2RenderingContext` interface. It is based on OpenGL ES 3.0 and new features include:

- 3D textures,
- Sampler objects,
- Uniform Buffer objects,
- Sync objects,
- Query objects,
- Transform Feedback objects,
- Promoted extensions that are now core to WebGL 2: Vertex Array objects, instancing, multiple render targets, fragment depth.

See also the blog post "WebGL 2 lands in Firefox" and webglsamples.org/WebGL2Samples for a few demos.

## Guides and tutorials

Below, you'll find an assortment of guides to help you learn WebGL concepts and tutorials that offer step-by-step lessons and examples.

### Guides

- Data in WebGL
    A guide to variables, buffers, and other types of data used when writing WebGL code.
- WebGL best practices
    Tips and suggestions to help you improve the quality, performance, and reliability of your WebGL content.
- Using extensions
    A guide to using WebGL extensions.

### Tutorials

- WebGL tutorial
    A beginner's guide to WebGL core concepts. A good place to start if you don't have previous WebGL experience.

### Advanced tutorials

- Compressed texture formats
    How to enable and use compressed texture formats for better memory performance.
- WebGL model view projection
    A detailed explanation of the three core matrices that are typically used to represent a 3D object view: the model, view and projection matrices.
- Matrix math for the web
    A useful guide to how 3D transform matrices work, and can be used on the web — both for WebGL calculations and in CSS transforms.

## Resources

- Khronos WebGL site The main website for WebGL at the Khronos Group.
- WebGL Fundamentals A basic <example-value> with fundamentals of WebGL.
- Raw WebGL: An introduction to WebGL A talk by Nick Desaulniers that introduces the basics of WebGL.
- WebGL Academy An HTML/JavaScript editor with tutorials to learn basics of webgl programming.
- WebGL Stats A site with statistics about WebGL capabilities in browsers on different platforms.

### Libraries

- three.js is an open-source, fully featured 3D WebGL library.
- Babylon.js is a powerful, simple, and open game and 3D rendering engine packed into a friendly JavaScript framework.
- Pixi.js is a fast, open-source 2D WebGL renderer.
- Phaser is a fast, free and fun open source framework for Canvas and WebGL powered browser games.
- PlayCanvas is an open-source game engine.
- glMatrix is a JavaScript matrix and vector library for high-performance WebGL apps.
- twgl is a library for making webgl less verbose.
- RedGL is an open-source 3D WebGL library.
- vtk.js is a JavaScript library for scientific visualization in your browser.
- webgl-lint will help find errors in your WebGL code and provide useful info

## Examples

- A basic 2D WebGL animation example
    This example demonstrates the simple animation of a one-color shape. Topics examined are adapting to aspect ratio differences, a function to build shader programs from sets of multiple shaders, and the basics of drawing in WebGL.
- WebGL by example
    A series of live samples with short explanations that showcase WebGL concepts and capabilities. The examples are sorted according to topic and level of difficulty, covering the WebGL rendering context, shader programming, textures, geometry, user interaction, and more.

## Browser compatibility

### Compatibility notes

In addition to the browser, the GPU itself also needs to support the feature. So, for example, S3 Texture Compression (S3TC) is only available on Tegra-based tablets. Most browsers make the WebGL context available through the `webgl` context name, but older ones need `experimental-webgl` as well. In addition, the upcoming WebGL 2 is fully backwards-compatible and will have the context name `webgl2`.

### Gecko notes

#### WebGL debugging and testing

Firefox provides two preferences available which let you control the capabilities of WebGL for testing purposes:

- `webgl.min_capability_mode`
    A Boolean property that, when `true`, enables a minimum capability mode. When in this mode, WebGL is configured to only support the bare minimum feature set and capabilities required by the WebGL specification. This lets you ensure that your WebGL code will work on any device or browser, regardless of their capabilities. This is `false` by default.
- `webgl.disable_extensions`
    A Boolean property that, when `true`, disables all WebGL extensions. This is `false` by default.

## See also

- Canvas API
- Compatibility info about WebGL extensions
