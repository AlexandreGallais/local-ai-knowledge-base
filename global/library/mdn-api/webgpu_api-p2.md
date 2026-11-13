---
title: "WebGPU API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgpu_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGPU API (part 2 of 3)

## Basic <example-value> pipeline

In our basic <example-value> demo we give a `<canvas>` element a solid blue background and draw a triangle onto it.

### Create shader modules

We are using the following shader code. The vertex shader stage (`@vertex` block) accepts a chunk of data containing a position and a color, positions the vertex according to the given position, interpolates the color, then passes the data along to the fragment shader stage. The fragment shader stage (`@fragment` block) accepts the data from the vertex shader stage and colors the vertex according to the given color.

```js
const shaders = `
struct VertexOut {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f
}

@vertex
fn vertex_main(@location(0) position: vec4f,
               @location(1) color: vec4f) -> VertexOut
{
  var output : VertexOut;
  output.position = position;
  output.color = color;
  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
{
  return fragData.color;
}
`;
```

> **Note:**
> In our demos we are storing our shader code inside a template literal, but you can store it anywhere from which it can easily be retrieved as text to be fed into your WebGPU program. For example, another common practice is to store shaders inside a `<script>` element and retrieve the contents using `Node.textContent`. The correct mime type to use for WGSL is `text/wgsl`.

To make your shader code available to WebGPU, you have to put it inside a `GPUShaderModule` via a `GPUDevice.createShaderModule()` call, passing your shader code as a property inside a descriptor object. For example:

```js
const shaderModule = device.createShaderModule({
  code: shaders,
});
```

### Get and configure the canvas context

In a render pipeline, we need to specify somewhere to render the graphics to. In this case we are getting a reference to an onscreen `<canvas>` element then calling `HTMLCanvasElement.getContext()` with a parameter of `webgpu` to return its GPU context (a `GPUCanvasContext` instance).

From there, we configure the context with a call to `GPUCanvasContext.configure()`, passing it an options object containing the `GPUDevice` that the rendering information will come from, the format the textures will have, and the alpha mode to use when rendering semi-transparent textures.

```js
const canvas = document.querySelector("#gpuCanvas");
const context = canvas.getContext("webgpu");

context.configure({
  device,
  format: navigator.gpu.getPreferredCanvasFormat(),
  alphaMode: "premultiplied",
});
```

> **Note:**
> The best practice for determining the texture format is to use the `GPU.getPreferredCanvasFormat()` method; this selects the most efficient format (either `bgra8unorm` or `rgba8unorm`) for the user's device.

### Create a buffer and write our triangle data into it

Next we will provide our WebGPU program with our data, in a form it can use. Our data is initially provided in a `Float32Array`, which contains 8 data points for each triangle vertex — X, Y, Z, W for position, and R, G, B, A for color.

```js
const vertices = new Float32Array([
  0.0, 0.6, 0, 1, 1, 0, 0, 1, -0.5, -0.6, 0, 1, 0, 1, 0, 1, 0.5, -0.6, 0, 1, 0,
  0, 1, 1,
]);
```

However, we've got an issue here. We need to get our data into a `GPUBuffer`. Behind the scenes, this type of buffer is stored in memory very tightly integrated with the GPU's cores to allow for the desired high performance processing. As a side effect, this memory can't be accessed by processes running on the host system, like the browser.

The `GPUBuffer` is created via a call to `GPUDevice.createBuffer()`. We give it a size equal to the length of the `vertices` array so it can contain all the data, and `VERTEX` and `COPY_DST` usage flags to indicate that the buffer will be used as a vertex buffer and the destination of copy operations.

```js
const vertexBuffer = device.createBuffer({
  size: vertices.byteLength, // make it big enough to store vertices in
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});
```

We could handle getting our data into the `GPUBuffer` using a mapping operation, like we use in the compute pipeline example to read data from the GPU back to JavaScript. However, in this case we are going to use the handy `GPUQueue.writeBuffer()` convenience method, which takes as its parameters the buffer to write to, the data source to write from, an offset value for each, and the size of data to write (we've specified the whole length of the array). The browser then works out the most efficient way to handle writing the data.

```js
device.queue.writeBuffer(vertexBuffer, 0, vertices, 0, vertices.length);
```

### Define and create the render pipeline

Now we've got our data into a buffer, the next part of the setup is to actually create our pipeline, ready to be used for rendering.

First of all, we create an object that describes the required layout of our vertex data. This perfectly describes what we saw earlier on in our `vertices` array and vertex shader stage — each vertex has position and color data. Both are formatted in `float32x4` format (which maps to the WGSL `vec4<f32>` type), and the color data starts at an offset of 16 bytes into each vertex. `arrayStride` specifies the stride, meaning the number of bytes making up each vertex, and `stepMode` specifies that the data should be fetched per-vertex.

```js
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
```

Next, we create a descriptor object that specifies the configuration of our render pipeline stages. For both the shader stages, we specify the `GPUShaderModule` that the relevant code can be found in (`shaderModule`), and the name of the function that acts as the entry point for each stage.

In addition, in the case of the vertex shader stage we provide our `vertexBuffers` object to provide the expected state of our vertex data. And in the case of our fragment shader stage, we provide an array of color target states that indicate the specified rendering format (this matches the format specified in our canvas context config earlier).

We also specify a `primitive` object, which in this case just states the type of primitive we will be drawing, and a `layout` of `auto`. The `layout` property defines the layout (structure, purpose, and type) of all the GPU resources (buffers, textures, etc.) used during the execution of the pipeline. In more complex apps, this would take the form of a `GPUPipelineLayout` object, created using `GPUDevice.createPipelineLayout()` (you can see an example in our Basic <example-value> pipeline), which allows the GPU to figure out how to run the pipeline most efficiently ahead of time. However, we are specifying the `auto` value, which will cause the pipeline to generate an implicit bind group layout based on any bindings defined in the shader code.

```js
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
```

Finally, we can create a `GPURenderPipeline` based on our `pipelineDescriptor` object, by passing it in as a parameter to a `GPUDevice.createRenderPipeline()` method call.

```js
const renderPipeline = device.createRenderPipeline(pipelineDescriptor);
```

### Running a rendering pass

Now that all the setup is done, we can actually run a rendering pass and draw something onto our `<canvas>`. To encode any commands to be later issued to the GPU, you need to create a `GPUCommandEncoder` instance, which is done using a `GPUDevice.createCommandEncoder()` call.

```js
const commandEncoder = device.createCommandEncoder();
```

Next up we start the rendering pass <example-value> by creating a `GPURenderPassEncoder` instance with a `GPUCommandEncoder.beginRenderPass()` call. This method takes a descriptor object as a parameter, the only mandatory property of which is a `colorAttachments` array. In this case, we specify:

1. A texture view to render into; we create a new view from the `<canvas>` via `context.getCurrentTexture().createView()`.
2. That the view should be "cleared" to a specified color once loaded and before any drawing takes place. This is what causes the blue background behind the triangle.
3. That the value of the current rendering pass <example-value> be stored for this color attachment.

```js
const clearColor = { r: 0.0, g: 0.5, b: 1.0, a: 1.0 };

const renderPassDescriptor = {
  colorAttachments: [
    {
      clearValue: clearColor,
      loadOp: "clear",
      storeOp: "store",
      view: context.getCurrentTexture().createView(),
    },
  ],
};

const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
```

Now we can invoke methods of the rendering pass <example-value> to draw our triangle:

1. `GPURenderPassEncoder.setPipeline()` is called with our `renderPipeline` object as a parameter to specify the pipeline to use for the rendering pass.
2. `GPURenderPassEncoder.setVertexBuffer()` is called with our `vertexBuffer` object as a parameter to act as the data source to pass to the pipeline to render. The first parameter is the slot to set the vertex buffer for, and is a reference to the index of the element in the `vertexBuffers` array which describes this buffer's layout.
3. `GPURenderPassEncoder.draw()` sets the drawing in motion. There is data for three vertices inside our `vertexBuffer`, so we set a vertex count value of `3` to draw them all.

```js
passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);
```

To finish encoding the sequence of commands and issue them to the GPU, three more steps are needed.

1. We invoke the `GPURenderPassEncoder.end()` method to signal the end of the render pass <example-value> list.
2. We invoke the `GPUCommandEncoder.finish()` method to complete recording of the issued command sequence and encapsulate it into a `GPUCommandBuffer` object instance.
3. We submit the `GPUCommandBuffer` to the device's command queue (represented by a `GPUQueue` instance) to be sent to the GPU. The device's queue is available via the `GPUDevice.queue` property, and an array of `GPUCommandBuffer` instances can be added to the queue via a `GPUQueue.submit()` call.

These three steps can be achieved via the following two lines:

```js
passEncoder.end();

device.queue.submit([commandEncoder.finish()]);
```
