---
title: "WebGL constants (part 5 of 9)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/constants/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL constants (part 5 of 9)

| `POLYGON_OFFSET_FACTOR`            | 0x8038 |                                                                                                                                                                                                                                              |
| `TEXTURE_BINDING_2D`               | 0x8069 |                                                                                                                                                                                                                                              |
| `SAMPLE_BUFFERS`                   | 0x80A8 |                                                                                                                                                                                                                                              |
| `SAMPLES`                          | 0x80A9 |                                                                                                                                                                                                                                              |
| `SAMPLE_COVERAGE_VALUE`            | 0x80AA |                                                                                                                                                                                                                                              |
| `SAMPLE_COVERAGE_INVERT`           | 0x80AB |                                                                                                                                                                                                                                              |
| `COMPRESSED_TEXTURE_FORMATS`       | 0x86A3 |                                                                                                                                                                                                                                              |
| `VENDOR`                           | 0x1F00 |                                                                                                                                                                                                                                              |
| `RENDERER`                         | 0x1F01 |                                                                                                                                                                                                                                              |
| `VERSION`                          | 0x1F02 |                                                                                                                                                                                                                                              |
| `IMPLEMENTATION_COLOR_READ_TYPE`   | 0x8B9A |                                                                                                                                                                                                                                              |
| `IMPLEMENTATION_COLOR_READ_FORMAT` | 0x8B9B |                                                                                                                                                                                                                                              |
| `BROWSER_DEFAULT_WEBGL`            | 0x9244 |                                                                                                                                                                                                                                              |

### Buffers

Constants passed to `WebGLRenderingContext.bufferData()`, `WebGLRenderingContext.bufferSubData()`, `WebGLRenderingContext.bindBuffer()`, or `WebGLRenderingContext.getBufferParameter()`.

| Constant name          | Value  | Description                                                                                                                 |
| ---------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| `STATIC_DRAW`          | 0x88E4 | Passed to `bufferData` as a hint about whether the contents of the buffer are likely to be used often and not change often. |
| `STREAM_DRAW`          | 0x88E0 | Passed to `bufferData` as a hint about whether the contents of the buffer are likely to not be used often.                  |
| `DYNAMIC_DRAW`         | 0x88E8 | Passed to `bufferData` as a hint about whether the contents of the buffer are likely to be used often and change often.     |
| `ARRAY_BUFFER`         | 0x8892 | Passed to `bindBuffer` or `bufferData` to specify the type of buffer being used.                                            |
| `ELEMENT_ARRAY_BUFFER` | 0x8893 | Passed to `bindBuffer` or `bufferData` to specify the type of buffer being used.                                            |
| `BUFFER_SIZE`          | 0x8764 | Passed to `getBufferParameter` to get a buffer's size.                                                                      |
| `BUFFER_USAGE`         | 0x8765 | Passed to `getBufferParameter` to get the hint for the buffer passed in when it was created.                                |

### Vertex attributes

Constants passed to `WebGLRenderingContext.getVertexAttrib()`.

| Constant name                        | Value  | Description                                                            |
| ------------------------------------ | ------ | ---------------------------------------------------------------------- |
| `CURRENT_VERTEX_ATTRIB`              | 0x8626 | Passed to `getVertexAttrib` to read back the current vertex attribute. |
| `VERTEX_ATTRIB_ARRAY_ENABLED`        | 0x8622 |                                                                        |
| `VERTEX_ATTRIB_ARRAY_SIZE`           | 0x8623 |                                                                        |
| `VERTEX_ATTRIB_ARRAY_STRIDE`         | 0x8624 |                                                                        |
| `VERTEX_ATTRIB_ARRAY_TYPE`           | 0x8625 |                                                                        |
| `VERTEX_ATTRIB_ARRAY_NORMALIZED`     | 0x886A |                                                                        |
| `VERTEX_ATTRIB_ARRAY_POINTER`        | 0x8645 |                                                                        |
| `VERTEX_ATTRIB_ARRAY_BUFFER_BINDING` | 0x889F |                                                                        |

### Culling

Constants passed to `WebGLRenderingContext.cullFace()`.

| Constant name    | Value  | Description                                                                                                                   |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `CULL_FACE`      | 0x0B44 | Passed to `enable`/`disable` to turn on/off culling. Can also be used with `getParameter` to find the current culling method. |
| `FRONT`          | 0x0404 | Passed to `cullFace` to specify that only front faces should be culled.                                                       |
| `BACK`           | 0x0405 | Passed to `cullFace` to specify that only back faces should be culled.                                                        |
| `FRONT_AND_BACK` | 0x0408 | Passed to `cullFace` to specify that front and back faces should be culled.                                                   |

### Enabling and disabling

