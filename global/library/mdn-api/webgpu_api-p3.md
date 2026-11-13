---
title: "WebGPU API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgpu_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGPU API (part 3 of 3)

## Basic <example-value> pipeline

In our basic <example-value> demo, we get the GPU to calculate some values, store them in an output buffer, copy the data across to a staging buffer, then map that staging buffer so that the data can be read out to JavaScript and logged to the console.

The app follows a similar structure to the basic <example-value> demo. We create a `GPUDevice` reference in the same way as before, and encapsulate our shader code into a `GPUShaderModule` via a `GPUDevice.createShaderModule()` call. The difference here is that our shader code only has one shader stage, a `@compute` stage:

```js
// Define global buffer size
const NUM_ELEMENTS = 1000;
const BUFFER_SIZE = NUM_ELEMENTS * 4; // Buffer size, in bytes

const shader = `
@group(0) @binding(0)
var<storage, read_write> output: array<f32>;

@compute @workgroup_size(64)
fn main(
  @builtin(global_invocation_id)
  global_id : vec3u,

  @builtin(local_invocation_id)
  local_id : vec3u,
) {
  // Avoid accessing the buffer out of bounds
  if (global_id.x >= ${NUM_ELEMENTS}) {
    return;
  }

  output[global_id.x] =
    f32(global_id.x) * 1000. + f32(local_id.x);
}
`;
```

### Create buffers to handle our data

In this example we create two `GPUBuffer` instances to handle our data, an `output` buffer to write the GPU calculation results to at high speed, and a `stagingBuffer` that we'll copy the `output` contents to, which can be mapped to allow JavaScript to access the values.

- `output` is specified as a storage buffer that will be the source of a copy operation.
- `stagingBuffer` is specified as a buffer that can be mapped for reading by JavaScript, and will be the destination of a copy operation.

```js
const output = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

const stagingBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});
```

### Create a bind group layout

When the pipeline is created, we specify a bind group to use for the pipeline. This involves first creating a `GPUBindGroupLayout` (via a call to `GPUDevice.createBindGroupLayout()`) that defines the structure and purpose of GPU resources such as buffers that will be used in this pipeline. This layout is used as a template for bind groups to adhere to. In this case we give the pipeline access to a single memory buffer, tied to binding slot 0 (this matches the relevant binding number in our shader code — `@binding(0)`), usable in the compute stage of the pipeline, and with the buffer's purpose defined as `storage`.

```js
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage",
      },
    },
  ],
});
```

Next we create a `GPUBindGroup` by calling `GPUDevice.createBindGroup()`. We pass this method call a descriptor object that specifies the bind group layout to base this bind group on, and the details of the variable to bind to the slot defined in the layout. In this case, we are declaring binding 0, and specifying that the `output` buffer we defined earlier should be bound to it.

```js
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: output,
      },
    },
  ],
});
```

> **Note:**
> You could retrieve an implicit layout to use when creating a bind group by calling the `GPUComputePipeline.getBindGroupLayout()` method. There is also a version available for render pipelines: see `GPURenderPipeline.getBindGroupLayout()`.

### Create a compute pipeline

With the above all in place, we can now create a compute pipeline by calling `GPUDevice.createComputePipeline()`, passing it a pipeline descriptor object. This works in a similar way to creating a render pipeline. We describe the compute shader, specifying what module to find the code in and what the entry point is. We also specify a `layout` for the pipeline, in this case creating a layout based on the `bindGroupLayout` we defined earlier via a `GPUDevice.createPipelineLayout()` call.

```js
const computePipeline = device.createComputePipeline({
  layout: device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  }),
  compute: {
    module: shaderModule,
    entryPoint: "main",
  },
});
```

One difference here from the render pipeline layout is that we are not specifying a primitive type, as we are not drawing anything.

### Running a compute pass

Running a compute pass is similar in structure to running a rendering pass, with some different commands. For a start, the pass <example-value> is created using `GPUCommandEncoder.beginComputePass()`.

When issuing the commands, we specify the pipeline to use in the same way as before, using `GPUComputePassEncoder.setPipeline()`. We then however use `GPUComputePassEncoder.setBindGroup()` to specify that we want to use our `bindGroup` to specify the data to use in the calculation, and `GPUComputePassEncoder.dispatchWorkgroups()` to specify the number of GPU workgroups to use to run the calculations.

We then signal the end of the render pass <example-value> list using `GPURenderPassEncoder.end()`.

```js
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatchWorkgroups(Math.ceil(NUM_ELEMENTS / 64));

passEncoder.end();
```

