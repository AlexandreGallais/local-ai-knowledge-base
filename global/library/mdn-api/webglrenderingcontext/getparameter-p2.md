---
title: "WebGLRenderingContext: getParameter() method (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getParameter() method (part 2 of 3)

## Parameter names

### WebGL 1

You can query the following `pname` parameters when using a
`WebGLRenderingContext`.

       | Constant
       | Returned type
       | Description

       | `gl.ACTIVE_TEXTURE`
       | `GLenum`
       |

       | `gl.ALIASED_LINE_WIDTH_RANGE`
       | `Float32Array` (with 2 elements)
       |

       | `gl.ALIASED_POINT_SIZE_RANGE`
       | `Float32Array` (with 2 elements)
       |

       | `gl.ALPHA_BITS`
       | `GLint`
       |

       | `gl.ARRAY_BUFFER_BINDING`
       | `WebGLBuffer`
       |

       | `gl.BLEND`
       | `GLboolean`
       |

       | `gl.BLEND_COLOR`
       | `Float32Array` (with 4 values)
       |

       | `gl.BLEND_DST_ALPHA`
       | `GLenum`
       |

       | `gl.BLEND_DST_RGB`
       | `GLenum`
       |

       | `gl.BLEND_EQUATION`
       | `GLenum`
       |

       | `gl.BLEND_EQUATION_ALPHA`
       | `GLenum`
       |

       | `gl.BLEND_EQUATION_RGB`
       | `GLenum`
       |

       | `gl.BLEND_SRC_ALPHA`
       | `GLenum`
       |

       | `gl.BLEND_SRC_RGB`
       | `GLenum`
       |

       | `gl.BLUE_BITS`
       | `GLint`
       |

       | `gl.COLOR_CLEAR_VALUE`
       | `Float32Array` (with 4 values)
       |

       | `gl.COLOR_WRITEMASK`
       |
        `sequence&#x3C;`GLboolean`>`
        (with 4 values)

       |

       | `gl.COMPRESSED_TEXTURE_FORMATS`
       | `Uint32Array`
       |
        Returns the compressed texture formats.When using the
        `WEBGL_compressed_texture_s3tc` extension:

          `ext.COMPRESSED_RGB_S3TC_DXT1_EXT`
          `ext.COMPRESSED_RGBA_S3TC_DXT1_EXT`
          `ext.COMPRESSED_RGBA_S3TC_DXT3_EXT`
          `ext.COMPRESSED_RGBA_S3TC_DXT5_EXT`

          When using the
          `WEBGL_compressed_texture_s3tc_srgb`
          extension:

          `ext.COMPRESSED_SRGB_S3TC_DXT1_EXT`
          `ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT`
          `ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT`
          `ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT`

        When using the `WEBGL_compressed_texture_etc`
        extension:

          `ext.COMPRESSED_R11_EAC`
          `ext.COMPRESSED_SIGNED_R11_EAC`
          `ext.COMPRESSED_RG11_EAC`
          `ext.COMPRESSED_SIGNED_RG11_EAC`
          `ext.COMPRESSED_RGB8_ETC2`
          `ext.COMPRESSED_RGBA8_ETC2_EAC`
          `ext.COMPRESSED_SRGB8_ETC2`
          `ext.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC`
          `ext.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2`
          `ext.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2`

        When using the
        `WEBGL_compressed_texture_pvrtc` extension:

          `ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG`
          `ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG`
          `ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG`
          `ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG`

        When using the
        `WEBGL_compressed_texture_etc1` extension:

          `ext.COMPRESSED_RGB_ETC1_WEBGL`

        When using the
        `WEBGL_compressed_texture_astc` extension:

          `ext.COMPRESSED_RGBA_ASTC_4x4_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR`
          `ext.COMPRESSED_RGBA_ASTC_5x4_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR`
          `ext.COMPRESSED_RGBA_ASTC_5x5_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR`
          `ext.COMPRESSED_RGBA_ASTC_6x5_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR`
          `ext.COMPRESSED_RGBA_ASTC_6x6_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR`
          `ext.COMPRESSED_RGBA_ASTC_8x5_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR`
          `ext.COMPRESSED_RGBA_ASTC_8x6_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR`
          `ext.COMPRESSED_RGBA_ASTC_8x8_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR`
          `ext.COMPRESSED_RGBA_ASTC_10x5_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR`
          `ext.COMPRESSED_RGBA_ASTC_10x6_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR`
          `ext.COMPRESSED_RGBA_ASTC_10x6_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR`
          `ext.COMPRESSED_RGBA_ASTC_10x10_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR`
          `ext.COMPRESSED_RGBA_ASTC_12x10_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR`
          `ext.COMPRESSED_RGBA_ASTC_12x12_KHR`
          `ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR`

       | `gl.CULL_FACE`
       | `GLboolean`
       |

       | `gl.CULL_FACE_MODE`
       | `GLenum`
       |
        `gl.FRONT`, `gl.BACK` or
        `gl.FRONT_AND_BACK`. See also
        `cullFace`

       | `gl.CURRENT_PROGRAM`
       | `WebGLProgram` or `null`
       |
        See
        `useProgram`.

       | `gl.DEPTH_BITS`
       | `GLint`
       |

       | `gl.DEPTH_CLEAR_VALUE`
       | `GLfloat`
       |

       | `gl.DEPTH_FUNC`
       | `GLenum`
       |

       | `gl.DEPTH_RANGE`
       | `Float32Array` (with 2 elements)
       |

       | `gl.DEPTH_TEST`
       | `GLboolean`
       |

       | `gl.DEPTH_WRITEMASK`
       | `GLboolean`
       |

       | `gl.DITHER`
       | `GLboolean`
       |

       | `gl.ELEMENT_ARRAY_BUFFER_BINDING`
       | `WebGLBuffer`
       |

       | `gl.FRAMEBUFFER_BINDING`
       | `WebGLFramebuffer` or `null`
       |
        `null` corresponds to a binding to the default framebuffer.
        See also
        `bindFramebuffer`.

       | `gl.FRONT_FACE`
       | `GLenum`
       |
        `gl.CW` or `gl.CCW`. See also
        `frontFace`.

       | `gl.GENERATE_MIPMAP_HINT`
       | `GLenum`
       |
        `gl.FASTEST`, `gl.NICEST` or
        `gl.DONT_CARE`. See also
        `hint`.

       | `gl.GREEN_BITS`
       | `GLint`
       |

       | `gl.IMPLEMENTATION_COLOR_READ_FORMAT`
       | `GLenum`
       |

       | `gl.IMPLEMENTATION_COLOR_READ_TYPE`
       | `GLenum`
       |

       | `gl.LINE_WIDTH`
       | `GLfloat`
       |

       | `gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS`
       | `GLint`
       |

       | `gl.MAX_CUBE_MAP_TEXTURE_SIZE`
       | `GLint`
       |

       | `gl.MAX_FRAGMENT_UNIFORM_VECTORS`
       | `GLint`
       |

       | `gl.MAX_RENDERBUFFER_SIZE`
       | `GLint`
       |

       | `gl.MAX_TEXTURE_IMAGE_UNITS`
       | `GLint`
       |

       | `gl.MAX_TEXTURE_SIZE`
       | `GLint`
       |

       | `gl.MAX_VARYING_VECTORS`
       | `GLint`
       |

       | `gl.MAX_VERTEX_ATTRIBS`
       | `GLint`
       |

       | `gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS`
       | `GLint`
       |

       | `gl.MAX_VERTEX_UNIFORM_VECTORS`
       | `GLint`
       |

       | `gl.MAX_VIEWPORT_DIMS`
       | `Int32Array` (with 2 elements)
       |

       | `gl.PACK_ALIGNMENT`
       | `GLint`
       |

       | `gl.POLYGON_OFFSET_FACTOR`
       | `GLfloat`
       |

       | `gl.POLYGON_OFFSET_FILL`
       | `GLboolean`
       |

       | `gl.POLYGON_OFFSET_UNITS`
       | `GLfloat`
       |

       | `gl.RED_BITS`
       | `GLint`
       |

       | `gl.RENDERBUFFER_BINDING`
       | `WebGLRenderbuffer` or `null`
       |
        See
        `bindRenderbuffer`.

       | `gl.RENDERER`
       | string
       |

       | `gl.SAMPLE_BUFFERS`
       | `GLint`
       |

       | `gl.SAMPLE_COVERAGE_INVERT`
       | `GLboolean`
       |

       | `gl.SAMPLE_COVERAGE_VALUE`
       | `GLfloat`
       |

       | `gl.SAMPLES`
       | `GLint`
       |

       | `gl.SCISSOR_BOX`
       | `Int32Array` (with 4 elements)
       |

       | `gl.SCISSOR_TEST`
       | `GLboolean`
       |

       | `gl.SHADING_LANGUAGE_VERSION`
       | string
       |

       | `gl.STENCIL_BACK_FAIL`
       | `GLenum`
       |

       | `gl.STENCIL_BACK_FUNC`
       | `GLenum`
       |

       | `gl.STENCIL_BACK_PASS_DEPTH_FAIL`
       | `GLenum`
       |

       | `gl.STENCIL_BACK_PASS_DEPTH_PASS`
       | `GLenum`
       |

       | `gl.STENCIL_BACK_REF`
       | `GLint`
       |

       | `gl.STENCIL_BACK_VALUE_MASK`
       | `GLuint`
       |

       | `gl.STENCIL_BACK_WRITEMASK`
       | `GLuint`
       |

       | `gl.STENCIL_BITS`
       | `GLint`
       |

       | `gl.STENCIL_CLEAR_VALUE`
       | `GLint`
       |

       | `gl.STENCIL_FAIL`
       | `GLenum`
       |

       | `gl.STENCIL_FUNC`
       | `GLenum`
       |

       | `gl.STENCIL_PASS_DEPTH_FAIL`
       | `GLenum`
       |

       | `gl.STENCIL_PASS_DEPTH_PASS`
       | `GLenum`
       |

       | `gl.STENCIL_REF`
       | `GLint`
       |

       | `gl.STENCIL_TEST`
       | `GLboolean`
       |

       | `gl.STENCIL_VALUE_MASK`
       | `GLuint`
       |

       | `gl.STENCIL_WRITEMASK`
       | `GLuint`
       |

       | `gl.SUBPIXEL_BITS`
       | `GLint`
       |

       | `gl.TEXTURE_BINDING_2D`
       | `WebGLTexture` or `null`
       |

       | `gl.TEXTURE_BINDING_CUBE_MAP`
       | `WebGLTexture` or `null`
       |

       | `gl.UNPACK_ALIGNMENT`
       | `GLint`
       |

       | `gl.UNPACK_COLORSPACE_CONVERSION_WEBGL`
       | `GLenum`
       |

       | `gl.UNPACK_FLIP_Y_WEBGL`
       | `GLboolean`
       |

       | `gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL`
       | `GLboolean`
       |

       | `gl.VENDOR`
       | string
       |

       | `gl.VERSION`
       | string
       |

       | `gl.VIEWPORT`
       | `Int32Array` (with 4 elements)
       |

