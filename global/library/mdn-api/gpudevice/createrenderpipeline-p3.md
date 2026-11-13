---
title: "GPUDevice: createRenderPipeline() method (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createrenderpipeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createRenderPipeline() method (part 3 of 3)

### `primitive` object structure

The `primitive` object can contain the following properties:

- `cullMode` (optional)
    An enumerated value that defines which polygon orientation will be culled, if any. Possible values are:
    - `"back"`: Back-facing polygons are culled.
    - `"front"`: Front-facing polygons are culled.
    - `"none"`: No polygons are culled.

    If omitted, `cullMode` defaults to `"none"`.

- `frontFace` (optional)
    An enumerated value that defines which polygons are considered front-facing. Possible values are:
    - `"ccw"`: Polygons with vertices whose framebuffer coordinates are given in counter-clockwise order.
    - `"cw"`: Polygons with vertices whose framebuffer coordinates are given in clockwise order.

    If omitted, `frontFace` defaults to `"ccw"`.

    > **Note:**
    > The `frontFace` and `cullMode` values have no effect on the `"point-list"`, `"line-list"`, or `"line-strip"` topologies.

- `stripIndexFormat` (optional)
    An enumerated value that determines the index buffer format and primitive restart value in the case of pipelines with strip topologies (`"line-strip"` or `"triangle-strip"`). The primitive restart value specifies which index value indicates that a new primitive should be started rather than continuing to construct the strip with the prior indexed vertices. Possible values are:
    - `"uint16"`: Indicates a byte size of 2 and a primitive restart value of `0xFFFF`.
    - `"uint32"`: Indicates a byte size of 4 and a primitive restart value of `0xFFFFFFFF`.

    GPU primitive states that specify a strip primitive topology must specify a strip index format if they are used for indexed draws (for example, via `GPURenderPassEncoder.drawIndexed()`) so that the primitive restart value that will be used is known at pipeline creation time. Pipelines with list primitive topologies (`"line-list"`, `"point-list"`, or `"triangle-list"`) should not specify a `stripIndexFormat` value. They will instead use the index format passed to, for example, `GPURenderPassEncoder.setIndexBuffer()` when doing indexed rendering.

- `topology` (optional)
    An enumerated value that defines the type of primitive to be constructed from the specified `vertex` inputs. Possible values are:
    - `"line-list"`: Each consecutive pair of two vertices defines a line primitive.
    - `"line-strip"`: Each vertex after the first defines a line primitive between it and the previous vertex.
    - `"point-list"`: Each vertex defines a point primitive.
    - `"triangle-list"`: Each consecutive triplet of three vertices defines a triangle primitive.
    - `"triangle-strip"`: Each vertex after the first two defines a triangle primitive between it and the previous two vertices.

    If omitted, `topology` defaults to `"triangle-list"`.

- `unclippedDepth` (optional)
    A boolean. A value of `true` indicates that depth clipping is disabled. If omitted, `unclippedDepth` defaults to `false`. Note that to control depth clipping, the `depth-clip-control` `feature` must be enabled in the `GPUDevice`.

    > **Note:**
    > The `depth-clip-control` feature needs to be enabled for the `unclippedDepth` property to be used successfully. If not, a `GPUValidationError` is generated.

### `vertex` object structure

The `vertex` object can contain the following properties:

- `constants` (optional)
    A sequence of record types, with the structure `(id, value)`, representing override values for WGSL constants that can be overridden in the pipeline. These behave like ordered maps. In each case, the `id` is a key used to identify or select the record, and the `constant` is an enumerated value representing a WGSL.

    Depending on which constant you want to override, the `id` may take the form of the numeric ID of the constant, if one is specified, or otherwise the constant's identifier name.

    A code snippet providing override values for several overridable constants might look like this:

    ```js
    ({
      // …
      constants: {
        0: false,
        1200: 3.0,
        1300: 2.0,
        width: 20,
        depth: -1,
        height: 15,
      },
    });
    ```

- `entryPoint` (optional)
    The name of the function in the `module` that this stage will use to perform its work. The corresponding shader function must have the `@vertex` attribute to be identified as this entry point. See Entry Point Declaration for more information.

    You can omit the `entryPoint` property if your shader code contains a single function with the `@vertex` attribute set — the browser will use this as the default entry point. If `entryPoint` is omitted and the browser cannot determine a default entry point, a `GPUValidationError` is generated and the resulting `GPURenderPipeline` will be invalid.

