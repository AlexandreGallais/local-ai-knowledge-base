---
title: "GPUDevice: createRenderPipeline() method (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createrenderpipeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createRenderPipeline() method (part 2 of 3)

## Syntax

```js
createRenderPipeline(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `depthStencil` (optional)
        An object (see `depthStencil` object structure) describing depth-stencil properties including testing, operations, and bias.
    - `fragment` (optional)
        An object (see `fragment` object structure) describing the fragment shader entry point of the pipeline and its output colors. If no fragment shader entry point is defined, the pipeline will not produce any color attachment outputs, but it still performs rasterization and produces depth values based on the vertex position output. Depth testing and stencil operations can still be used.
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `layout`
        Defines the layout (structure, purpose, and type) of all the GPU resources (buffers, textures, etc.) used during the execution of the pipeline. Possible values are:
        - A `GPUPipelineLayout` object, created using `GPUDevice.createPipelineLayout()`, which allows the GPU to figure out how to run the pipeline most efficiently ahead of time.
        - A string of `"auto"`, which causes the pipeline to generate an implicit bind group layout based on any bindings defined in the shader code. If `"auto"` is used, the generated bind group layouts may only be used with the current pipeline.
    - `multisample` (optional)
        An object (see `multisample` object structure) describing how the pipeline interacts with a render pass's multisampled attachments.
    - `primitive` (optional)
        An object (see `primitive` object structure) describing how a pipeline constructs and rasterizes primitives from its vertex inputs.
    - `vertex`
        An object (see `vertex` object structure) describing the vertex shader entry point of the pipeline and its input buffer layouts.

### `depthStencil` object structure

The `depthStencil` object can contain the following properties:

- `depthBias` (optional)
    A number representing a constant depth bias that is added to each fragment. If omitted, `depthBias` defaults to 0.
    > **Note:**
    > The `depthBias`, `depthBiasClamp`, and `depthBiasSlopeScale` properties must be set to `0` for line and point topologies, i.e., if `topology` is set to `"line-list"`, `"line-strip"`, or `"point-list"`. If not, a `GPUValidationError` will be generated and the returned `GPURenderPipeline` will be invalid.
- `depthBiasClamp` (optional)
    A number representing the maximum depth bias of a fragment. If omitted, `depthBiasClamp` defaults to 0.
- `depthBiasSlopeScale` (optional)
    A number representing a depth bias that scales with the fragment's slope. If omitted, `depthBiasSlopeScale` defaults to 0.
- `depthCompare` (optional)
    An enumerated value specifying the comparison operation used to test fragment depths against `depthStencilAttachment` depth values. Possible values are:
    - `"never"`: Comparison tests never pass.
    - `"less"`: A provided value passes the comparison test if it is less than the sampled value.
    - `"equal"`: A provided value passes the comparison test if it is equal to the sampled value.
    - `"less-equal"`: A provided value passes the comparison test if it is less than or equal to the sampled value.
    - `"greater"`: A provided value passes the comparison test if it is greater than the sampled value.
    - `"not-equal"`: A provided value passes the comparison test if it is not equal to the sampled value.
    - `"greater-equal"`: A provided value passes the comparison test if it is greater than or equal to the sampled value.
    - `"always"`: Comparison tests always pass.

    `depthCompare` is not required if the specified `format` does not have a depth component, or if the comparison operation is not used.

- `depthWriteEnabled` (optional)
    A boolean. A value of `true` specifies that the `GPURenderPipeline` can modify `depthStencilAttachment` depth values after creation. Setting it to `false` means it cannot.

    `depthWriteEnabled` is not required if the specified `format` does not have a depth component.

- `format`
    An enumerated value specifying the `depthStencilAttachment` format that the `GPURenderPipeline` will be compatible with. See the specification's Texture Formats section for all the available `format` values.
- `stencilBack` (optional)
    An object that defines how stencil comparisons and operations are performed for back-facing primitives. Its properties can include:
    - `compare` (optional)
        An enumerated value specifying the comparison operation used when testing fragments against `depthStencilAttachment` stencil values. Possible values are the same as for the `depthCompare` property; see above. If omitted, `compare` defaults to `"always"`.
    - `depthFailOp` (optional)
        An enumerated value specifying the stencil operation performed if the fragment depth comparison described by `depthCompare` fails. Possible values are:
        - `"decrement-clamp"`: Decrement the current render state stencil value, clamping it to 0.
        - `"decrement-wrap"`: Decrement the current render state stencil value, wrapping it to the maximum representable value of the `depthStencilAttachment`'s stencil aspect if the value goes below 0.
        - `"invert"`: Bitwise-invert the current render state stencil value.
        - `"increment-clamp"`: Increments the current render state stencil value, clamping it to the maximum representable value of the `depthStencilAttachment`'s stencil aspect.
        - `"increment-wrap"`: Increments the current render state stencil value, wrapping it to zero if the value exceeds the maximum representable value of the `depthStencilAttachment`'s stencil aspect.
        - `"keep"`: Keep the current stencil value.
        - `"replace"`: Set the stencil value to the current render state stencil value.
        - `"zero"`: Set the stencil value to 0.

        If omitted, `depthFailOp` defaults to `"keep"`.

        > **Note:**
        > The render state stencil value is initialized to 0 at the start of a render pass.

    - `failOp` (optional)
        An enumerated value specifying the stencil operation performed if the fragment stencil comparison test described by `compare` fails. Possible and default values are the same as for `depthFailOp`.
    - `passOp` (optional)
        An enumerated value specifying the stencil operation performed if the fragment stencil comparison test described by `compare` passes. Possible and default values are the same as for `depthFailOp`.

- `stencilFront` (optional)
    An object that defines how stencil comparisons and operations are performed for front-facing primitives. Its properties are the same as for `stencilBack`.
- `stencilReadMask` (optional)
    A bitmask controlling which `depthStencilAttachment` stencil value bits are read when performing stencil comparison tests. If omitted, `stencilReadMask` defaults to `0xFFFFFFFF`.
- `stencilWriteMask` (optional)
    A bitmask controlling which `depthStencilAttachment` stencil value bits are written to when performing stencil operations. If omitted, `stencilWriteMask` defaults to `0xFFFFFFFF`.

> **Note:**
> `depthStencilAttachment` values are specified during `GPUCommandEncoder.beginRenderPass()` calls, when the `GPURenderPipeline` is actually used to perform a render pass.

### `fragment` object structure

The `fragment` object contains an array of objects, each of which can contain the following properties:

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
    The name of the function in the `module` that this stage will use to perform its work. The corresponding shader function must have the `@fragment` attribute to be identified as this entry point. See Entry Point Declaration for more information.

    You can omit the `entryPoint` property if your shader code contains a single function with the `@fragment` attribute set — the browser will use this as the default entry point. If `entryPoint` is omitted and the browser cannot determine a default entry point, a `GPUValidationError` is generated and the resulting `GPURenderPipeline` will be invalid.

- `module`
    A `GPUShaderModule` object containing the WGSL code that this programmable stage will execute.
- `targets`
    an array of objects representing color states that represent configuration details for the colors output by the fragment shader stage. These objects can include the following properties:
    - `blend` (optional)
        An object that describes a blend mode to be applied to the output color. `blend` has two properties:
        - `alpha`
            Describes the alpha channel value.
        - `color`
            Describes the color value.

        `alpha` and `color` both take an object as a value that can include the following properties:
        - `dstFactor` (optional)
            An enumerated value that defines the blend factor operation to be performed on values from the target attachment. Possible values are:
            - `"constant"`
            - `"dst"`
            - `"dst-alpha"`
            - `"one"`
            - `"one-minus-dst"`
            - `"one-minus-src"`
            - `"one-minus-src1"`
            - `"one-minus-src-alpha"`
            - `"one-minus-src1-alpha"`
            - `"one-minus-dst-alpha"`
            - `"one-minus-constant"`
            - `"src"`
            - `"src1"`
            - `"src-alpha"`
            - `"src1-alpha"`
            - `"src-alpha-saturated"`
            - `"zero"`

            If omitted, `dstFactor` defaults to `"zero"`.

            > **Note:**
            > The `dual-source-blending` feature needs to be enabled for the `src1`, `one-minus-src1`, `src1-alpha`, and `one-minus-src1-alpha` blend factor operations to be used successfully. If not, a `GPUValidationError` is generated.

        - `operation` (optional)
            An enumerated value that defines the algorithm used to combine source and destination blend factors, to calculate the final values written to the target attachment components. Possible values are:
            - `"add"`
            - `"max"`
            - `"min"`
            - `"reverse-subtract"`
            - `"subtract"`

            If omitted, `operation` defaults to `"add"`.

        - `srcFactor` (optional)
            An enumerated value that defines the blend factor operation to be performed on values from the fragment shader. Possible values are the same as for `dstFactor`. If omitted, `srcFactor` defaults to `"one"`.

        > **Note:**
        > For a detailed explanation of the algorithms defined by each `dstFactor`/`srcFactor` and `operation` enumerated value, see the Blend State section of the specification.

    - `format`
        An enumerated value specifying the required format for output colors. See the specification's Texture Formats section for all the available `format` values.

        > **Note:**
        > For the `r32float`, `rg32float`, and `rgba32float` formats to be used with blending, the `float32-blendable` feature must be available in the device.

    - `writeMask` (optional)
        One or more bitwise flags defining the write mask to apply to the color target state. Possible flag values are:
        - `GPUColorWrite.RED`
        - `GPUColorWrite.GREEN`
        - `GPUColorWrite.BLUE`
        - `GPUColorWrite.ALPHA`
        - `GPUColorWrite.ALL`

        If omitted, `writeMask` defaults to `GPUColorWrite.ALL`.

        Note that multiple flags can be specified by separating values with bitwise OR, for example: `GPUColorWrite.RED | GPUColorWrite.ALPHA`.

### `multisample` object structure

The `multisample` object can contain the following properties:

- `alphaToCoverageEnabled` (optional)
    A boolean. A value of `true` indicates that a fragment's alpha channel should be used to generate a sample coverage mask. If omitted, `alphaToCoverageEnabled` defaults to `false`.
- `count` (optional)
    A number that defines the number of samples per pixel. The pipeline will be compatible only with attachment textures (`colorAttachment`s and `depthStencilAttachment`s) with matching `sampleCounts` (see `GPUTexture`).

    If omitted, `count` defaults to 1.

- `mask` (optional)
    A bitmask that determines which samples are written to. If omitted, `mask` defaults to `0xFFFFFFFF`.

> **Note:**
> `colorAttachment` and `depthStencilAttachment` values are specified during `GPUCommandEncoder.beginRenderPass()` calls, when the `GPURenderPipeline` is actually used to perform a render pass.
