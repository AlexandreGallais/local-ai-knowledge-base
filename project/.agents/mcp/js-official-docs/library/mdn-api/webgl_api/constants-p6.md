---
title: "WebGL constants (part 6 of 9)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/constants/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL constants (part 6 of 9)

### Shaders

Constants passed to `WebGLRenderingContext.createShader()` or `WebGLRenderingContext.getShaderParameter()`

| Constant name                      | Value  | Description                                                                                                                                                                                      |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FRAGMENT_SHADER`                  | 0x8B30 | Passed to `createShader` to define a fragment shader.                                                                                                                                            |
| `VERTEX_SHADER`                    | 0x8B31 | Passed to `createShader` to define a vertex shader                                                                                                                                               |
| `COMPILE_STATUS`                   | 0x8B81 | Passed to `getShaderParameter` to get the status of the compilation. Returns false if the shader was not compiled. You can then query `getShaderInfoLog` to find the exact error                 |
| `DELETE_STATUS`                    | 0x8B80 | Passed to `getShaderParameter` to determine if a shader was deleted via `deleteShader`. Returns true if it was, false otherwise.                                                                 |
| `LINK_STATUS`                      | 0x8B82 | Passed to `getProgramParameter` after calling `linkProgram` to determine if a program was linked correctly. Returns false if there were errors. Use `getProgramInfoLog` to find the exact error. |
| `VALIDATE_STATUS`                  | 0x8B83 | Passed to `getProgramParameter` after calling `validateProgram` to determine if it is valid. Returns false if errors were found.                                                                 |
| `ATTACHED_SHADERS`                 | 0x8B85 | Passed to `getProgramParameter` after calling `attachShader` to determine if the shader was attached correctly. Returns false if errors occurred.                                                |
| `ACTIVE_ATTRIBUTES`                | 0x8B89 | Passed to `getProgramParameter` to get the number of attributes active in a program.                                                                                                             |
| `ACTIVE_UNIFORMS`                  | 0x8B86 | Passed to `getProgramParameter` to get the number of uniforms active in a program.                                                                                                               |
| `MAX_VERTEX_ATTRIBS`               | 0x8869 | The maximum number of entries possible in the vertex attribute list.                                                                                                                             |
| `MAX_VERTEX_UNIFORM_VECTORS`       | 0x8DFB |                                                                                                                                                                                                  |
| `MAX_VARYING_VECTORS`              | 0x8DFC |                                                                                                                                                                                                  |
| `MAX_COMBINED_TEXTURE_IMAGE_UNITS` | 0x8B4D |                                                                                                                                                                                                  |
| `MAX_VERTEX_TEXTURE_IMAGE_UNITS`   | 0x8B4C |                                                                                                                                                                                                  |
| `MAX_TEXTURE_IMAGE_UNITS`          | 0x8872 | Implementation-dependent number of maximum texture units. At least 8.                                                                                                                            |
| `MAX_FRAGMENT_UNIFORM_VECTORS`     | 0x8DFD |                                                                                                                                                                                                  |
| `SHADER_TYPE`                      | 0x8B4F |                                                                                                                                                                                                  |
| `SHADING_LANGUAGE_VERSION`         | 0x8B8C |                                                                                                                                                                                                  |
| `CURRENT_PROGRAM`                  | 0x8B8D |                                                                                                                                                                                                  |

### Depth or stencil tests

Constants passed to `WebGLRenderingContext.depthFunc()` or `WebGLRenderingContext.stencilFunc()`.

| Constant name | Value  | Description                                                                                                                                                     |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEVER`       | 0x0200 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will never pass, i.e., nothing will be drawn.                                  |
| `LESS`        | 0x0201 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will pass if the new depth value is less than the stored value.                |
| `EQUAL`       | 0x0202 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will pass if the new depth value is equals to the stored value.                |
| `LEQUAL`      | 0x0203 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value.    |
| `GREATER`     | 0x0204 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will pass if the new depth value is greater than the stored value.             |
| `NOTEQUAL`    | 0x0205 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will pass if the new depth value is not equal to the stored value.             |
| `GEQUAL`      | 0x0206 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value. |
| `ALWAYS`      | 0x0207 | Passed to `depthFunction` or `stencilFunction` to specify depth or stencil tests will always pass, i.e., pixels will be drawn in the order they are drawn.      |