Constants passed to `WebGLRenderingContext.enable()` or `WebGLRenderingContext.disable()`.

| Constant name              | Value  | Description                                                                                                                                                                                                         |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BLEND`                    | 0x0BE2 | Passed to `enable`/`disable` to turn on/off blending. Can also be used with `getParameter` to find the current blending method.                                                                                     |
| `DEPTH_TEST`               | 0x0B71 | Passed to `enable`/`disable` to turn on/off the depth test. Can also be used with `getParameter` to query the depth test.                                                                                           |
| `DITHER`                   | 0x0BD0 | Passed to `enable`/`disable` to turn on/off dithering. Can also be used with `getParameter` to find the current dithering method.                                                                                   |
| `POLYGON_OFFSET_FILL`      | 0x8037 | Passed to `enable`/`disable` to turn on/off the polygon offset. Useful for rendering hidden-line images, decals, and solids with highlighted edges. Can also be used with `getParameter` to query the scissor test. |
| `SAMPLE_ALPHA_TO_COVERAGE` | 0x809E | Passed to `enable`/`disable` to turn on/off the alpha to coverage. Used in multi-sampling alpha channels.                                                                                                           |
| `SAMPLE_COVERAGE`          | 0x80A0 | Passed to `enable`/`disable` to turn on/off the sample coverage. Used in multi-sampling.                                                                                                                            |
| `SCISSOR_TEST`             | 0x0C11 | Passed to `enable`/`disable` to turn on/off the scissor test. Can also be used with `getParameter` to query the scissor test.                                                                                       |
| `STENCIL_TEST`             | 0x0B90 | Passed to `enable`/`disable` to turn on/off the stencil test. Can also be used with `getParameter` to query the stencil test.                                                                                       |

### Errors

Constants returned from `WebGLRenderingContext.getError()`.

| Constant name        | Value  | Description               |
| -------------------- | ------ | ------------------------- |
| `NO_ERROR`           | 0      | Returned from `getError`. |
| `INVALID_ENUM`       | 0x0500 | Returned from `getError`. |
| `INVALID_VALUE`      | 0x0501 | Returned from `getError`. |
| `INVALID_OPERATION`  | 0x0502 | Returned from `getError`. |
| `OUT_OF_MEMORY`      | 0x0505 | Returned from `getError`. |
| `CONTEXT_LOST_WEBGL` | 0x9242 | Returned from `getError`. |

### Front face directions

Constants passed to `WebGLRenderingContext.frontFace()`.

| Constant name | Value  | Description                                                                                              |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| `CW`          | 0x0900 | Passed to `frontFace` to specify the front face of a polygon is drawn in the clockwise direction         |
| `CCW`         | 0x0901 | Passed to `frontFace` to specify the front face of a polygon is drawn in the counter clockwise direction |

### Hints

Constants passed to `WebGLRenderingContext.hint()`

| Constant name          | Value  | Description                                                                                                                 |
| ---------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| `DONT_CARE`            | 0x1100 | There is no preference for this behavior.                                                                                   |
| `FASTEST`              | 0x1101 | The most efficient behavior should be used.                                                                                 |
| `NICEST`               | 0x1102 | The most correct or the highest quality option should be used.                                                              |
| `GENERATE_MIPMAP_HINT` | 0x8192 | Hint for the quality of filtering when generating mipmap images with `WebGLRenderingContext.generateMipmap()`. |

### Data types

| Constant name    | Value  | Description |
| ---------------- | ------ | ----------- |
| `BYTE`           | 0x1400 |             |
| `UNSIGNED_BYTE`  | 0x1401 |             |
| `SHORT`          | 0x1402 |             |
| `UNSIGNED_SHORT` | 0x1403 |             |
| `INT`            | 0x1404 |             |
| `UNSIGNED_INT`   | 0x1405 |             |
| `FLOAT`          | 0x1406 |             |

### Pixel formats

| Constant name     | Value  | Description |
| ----------------- | ------ | ----------- |
| `DEPTH_COMPONENT` | 0x1902 |             |
| `ALPHA`           | 0x1906 |             |
| `RGB`             | 0x1907 |             |
| `RGBA`            | 0x1908 |             |
| `LUMINANCE`       | 0x1909 |             |
| `LUMINANCE_ALPHA` | 0x190A |             |

### Pixel types

| Constant name            | Value  | Description |
| ------------------------ | ------ | ----------- |
| `UNSIGNED_BYTE`          | 0x1401 |             |
| `UNSIGNED_SHORT_4_4_4_4` | 0x8033 |             |
| `UNSIGNED_SHORT_5_5_5_1` | 0x8034 |             |
| `UNSIGNED_SHORT_5_6_5`   | 0x8363 |             |
