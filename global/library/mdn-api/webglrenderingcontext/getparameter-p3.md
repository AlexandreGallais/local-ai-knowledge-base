---
title: "WebGLRenderingContext: getParameter() method (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getParameter() method (part 3 of 3)

### WebGL extensions

You can query the following `pname` parameters when using WebGL extensions:

       | Constant
       | Returned type
       | Extension
       | Description

       | `ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT`
       | `GLfloat`
       | `EXT_texture_filter_anisotropic`
       | Maximum available anisotropy.

       | `ext.FRAGMENT_SHADER_DERIVATIVE_HINT_OES`
       | `GLenum`
       | `OES_standard_derivatives`
       |
        Accuracy of the derivative calculation for the GLSL built-in functions:
        `dFdx`, `dFdy`, and `fwidth`.

       | `ext.MAX_COLOR_ATTACHMENTS_WEBGL`
       | `GLint`
       | `WEBGL_draw_buffers`
       | The maximum number of framebuffer color attachment points.

       | `ext.MAX_DRAW_BUFFERS_WEBGL`
       | `GLint`
       | `WEBGL_draw_buffers`
       | The maximum number of draw buffers.

       |
        <code
          >ext.DRAW_BUFFER0_WEBGLext.DRAW_BUFFER1_WEBGLext.DRAW_BUFFER2_WEBGLext.DRAW_BUFFER3_WEBGLext.DRAW_BUFFER4_WEBGLext.DRAW_BUFFER5_WEBGLext.DRAW_BUFFER6_WEBGLext.DRAW_BUFFER7_WEBGLext.DRAW_BUFFER8_WEBGLext.DRAW_BUFFER9_WEBGLext.DRAW_BUFFER10_WEBGLext.DRAW_BUFFER11_WEBGLext.DRAW_BUFFER12_WEBGLext.DRAW_BUFFER13_WEBGLext.DRAW_BUFFER14_WEBGLext.DRAW_BUFFER15_WEBGL</code
        >

       | `GLenum`
       | `WEBGL_draw_buffers`
       | Drawing buffers.

       | `ext.VERTEX_ARRAY_BINDING_OES`
       |
        `WebGLVertexArrayObjectOES`

       | `OES_vertex_array_object`
       | Bound vertex array object (VAO).

       | `ext.TIMESTAMP_EXT`
       | `GLuint64EXT`
       | `EXT_disjoint_timer_query`
       | The current time.

       | `ext.GPU_DISJOINT_EXT`
       | `GLboolean`
       | `EXT_disjoint_timer_query`
       |
        Returns whether or not the GPU performed any disjoint operation.

       | `ext.MAX_VIEWS_OVR`
       | `GLint`
       | `OVR_multiview2`
       | Maximum number of views.

       | `ext.POLYGON_OFFSET_CLAMP_EXT`
       | `GLfloat`
       | `EXT_polygon_offset_clamp`
       | Maximum or minimum depth offset.

## Examples

```js
gl.getParameter(gl.DITHER);
gl.getParameter(gl.VERSION);
gl.getParameter(gl.VIEWPORT);
```

## See also

- `WebGLRenderingContext.enable()`
- `WebGLRenderingContext.disable()`
- `EXT_texture_filter_anisotropic`
- `OES_standard_derivatives`
- `WEBGL_draw_buffers`
- `EXT_disjoint_timer_query`