### Stencil actions

Constants passed to `WebGLRenderingContext.stencilOp()`.

| Constant name | Value  | Description |
| ------------- | ------ | ----------- |
| `KEEP`        | 0x1E00 |             |
| `REPLACE`     | 0x1E01 |             |
| `INCR`        | 0x1E02 |             |
| `DECR`        | 0x1E03 |             |
| `INVERT`      | 0x150A |             |
| `INCR_WRAP`   | 0x8507 |             |
| `DECR_WRAP`   | 0x8508 |             |

### Textures

Constants passed to `WebGLRenderingContext.texParameteri()`, `WebGLRenderingContext.texParameterf()`, `WebGLRenderingContext.bindTexture()`, `WebGLRenderingContext.texImage2D()`, and others.

| Constant name                 | Value           | Description                      |
| ----------------------------- | --------------- | -------------------------------- |
| `NEAREST`                     | 0x2600          |                                  |
| `LINEAR`                      | 0x2601          |                                  |
| `NEAREST_MIPMAP_NEAREST`      | 0x2700          |                                  |
| `LINEAR_MIPMAP_NEAREST`       | 0x2701          |                                  |
| `NEAREST_MIPMAP_LINEAR`       | 0x2702          |                                  |
| `LINEAR_MIPMAP_LINEAR`        | 0x2703          |                                  |
| `TEXTURE_MAG_FILTER`          | 0x2800          |                                  |
| `TEXTURE_MIN_FILTER`          | 0x2801          |                                  |
| `TEXTURE_WRAP_S`              | 0x2802          |                                  |
| `TEXTURE_WRAP_T`              | 0x2803          |                                  |
| `TEXTURE_2D`                  | 0x0DE1          |                                  |
| `TEXTURE`                     | 0x1702          |                                  |
| `TEXTURE_CUBE_MAP`            | 0x8513          |                                  |
| `TEXTURE_BINDING_CUBE_MAP`    | 0x8514          |                                  |
| `TEXTURE_CUBE_MAP_POSITIVE_X` | 0x8515          |                                  |
| `TEXTURE_CUBE_MAP_NEGATIVE_X` | 0x8516          |                                  |
| `TEXTURE_CUBE_MAP_POSITIVE_Y` | 0x8517          |                                  |
| `TEXTURE_CUBE_MAP_NEGATIVE_Y` | 0x8518          |                                  |
| `TEXTURE_CUBE_MAP_POSITIVE_Z` | 0x8519          |                                  |
| `TEXTURE_CUBE_MAP_NEGATIVE_Z` | 0x851A          |                                  |
| `MAX_CUBE_MAP_TEXTURE_SIZE`   | 0x851C          |                                  |
| `TEXTURE0 - 31`               | 0x84C0 - 0x84DF | A texture unit.                  |
| `ACTIVE_TEXTURE`              | 0x84E0          | The current active texture unit. |
| `REPEAT`                      | 0x2901          |                                  |
| `CLAMP_TO_EDGE`               | 0x812F          |                                  |
| `MIRRORED_REPEAT`             | 0x8370          |                                  |

### Uniform types

| Constant name  | Value  | Description |
| -------------- | ------ | ----------- |
| `FLOAT_VEC2`   | 0x8B50 |             |
| `FLOAT_VEC3`   | 0x8B51 |             |
| `FLOAT_VEC4`   | 0x8B52 |             |
| `INT_VEC2`     | 0x8B53 |             |
| `INT_VEC3`     | 0x8B54 |             |
| `INT_VEC4`     | 0x8B55 |             |
| `BOOL`         | 0x8B56 |             |
| `BOOL_VEC2`    | 0x8B57 |             |
| `BOOL_VEC3`    | 0x8B58 |             |
| `BOOL_VEC4`    | 0x8B59 |             |
| `FLOAT_MAT2`   | 0x8B5A |             |
| `FLOAT_MAT3`   | 0x8B5B |             |
| `FLOAT_MAT4`   | 0x8B5C |             |
| `SAMPLER_2D`   | 0x8B5E |             |
| `SAMPLER_CUBE` | 0x8B60 |             |