- `module`
    A `GPUShaderModule` object containing the WGSL code that this programmable stage will execute.
- `buffers` (optional)
    An array of objects, each representing the expected layout of a vertex buffer used in the pipeline. Each object can contain the following properties:
    - `arrayStride`
        A number representing the stride, in bytes, between the different structures (e.g., vertices) inside the buffer.
    - `attributes`
        An array of objects defining the layout of the vertex attributes within each structure. Each object has the following properties:
        - `format`
            An enumerated value that specifies the format of the vertex. For all the available values, see the `GPUVertexFormat` definition in the specification.
        - `offset`
            A number specifying the offset, in bytes, from the beginning of the structure to the data for the attribute.
        - `shaderLocation`
            The numeric location associated with this attribute, which will correspond with a `@location` attribute declared in the WGSL code of the associated `GPUShaderModule` referenced in the `vertex` object's `module` property.
    - `stepMode` (optional)
        An enumerated value that defines whether the separate structures inside the buffer represent vertices or instances. Possible values are:
        - `"instance"`: Each structure is an instance — the address is advanced by `arrayStride` for each instance.
        - `"vertex"`: Each structure is a vertex — the address is advanced by `arrayStride` for each vertex, and reset between instances.

        If omitted, `stepMode` defaults to `"vertex"`.

### Return value

A `GPURenderPipeline` object instance.

### Validation

The following criteria must be met when calling **`createRenderPipeline()`**, otherwise a `GPUValidationError` is generated and an invalid `GPURenderPipeline` object is returned:

- For `depthStencil` objects:
  - `format` is a `depth-or-stencil` format.
  - The `depthBias`, `depthBiasClamp`, and `depthBiasSlopeScale` properties are set to `0` for line and point topologies, i.e., if `topology` is set to `"line-list"`, `"line-strip"`, or `"point-list"`.
  - If `depthWriteEnabled` is `true` or `depthCompare` is not `"always"`, `format` has a depth component.
  - If `stencilFront` or `stencilBack`'s properties are not at their default values, `format` has a stencil component.
- For `fragment` objects:
  - `targets.length` is less than or equal to the `GPUDevice`'s `maxColorAttachments` `limit`.
  - For each `target`, `writeMask`'s numeric equivalent is less than 16.
  - If any of the used blend factor operations use the source alpha channel (for example `"src-alpha-saturated"`), the output has an alpha channel (that is, it must be a `vec4`).
  - If the `src1`, `one-minus-src1`, `src1-alpha`, or `one-minus-src1-alpha` blend factor operations are used, the `dual-source-blending` feature is enabled.
  - If the `entryPoint` property is omitted, the shader code contains a single fragment shader entry point function for the browser to use as the default entry point.
- For `primitive` objects:
  - If the `unclippedDepth` property is used, the `depth-clip-control` feature is enabled.
- For `vertex` objects:
  - If the `entryPoint` property is omitted, the shader code contains a single vertex shader entry point function for the browser to use as the default entry point.

## Examples

> **Note:**
> The WebGPU samples feature many more examples.

### Basic <example-value>

Our basic <example-value> demo provides an example of the construction of a valid render pipeline descriptor object, which is then used to create a `GPURenderPipeline` via a `createRenderPipeline()` call.

```js
// …

const vertexBuffers = [
  {
    attributes: [
      {
        shaderLocation: 0, // position
        offset: 0,
        format: "float32x4",
      },
      {
        shaderLocation: 1, // color
        offset: 16,
        format: "float32x4",
      },
    ],
    arrayStride: 32,
    stepMode: "vertex",
  },
];

const pipelineDescriptor = {
  vertex: {
    module: shaderModule,
    entryPoint: "vertex_main",
    buffers: vertexBuffers,
  },
  fragment: {
    module: shaderModule,
    entryPoint: "fragment_main",
    targets: [
      {
        format: navigator.gpu.getPreferredCanvasFormat(),
      },
    ],
  },
  primitive: {
    topology: "triangle-list",
  },
  layout: "auto",
};

const renderPipeline = device.createRenderPipeline(pipelineDescriptor);

// …
```

## See also

- The WebGPU API
