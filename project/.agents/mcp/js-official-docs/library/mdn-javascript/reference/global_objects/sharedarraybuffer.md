---
title: "SharedArrayBuffer"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/sharedarraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedArrayBuffer

The **`SharedArrayBuffer`** object is used to represent a generic raw binary data buffer, similar to the `ArrayBuffer` object, but in a way that they can be used to create views on shared memory. A `SharedArrayBuffer` is not a Transferable Object, unlike an `ArrayBuffer` which is transferable.

## Description

To share memory using `SharedArrayBuffer` objects from one agent in the cluster to another (an agent is either the web page's main program or one of its web workers), `postMessage` and structured cloning is used.

The structured clone algorithm accepts `SharedArrayBuffer` objects and typed arrays mapped onto `SharedArrayBuffer` objects. In both cases, the `SharedArrayBuffer` object is transmitted to the receiver resulting in a new, private `SharedArrayBuffer` object in the receiving agent (just as for `ArrayBuffer`). However, the shared data block referenced by the two `SharedArrayBuffer` objects is the same data block, and a side effect to the block in one agent will eventually become visible in the other agent.

```js
const sab = new SharedArrayBuffer(1024);
worker.postMessage(sab);
```

Shared memory can be created and updated simultaneously in workers or the main thread. Depending on the system (the CPU, the OS, the Browser) it can take a while until the change is propagated to all contexts. To synchronize, `atomic` operations are needed.

`SharedArrayBuffer` objects are used by some web APIs, such as:

- `WebGLRenderingContext.bufferData()`
- `WebGLRenderingContext.bufferSubData()`
- `WebGL2RenderingContext.getBufferSubData()`

### Security requirements

Shared memory and high-resolution timers were effectively disabled at the start of 2018 in light of Spectre.
In 2020, a new, secure approach has been standardized to re-enable shared memory.

To use shared memory your document must be in a secure context and `cross-origin isolated`.
You can use the `Window.crossOriginIsolated` and `WorkerGlobalScope.crossOriginIsolated` properties to check if the document is cross-origin isolated:

```js
const myWorker = new Worker("worker.js");

if (crossOriginIsolated) {
  const buffer = new SharedArrayBuffer(16);
  myWorker.postMessage(buffer);
} else {
  const buffer = new ArrayBuffer(16);
  myWorker.postMessage(buffer);
}
```

When cross-origin isolated, `postMessage()` no longer throws for `SharedArrayBuffer` objects, and shared memory across threads is therefore available.

### API availability

Depending on whether the above security measures are taken, the various memory-sharing APIs have different availabilities:

- The `Atomics` object is always available.
- `SharedArrayBuffer` objects are in principle always available, but unfortunately the constructor on the global object is hidden, unless the two headers mentioned above are set, for compatibility with web content. There is hope that this restriction can be removed in the future. `WebAssembly.Memory` can still be used to get an instance.
- Unless the two headers mentioned above are set, the various `postMessage()` APIs will throw for `SharedArrayBuffer` objects. If they are set, `postMessage()` on `Window` objects and dedicated workers will function and allow for memory sharing.

### WebAssembly shared memory

`WebAssembly.Memory` objects can be created with the `shared` constructor flag. When this flag is set to `true`, the constructed `Memory` object can be shared between workers via `postMessage()`, just like `SharedArrayBuffer`, and the backing `buffer` of the `Memory` object is a `SharedArrayBuffer`. Therefore, the requirements listed above for sharing a `SharedArrayBuffer` between workers also apply to sharing a `WebAssembly.Memory`.

The WebAssembly Threads proposal also defines a new set of atomic instructions. Just as `SharedArrayBuffer` and its methods are unconditionally enabled (and only sharing between threads is gated on the new headers), the WebAssembly atomic instructions are also unconditionally allowed.

### Growing SharedArrayBuffers

`SharedArrayBuffer` objects can be made growable by including the `maxByteLength` option when calling the `SharedArrayBuffer()` constructor. You can query whether a `SharedArrayBuffer` is growable and what its maximum size is by accessing its `growable` and `maxByteLength` properties, respectively. You can assign a new size to a growable `SharedArrayBuffer` with a `grow()` call. New bytes are initialized to 0.

These features make growing `SharedArrayBuffer`s more efficient — otherwise, you have to make a copy of the buffer with a new size. It also gives JavaScript parity with WebAssembly in this regard (Wasm linear memory can be resized with `WebAssembly.Memory.prototype.grow()`).

For security reasons, `SharedArrayBuffer`s cannot be reduced in size, only grown.

## Constructor

- `SharedArrayBuffer()`
    Creates a new `SharedArrayBuffer` object.

## Static properties

- `SharedArrayBuffer[Symbol.species]`
    Returns the constructor used to construct return values from `SharedArrayBuffer` methods.

## Instance properties

These properties are defined on `SharedArrayBuffer.prototype` and shared by all `SharedArrayBuffer` instances.

- `SharedArrayBuffer.prototype.byteLength`
    The size, in bytes, of the array. This is established when the array is constructed and can only be changed using the `SharedArrayBuffer.prototype.grow()` method if the `SharedArrayBuffer` is growable.
- `SharedArrayBuffer.prototype.constructor`
    The constructor function that created the instance object. For `SharedArrayBuffer` instances, the initial value is the `SharedArrayBuffer` constructor.
- `SharedArrayBuffer.prototype.growable`
    Read-only. Returns `true` if the `SharedArrayBuffer` can be grown, or `false` if not.
- `SharedArrayBuffer.prototype.maxByteLength`
    The read-only maximum length, in bytes, that the `SharedArrayBuffer` can be grown to. This is established when the array is constructed and cannot be changed.
- `SharedArrayBuffer.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"SharedArrayBuffer"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `SharedArrayBuffer.prototype.grow()`
    Grows the `SharedArrayBuffer` to the specified size, in bytes.
- `SharedArrayBuffer.prototype.slice()`
    Returns a new `SharedArrayBuffer` whose contents are a copy of this `SharedArrayBuffer`'s bytes from `begin`, inclusive, up to `end`, exclusive. If either `begin` or `end` is negative, it refers to an index from the end of the array, as opposed to from the beginning.

## Examples

Note that these examples cannot be run directly from the console or and arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Creating a new SharedArrayBuffer

```js
const sab = new SharedArrayBuffer(1024);
```

### Slicing the SharedArrayBuffer

```js
sab.slice(); // SharedArrayBuffer { byteLength: 1024 }
sab.slice(2); // SharedArrayBuffer { byteLength: 1022 }
sab.slice(-2); // SharedArrayBuffer { byteLength: 2 }
sab.slice(0, 1); // SharedArrayBuffer { byteLength: 1 }
```

### Using it in a WebGL buffer

```js
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, sab, gl.STATIC_DRAW);
```

## See also

- Agent communication and coordination guide
- `Atomics`
- `ArrayBuffer`
- JavaScript typed arrays guide
- Web Workers
- Shared Memory – a brief tutorial in the TC39 ecmascript-sharedmem proposal
- A Taste of JavaScript's New Parallel Primitives on hacks.mozilla.org (2016)
- COOP and COEP explained by the Chrome team (2020)
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Embedder-Policy`
- `Cross-Origin-Resource-Policy`
- `Window.crossOriginIsolated` and `WorkerGlobalScope.crossOriginIsolated`
- SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92 on developer.chrome.com (2021)