### Reading the results back to JavaScript

Before submitting the encoded commands to the GPU for execution using `GPUQueue.submit()`, we copy the contents of the `output` buffer to the `stagingBuffer` buffer using `GPUCommandEncoder.copyBufferToBuffer()`.

```js
// Copy output buffer to staging buffer
commandEncoder.copyBufferToBuffer(
  output,
  0, // Source offset
  stagingBuffer,
  0, // Destination offset
  BUFFER_SIZE, // Length, in bytes
);

// End frame by passing array of command buffers to command queue for execution
device.queue.submit([commandEncoder.finish()]);
```

Once the output data is available in the `stagingBuffer`, we use the `GPUBuffer.mapAsync()` method to map the data to intermediate memory, grab a reference to the mapped range using `GPUBuffer.getMappedRange()`, copy the data into JavaScript, and then log it to the console. We also unmap the `stagingBuffer` once we are finished with it.

```js
// map staging buffer to read results back to JS
await stagingBuffer.mapAsync(
  GPUMapMode.READ,
  0, // Offset
  BUFFER_SIZE, // Length, in bytes
);

const copyArrayBuffer = stagingBuffer.getMappedRange(0, BUFFER_SIZE);
const data = copyArrayBuffer.slice();
stagingBuffer.unmap();
console.log(new Float32Array(data));
```

## GPU error handling

WebGPU calls are validated asynchronously in the GPU process. If errors are found, the problem call is marked as invalid on the GPU side. If another call is made that relies on the return value of an invalidated call, that object will also be marked as invalid, and so on. For this reason, errors in WebGPU are referred to as "contagious".

Each `GPUDevice` instance maintains its own error scope stack. This stack is initially empty, but you can start pushing an error scope to the stack by invoking `GPUDevice.pushErrorScope()` to capture errors of a particular type.

Once you are done capturing errors, you can end capture by invoking `GPUDevice.popErrorScope()`. This pops the scope from the stack and returns a `Promise` that resolves to an object (`GPUInternalError`, `GPUOutOfMemoryError`, or `GPUValidationError`) describing the first error captured in the scope, or `null` if no errors were captured.

We have attempted to provide useful information to help you understand why errors are occurring in your WebGPU code in "Validation" sections where appropriate, which list criteria to meet to avoid errors. See for example the `GPUDevice.createBindGroup()` Validation section. Some of this information is complex; rather than repeat the spec, we have decided to just list error criteria that are:

- Non-obvious, for example combinations of descriptor properties that produce validation errors. There is no point telling you to make sure you use the correct descriptor object structure. That is both obvious and vague.
- Developer-controlled. Some of the error criteria are purely based on internals and not really relevant to web developers.

You can find more information about WebGPU error handling in the explainer — see Object validity and destroyed-ness and Errors. WebGPU Error Handling best practices provides useful real-world examples and advice.

> **Note:**
> The historic way of handling errors in WebGL is to provide a `getError()` method to return error information. This is problematic in that it returns errors synchronously, which is bad for performance — each call requires a round-trip to the GPU and requires all previously issued operations to be finished. Its state model is also flat, meaning that errors can leak between unrelated code. The creators of WebGPU were determined to improve on this.

## Interfaces

### Entry point for the API

- `Navigator.gpu` / `WorkerNavigator.gpu`
    The entry point for the API — returns the `GPU` object for the current context.
- `GPU`
    The starting point for using WebGPU. It can be used to return a `GPUAdapter`.
- `GPUAdapter`
    Represents a GPU adapter. From this you can request a `GPUDevice`, adapter info, features, and limits.
- `GPUAdapterInfo`
    Contains identifying information about an adapter.

### Configuring GPUDevices

- `GPUDevice`
    Represents a logical GPU device. This is the main interface through which the majority of WebGPU functionality is accessed.
- `GPUSupportedFeatures`
    A setlike object that describes additional functionality supported by a `GPUAdapter` or `GPUDevice`.
- `GPUSupportedLimits`
    Describes the limits supported by a `GPUAdapter` or `GPUDevice`.

### Configuring a rendering `<canvas>`

- `HTMLCanvasElement.getContext()` — the `"webgpu"` `contextType`
    Invoking `getContext()` with the `"webgpu"` `contextType` returns a `GPUCanvasContext` object instance, which can then be configured with `GPUCanvasContext.configure()`.
- `GPUCanvasContext`
    Represents the WebGPU rendering context of a `<canvas>` element.

### Representing pipeline resources