### WebGL 2

You can query the following `pname` parameters when using a
`WebGL2RenderingContext`.

       | Constant
       | Returned type
       | Description

       | `gl.COPY_READ_BUFFER_BINDING`
       | `WebGLBuffer` or `null`
       |
        See
        `bindBuffer`.

       | `gl.COPY_WRITE_BUFFER_BINDING`
       | `WebGLBuffer` or `null`
       |
        See
        `bindBuffer`.

       |
        <code>gl.DRAW_BUFFERi</code>

       | `GLenum`
       |
        `gl.BACK`, `gl.NONE` or
        `gl.COLOR_ATTACHMENT{0-15}`. See also
        `drawBuffers`.

       | `gl.DRAW_FRAMEBUFFER_BINDING`
       | `WebGLFramebuffer` or `null`
       |
        `null` corresponds to a binding to the default framebuffer.
        See also
        `bindFramebuffer`.

       | `gl.FRAGMENT_SHADER_DERIVATIVE_HINT`
       | `GLenum`
       |
        `gl.FASTEST`, `gl.NICEST` or
        `gl.DONT_CARE`. See also
        `hint`.

       | `gl.MAX_3D_TEXTURE_SIZE`
       | `GLint`
       |

       | `gl.MAX_ARRAY_TEXTURE_LAYERS`
       | `GLint`
       |

       | `gl.MAX_CLIENT_WAIT_TIMEOUT_WEBGL`
       | `GLint64`
       |

       | `gl.MAX_COLOR_ATTACHMENTS`
       | `GLint`
       |

       | `gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS`
       | `GLint64`
       |

       | `gl.MAX_COMBINED_UNIFORM_BLOCKS`
       | `GLint`
       |

       | `gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS`
       | `GLint64`
       |

       | `gl.MAX_DRAW_BUFFERS`
       | `GLint`
       |

       | `gl.MAX_ELEMENT_INDEX`
       | `GLint64`
       |

       | `gl.MAX_ELEMENTS_INDICES`
       | `GLint`
       |

       | `gl.MAX_ELEMENTS_VERTICES`
       | `GLint`
       |

       | `gl.MAX_FRAGMENT_INPUT_COMPONENTS`
       | `GLint`
       |

       | `gl.MAX_FRAGMENT_UNIFORM_BLOCKS`
       | `GLint`
       |

       | `gl.MAX_FRAGMENT_UNIFORM_COMPONENTS`
       | `GLint`
       |

       | `gl.MAX_PROGRAM_TEXEL_OFFSET`
       | `GLint`
       |

       | `gl.MAX_SAMPLES`
       | `GLint`
       |

       | `gl.MAX_SERVER_WAIT_TIMEOUT`
       | `GLint64`
       |

       | `gl.MAX_TEXTURE_LOD_BIAS`
       | `GLfloat`
       |

       | `gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS`
       | `GLint`
       |

       | `gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS`
       | `GLint`
       |

       | `gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS`
       | `GLint`
       |

       | `gl.MAX_UNIFORM_BLOCK_SIZE`
       | `GLint64`
       |

       | `gl.MAX_UNIFORM_BUFFER_BINDINGS`
       | `GLint`
       |

       | `gl.MAX_VARYING_COMPONENTS`
       | `GLint`
       |

       | `gl.MAX_VERTEX_OUTPUT_COMPONENTS`
       | `GLint`
       |

       | `gl.MAX_VERTEX_UNIFORM_BLOCKS`
       | `GLint`
       |

       | `gl.MAX_VERTEX_UNIFORM_COMPONENTS`
       | `GLint`
       |

       | `gl.MIN_PROGRAM_TEXEL_OFFSET`
       | `GLint`
       |

       | `gl.PACK_ROW_LENGTH`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.PACK_SKIP_PIXELS`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.PACK_SKIP_ROWS`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.PIXEL_PACK_BUFFER_BINDING`
       | `WebGLBuffer` or `null`
       |
        See
        `bindBuffer`.

       | `gl.PIXEL_UNPACK_BUFFER_BINDING`
       | `WebGLBuffer` or `null`
       |
        See
        `bindBuffer`.

       | `gl.RASTERIZER_DISCARD`
       | `GLboolean`
       |

       | `gl.READ_BUFFER`
       | `GLenum`
       |

       | `gl.READ_FRAMEBUFFER_BINDING`
       | `WebGLFramebuffer` or `null`
       |
        `null` corresponds to a binding to the default framebuffer.
        See also
        `bindFramebuffer`.

       | `gl.SAMPLE_ALPHA_TO_COVERAGE`
       | `GLboolean`
       |

       | `gl.SAMPLE_COVERAGE`
       | `GLboolean`
       |

       | `gl.SAMPLER_BINDING`
       | `WebGLSampler` or `null`
       |
        See
        `bindSampler`.

       | `gl.TEXTURE_BINDING_2D_ARRAY`
       | `WebGLTexture` or `null`
       |
        See
        `bindTexture`.

       | `gl.TEXTURE_BINDING_3D`
       | `WebGLTexture` or `null`
       |
        See
        `bindTexture`.

       | `gl.TRANSFORM_FEEDBACK_ACTIVE`
       | `GLboolean`
       |

       | `gl.TRANSFORM_FEEDBACK_BINDING`
       |
        `WebGLTransformFeedback` or `null`

       |
        See
        `bindTransformFeedback`.

       | `gl.TRANSFORM_FEEDBACK_BUFFER_BINDING`
       | `WebGLBuffer` or `null`
       |
        See
        `bindBuffer`.

       | `gl.TRANSFORM_FEEDBACK_PAUSED`
       | `GLboolean`
       |

       | `gl.UNIFORM_BUFFER_BINDING`
       | `WebGLBuffer` or `null`
       |
        See
        `bindBuffer`.

       | `gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.UNPACK_IMAGE_HEIGHT`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.UNPACK_ROW_LENGTH`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.UNPACK_SKIP_IMAGES`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.UNPACK_SKIP_PIXELS`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.UNPACK_SKIP_ROWS`
       | `GLint`
       |
        See
        `pixelStorei`.

       | `gl.VERTEX_ARRAY_BINDING`
       |
        `WebGLVertexArrayObject` or `null`

       |
        See
        `bindVertexArray`.