### Shader precision-specified types

| Constant name  | Value  | Description |
| -------------- | ------ | ----------- |
| `LOW_FLOAT`    | 0x8DF0 |             |
| `MEDIUM_FLOAT` | 0x8DF1 |             |
| `HIGH_FLOAT`   | 0x8DF2 |             |
| `LOW_INT`      | 0x8DF3 |             |
| `MEDIUM_INT`   | 0x8DF4 |             |
| `HIGH_INT`     | 0x8DF5 |             |

### Framebuffers and renderbuffers

| Constant name                                  | Value  | Description |
| ---------------------------------------------- | ------ | ----------- |
| `FRAMEBUFFER`                                  | 0x8D40 |             |
| `RENDERBUFFER`                                 | 0x8D41 |             |
| `RGBA4`                                        | 0x8056 |             |
| `RGB5_A1`                                      | 0x8057 |             |
| `RGB565`                                       | 0x8D62 |             |
| `DEPTH_COMPONENT16`                            | 0x81A5 |             |
| `STENCIL_INDEX8`                               | 0x8D48 |             |
| `DEPTH_STENCIL`                                | 0x84F9 |             |
| `RENDERBUFFER_WIDTH`                           | 0x8D42 |             |
| `RENDERBUFFER_HEIGHT`                          | 0x8D43 |             |
| `RENDERBUFFER_INTERNAL_FORMAT`                 | 0x8D44 |             |
| `RENDERBUFFER_RED_SIZE`                        | 0x8D50 |             |
| `RENDERBUFFER_GREEN_SIZE`                      | 0x8D51 |             |
| `RENDERBUFFER_BLUE_SIZE`                       | 0x8D52 |             |
| `RENDERBUFFER_ALPHA_SIZE`                      | 0x8D53 |             |
| `RENDERBUFFER_DEPTH_SIZE`                      | 0x8D54 |             |
| `RENDERBUFFER_STENCIL_SIZE`                    | 0x8D55 |             |
| `FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE`           | 0x8CD0 |             |
| `FRAMEBUFFER_ATTACHMENT_OBJECT_NAME`           | 0x8CD1 |             |
| `FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL`         | 0x8CD2 |             |
| `FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE` | 0x8CD3 |             |
| `COLOR_ATTACHMENT0`                            | 0x8CE0 |             |
| `DEPTH_ATTACHMENT`                             | 0x8D00 |             |
| `STENCIL_ATTACHMENT`                           | 0x8D20 |             |
| `DEPTH_STENCIL_ATTACHMENT`                     | 0x821A |             |
| `NONE`                                         | 0      |             |
| `FRAMEBUFFER_COMPLETE`                         | 0x8CD5 |             |
| `FRAMEBUFFER_INCOMPLETE_ATTACHMENT`            | 0x8CD6 |             |
| `FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT`    | 0x8CD7 |             |
| `FRAMEBUFFER_INCOMPLETE_DIMENSIONS`            | 0x8CD9 |             |
| `FRAMEBUFFER_UNSUPPORTED`                      | 0x8CDD |             |
| `FRAMEBUFFER_BINDING`                          | 0x8CA6 |             |
| `RENDERBUFFER_BINDING`                         | 0x8CA7 |             |
| `MAX_RENDERBUFFER_SIZE`                        | 0x84E8 |             |
| `INVALID_FRAMEBUFFER_OPERATION`                | 0x0506 |             |

### Pixel storage modes

Constants passed to `WebGLRenderingContext.pixelStorei()`.

| Constant name                        | Value  | Description |
| ------------------------------------ | ------ | ----------- |
| `UNPACK_FLIP_Y_WEBGL`                | 0x9240 |             |
| `UNPACK_PREMULTIPLY_ALPHA_WEBGL`     | 0x9241 |             |
| `UNPACK_COLORSPACE_CONVERSION_WEBGL` | 0x9243 |             |