- `GPUBuffer`
    Represents a block of memory that can be used to store raw data to use in GPU operations.
- `GPUExternalTexture`
    A wrapper object containing an `HTMLVideoElement` snapshot that can be used as a texture in GPU rendering operations.
- `GPUSampler`
    Controls how shaders transform and filter texture resource data.
- `GPUShaderModule`
    A reference to an internal shader module object, a container for WGSL shader code that can be submitted to the GPU to execution by a pipeline.
- `GPUTexture`
    A container used to store 1D, 2D, or 3D arrays of data, such as images, to use in GPU rendering operations.
- `GPUTextureView`
    A view onto some subset of the texture subresources defined by a particular `GPUTexture`.

### Representing pipelines

- `GPUBindGroup`
    Based on a `GPUBindGroupLayout`, a `GPUBindGroup` defines a set of resources to be bound together in a group and how those resources are used in shader stages.
- `GPUBindGroupLayout`
    Defines the structure and purpose of related GPU resources such as buffers that will be used in a pipeline, and is used as a template when creating `GPUBindGroup`s.
- `GPUComputePipeline`
    Controls the compute shader stage and can be used in a `GPUComputePassEncoder`.
- `GPUPipelineLayout`
    Defines the `GPUBindGroupLayout`s used by a pipeline. `GPUBindGroup`s used with the pipeline during command encoding must have compatible `GPUBindGroupLayout`s.
- `GPURenderPipeline`
    Controls the vertex and fragment shader stages and can be used in a `GPURenderPassEncoder` or `GPURenderBundleEncoder`.

### Encoding and submitting commands to the GPU

- `GPUCommandBuffer`
    Represents a recorded list of GPU commands that can be submitted to a `GPUQueue` for execution.
- `GPUCommandEncoder`
    Represents a command encoder, used to encode commands to be issued to the GPU.
- `GPUComputePassEncoder`
    Encodes commands related to controlling the compute shader stage, as issued by a `GPUComputePipeline`. Part of the overall encoding activity of a `GPUCommandEncoder`.
- `GPUQueue`
    Controls execution of encoded commands on the GPU.
- `GPURenderBundle`
    A container for pre-recorded bundles of commands (see `GPURenderBundleEncoder`).
- `GPURenderBundleEncoder`
    Used to pre-record bundles of commands. These can be reused in `GPURenderPassEncoder`s via the `executeBundles()` method, as many times as required.
- `GPURenderPassEncoder`
    Encodes commands related to controlling the vertex and fragment shader stages, as issued by a `GPURenderPipeline`. Part of the overall encoding activity of a `GPUCommandEncoder`.

### Running queries on rendering passes

- `GPUQuerySet`
    Used to record the results of queries on passes, such as occlusion or timestamp queries.

### Debugging errors

- `GPUCompilationInfo`
    An array of `GPUCompilationMessage` objects, generated by the GPU shader module compiler to help diagnose problems with shader code.
- `GPUCompilationMessage`
    Represents a single informational, warning, or error message generated by the GPU shader module compiler.
- `GPUDeviceLostInfo`
    Returned when the `GPUDevice.lost` `Promise` resolves, providing information as to why the device was lost.
- `GPUError`
    The base interface for errors surfaced by `GPUDevice.popErrorScope` and the `uncapturederror` event.
- `GPUInternalError`
    One of the types of errors surfaced by `GPUDevice.popErrorScope` and the `GPUDevice` `uncapturederror` event. Indicates that an operation failed for a system or implementation-specific reason, even when all validation requirements were satisfied.
- `GPUOutOfMemoryError`
    One of the types of errors surfaced by `GPUDevice.popErrorScope` and the `GPUDevice` `uncapturederror` event. Indicates that there was not enough free memory to complete the requested operation.
- `GPUPipelineError`
    Describes a pipeline failure. The value received when a `Promise` returned by a `GPUDevice.createComputePipelineAsync()` or `GPUDevice.createRenderPipelineAsync()` call rejects.
- `GPUUncapturedErrorEvent`
    The event object type for the `GPUDevice` `uncapturederror` event.
- `GPUValidationError`
    One of the types of errors surfaced by `GPUDevice.popErrorScope` and the `GPUDevice` `uncapturederror` event. Describes an application error indicating that an operation did not pass the WebGPU API's validation constraints.

## Security requirements

The whole API is available only in a secure context.

## Examples

- Basic <example-value> demo
- Basic <example-value> demo
- WebGPU samples

## See also

- WebGPU best practices
- WebGPU explainer
- WebGPU — All of the cores, none of the canvas
