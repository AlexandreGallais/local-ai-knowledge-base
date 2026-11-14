---
title: "The structured clone algorithm"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_workers_api/structured_clone_algorithm/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# The structured clone algorithm

The **structured clone algorithm** copies complex JavaScript objects.
It is used internally when invoking `structuredClone()`, to transfer data between Workers via `postMessage()`, storing objects with IndexedDB, or copying objects for other APIs.

It clones by recursing through the input object while maintaining a map of previously visited references, to avoid infinitely traversing cycles.

## Things that don't work with structured clone

- `Function` objects cannot be duplicated by the structured clone algorithm; attempting to throws a `DataCloneError` exception.
- Cloning DOM nodes likewise throws a `DataCloneError` exception.
- Certain object properties are not preserved:
  - The `lastIndex` property of `RegExp` objects is not preserved.
  - Property descriptors, setters, getters, and similar metadata-like features are not duplicated.
    For example, if an object is marked readonly with a property descriptor, it will be read/write in the duplicate, since that's the default.
  - The prototype chain is not walked or duplicated.
  - Class private elements are not duplicated. (Although internal fields of built-in types may.)

## Supported types

### JavaScript types

- `Array`
- `ArrayBuffer`
- `Boolean`
- `DataView`
- `Date`
- `Error` types (but see Error types below).
- `Map`
- `Number`
- `Object` objects: but only plain objects (e.g., from object literals).
- Primitive types, except `symbol`.
- `RegExp`: but note that `lastIndex` is not preserved.
- `Set`
- `String`
- `TypedArray`

#### Error types

For `Error` types, the error name must be one of: `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, `URIError` (or will be set to "Error").

Browsers must serialize the properties `name` and `message`, and are expected to serialize other "interesting" properties of the errors such as `stack`, `cause`, etc.

`AggregateError` support is expected to be added to the specification in whatwg/html#5749 (and is already supported in some browsers).

### Web/API types

- `AudioData`
- `Blob`
- `CropTarget`
- `CryptoKey`
- `DOMException`: browsers must serialize the properties `name` and `message`. Other attributes may also be serialized/cloned.
- `DOMMatrix`
- `DOMMatrixReadOnly`
- `DOMPoint`
- `DOMPointReadOnly`
- `DOMQuad`
- `DOMRect`
- `DOMRectReadOnly`
- `EncodedAudioChunk`
- `EncodedVideoChunk`
- `FencedFrameConfig`
- `File`
- `FileList`
- `FileSystemDirectoryHandle`
- `FileSystemFileHandle`
- `FileSystemHandle`
- `GPUCompilationInfo`
- `GPUCompilationMessage`
- `GPUPipelineError`
- `ImageBitmap`
- `ImageData`
- `RTCCertificate`
- `RTCEncodedAudioFrame`
- `RTCEncodedVideoFrame`
- `VideoFrame`
- `WebTransportError`

> **Note:**
> Serializable objects are marked up in Web IDL files with the attribute `[Serializable]`.

## See also

- HTML Specification: Safe passing of structured data
- Transferable objects
- `Window.structuredClone()`
- `WorkerGlobalScope.structuredClone()`
- `window.postMessage()`
- Web Workers
- IndexedDB
