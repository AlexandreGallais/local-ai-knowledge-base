---
title: "WebGPU API (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgpu_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGPU API

The **WebGPU API** enables web developers to use the underlying system's GPU (Graphics Processing Unit) to carry out high-performance computations and draw complex images that can be rendered in the browser.

WebGPU is the successor to `WebGL`, providing better compatibility with modern GPUs, support for general-purpose GPU computations, faster operations, and access to more advanced GPU features.

## Concepts and usage

It is fair to say that `WebGL` revolutionized the web in terms of graphical capabilities after it first appeared around 2011. WebGL is a JavaScript port of the OpenGL ES 2.0 graphics library, allowing web pages to pass <example-value> computations directly to the device's GPU to be processed at very high speeds, and render the result inside a `<canvas>` element.

WebGL and the GLSL language used to write WebGL shader code are complex, so several WebGL libraries have been created to make WebGL apps easier to write: Popular examples include Three.js, Babylon.js, and PlayCanvas. Developers have used these tools to build immersive web-based 3D games, music videos, training and modeling tools, VR and AR experiences, and more.

However, WebGL has some fundamental issues that needed addressing:

- Since WebGL's release, a new generation of native GPU APIs have appeared — the most popular being Microsoft's Direct3D 12, Apple's Metal, and The Khronos Group's Vulkan — which provide a multitude of new features. There are no more updates planned to OpenGL (and therefore WebGL), so it won't get any of these new features. WebGPU on the other hand will have new features added to it going forwards.
- WebGL is based wholly around the use case of drawing graphics and rendering them to a canvas. It does not handle general-purpose GPU (GPGPU) computations very well. GPGPU computations are becoming more and more important for many different use cases, for example those based on machine learning models.
- 3D graphics apps are becoming increasingly demanding, both in terms of the number of objects to be rendered simultaneously, and usage of new rendering features.

WebGPU addresses these issues, providing an updated general-purpose architecture compatible with modern GPU APIs, which feels more "webby". It supports graphic rendering, but also has first-class support for GPGPU computations. Rendering of individual objects is significantly cheaper on the CPU side, and it supports modern GPU rendering features such as compute-based particles and post-processing filters like color effects, sharpening, and depth-of-field simulation. In addition, it can handle expensive computations such as culling and skinned model transformation directly on the GPU.

## General model

There are several layers of abstraction between a device GPU and a web browser running the WebGPU API. It is useful to understand these as you begin to learn WebGPU:

- Physical devices have GPUs. Most devices only have one GPU, but some have more than one. Different GPU types are available:
  - Integrated GPUs, which live on the same board as the CPU and share its memory.
  - Discrete GPUs, which live on their own board, separate from the CPU.
  - Software "GPUs", implemented on the CPU.

  > **Note:**
  > The above diagram assumes a device with only one GPU.

- A native GPU API, which is part of the OS (for example, Metal on macOS), is a programming interface allowing native applications to use the capabilities of the GPU. API instructions are sent to the GPU (and responses received) via a driver. It is possible for a system to have multiple native OS APIs and drivers available to communicate with the GPU, although the above diagram assumes a device with only one native API/driver.
- A browser's WebGPU implementation handles communicating with the GPU via a native GPU API driver. A WebGPU adapter effectively represents a physical GPU and driver available on the underlying system, in your code.
- A logical device is an abstraction via which a single web app can access GPU capabilities in a compartmentalized way. Logical devices are required to provide multiplexing capabilities. A physical device's GPU is used by many applications and processes concurrently, including potentially many web apps. Each web app needs to be able to access WebGPU in isolation for security and logic reasons.

## Accessing a device

A logical device — represented by a `GPUDevice` object instance — is the basis from which a web app accesses all WebGPU functionality. Accessing a device is done as follows:

1. The `Navigator.gpu` property (or `WorkerNavigator.gpu` if you are using WebGPU functionality from inside a worker) returns the `GPU` object for the current context.
2. You access an adapter via the `GPU.requestAdapter()` method. This method accepts an optional settings object allowing you to request, for example, a compatibility mode, high-performance, or low-energy adapter. If this is not included, the device will provide access to the default adapter, which is good enough for most purposes.
3. A device can be requested via `GPUAdapter.requestDevice()`. This method also accepts an options object (referred to as a descriptor), which can be used to specify the exact features and limits you want the logical device to have. If this is not included, the supplied device will have a reasonable general-purpose spec that is good enough for most purposes.

