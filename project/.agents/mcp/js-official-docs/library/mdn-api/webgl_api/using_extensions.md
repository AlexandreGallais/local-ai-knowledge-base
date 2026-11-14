---
title: "Using WebGL extensions"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/using_extensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using WebGL extensions

WebGL, like its sister APIs (OpenGL and OpenGL ES), supports extensions. A complete list of extensions is available in the khronos webgl extension registry.

> **Note:**
> In WebGL, unlike in other GL APIs, extensions are only available if explicitly requested.

## Canonical extension names, vendor prefixes and preferences

Extensions may be supported by browser vendors before being officially ratified (but only when they are in draft stage). In that case, their name can be prefixed by the vendor prefix (`MOZ_`, `WEBKIT_`, etc.) or the extension is only available once a browser preference has been toggled.

If you wish to work with the bleeding edge of extensions, and want to keep working on upon ratification (assuming, of course, that the extension doesn't change in incompatible ways), that you query the canonical extension name as well as the vendor extension name. For instance:

```js
const ext =
  gl.getExtension("OES_vertex_array_object") ||
  gl.getExtension("MOZ_OES_vertex_array_object") ||
  gl.getExtension("WEBKIT_OES_vertex_array_object");
```

Note that, vendor prefix have been discouraged thus most browser implement experimental extensions behind a feature flag rather than vendor prefix.

The feature flags are:

- `webgl.enable-draft-extensions` in Firefox
- `chrome://flags/#enable-webgl-draft-extensions` in Chromium based browsers (Chrome, Opera).

## Naming conventions

WebGL extensions are prefixed with "ANGLE", "OES", "EXT" or "WEBGL". These prefixes reflect origin and intent:

- `ANGLE_`: Extensions that are written by the ANGLE library authors.
- `OES_` and `KHR_`: Extensions that mirror functionality from OpenGL ES (OES) or OpenGL API extensions approved by the respective architecture review boards (Khronos).
- `OVR_`: Extensions that optimize for virtual reality.
- `EXT_`: Extensions that mirror other OpenGL ES or OpenGL API extensions.
- `WEBGL_`: Extensions that are WebGL-specific and intended to be compatible with multiple web browsers. It should also be used for extensions which originated with the OpenGL ES or OpenGL APIs, but whose behavior has been significantly altered.

## Querying available extensions

The WebGL context supports querying what extensions are available.

```js
const availableExtensions = gl.getSupportedExtensions();
```

The `WebGLRenderingContext.getSupportedExtensions()` method returns an array of strings, one for each supported extension.

## Extension list

The current extensions are:

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

## Enabling an extension

Before an extension can be used it has to be enabled using `WebGLRenderingContext.getExtension()`. For example:

```js
const ext = gl.getExtension("OES_texture_float");
```

The return value is `null` if the extension is not supported, or an extension object otherwise.

## Extension objects

If an extension defines specific symbols or functions that are not available in the core specification of WebGL, they will be available on the extension object returned by the call to `gl.getExtension()`.

## See also

- `WebGLRenderingContext.getSupportedExtensions()`
- `WebGLRenderingContext.getExtension()`
- webglreport.com
- web3dsurvey.com - WebGL Extension Support Survey