Putting this together with some feature detection checks, the above process could be achieved as follows:

```js
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  let adapter;
  try {
    adapter = await navigator.gpu.requestAdapter();
  } catch (error) {
    console.error(error);
  }
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  // …
}
```

### WebGPU compatibility mode

By default, a `GPUAdapter` supports all core WebGPU features and limits, which allows applications to support devices with modern platform graphics APIs. This is referred to as "core" WebGPU.

It is possible to opt WebGPU into "compatibility mode", which specifies that the `GPUAdapter` will support a restricted subset of the WebGPU API capable of running in older graphics APIs such as OpenGL ES 3.1 and Direct3D 11. This is done by specifying a `featureLevel` value of `compatibility` in your `GPU.requestAdapter()` call:

```js
const adapter = await navigator.gpu.requestAdapter({
  featureLevel: "compatibility",
});
```

The exact restrictions of compatibility mode are detailed at WebGPU Compatibility Mode.
Restricted applications are still valid WebGPU core applications due to supporting a subset of core WebGPU, and will therefore run on all browsers that support core WebGPU, even if they don't explicitly support compatibility mode.

A `GPUAdapter` or `GPUDevice` that supports core WebGPU will have the `core-features-and-limits` feature available (see `GPUSupportedFeatures`). To test whether a WebGPU app is in core or compatibility mode, check whether the `core-features-and-limits` feature is supported, for example:

```js
const isCore = device.features.has("core-features-and-limits");
```

See also Using compatibility mode only if necessary.

## Pipelines and shaders: WebGPU app structure

A pipeline is a logical structure containing programmable stages that are completed to get your program's work done. WebGPU is currently able to handle two types of pipeline:

- A render pipeline renders graphics, typically into a `<canvas>` element, but it could also render graphics offscreen. It has two main stages:
  - A vertex stage, in which a vertex shader takes positioning data fed into the GPU and uses it to position a series of vertices in 3D space by applying specified effects like rotation, translation, or perspective. The vertices are then assembled into primitives such as triangles (the basic <example-value> block of rendered graphics) and rasterized by the GPU to figure out what pixels each one should cover on the drawing canvas.

  - A fragment stage, in which a fragment shader computes the color for each pixel covered by the primitives produced by the vertex shader. These computations frequently use inputs such as images (in the form of textures) that provide surface details and the position and color of virtual lights.

- A compute pipeline is for general computation. A compute pipeline contains a single compute stage in which a compute shader takes general data, processes it in parallel across a specified number of workgroups, then returns the result in one or more buffers. The buffers can contain any kind of data.

The shaders mentioned above are sets of instructions processed by the GPU. WebGPU shaders are written in a low-level Rust-like language called WebGPU Shading Language (WGSL).

There are several different ways in which you could architect a WebGPU app, but the process will likely contain the following steps:

1. Create shader modules: Write your shader code in WGSL and package it into one or more shader modules.
2. Get and configure the canvas context: Get the `webgpu` context of a `<canvas>` element and configure it to receive information on what graphics to render from your GPU logical device. This step is not necessary if your app has no graphical output, such as one that only uses compute pipelines.
3. Create resources containing your data: The data that you want processed by your pipelines needs to be stored in GPU buffers or textures to be accessed by your app.
4. Create pipelines: Define pipeline descriptors that describe the desired pipelines in detail, including the required data structure, bindings, shaders, and resource layouts, then create pipelines from them. Our basic demos only contain a single pipeline, but non-trivial apps will usually contain multiple pipelines for different purposes.
5. Run a compute/rendering pass: This involves a number of substeps:
   1. Create a command encoder that can encode a set of commands to be passed to the GPU to execute.
   2. Create a pass <example-value> object on which compute/render commands are issued.
   3. Run commands to specify which pipelines to use, what buffer(s) to get the required data from, how many drawing operations to run (in the case of render pipelines), etc.
   4. Finalize the command list and encapsulate it in a command buffer.
   5. Submit the command buffer to the GPU via the logical device's command queue.

In the sections below, we will examine a basic <example-value> pipeline demo, to allow you to explore what it requires. Later on, we'll also examine a basic <example-value> pipeline example, looking at how it differs from the render pipeline.
