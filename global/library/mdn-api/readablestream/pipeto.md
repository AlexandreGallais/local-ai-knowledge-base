---
title: "ReadableStream: pipeTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestream/pipeto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStream: pipeTo() method

The **`pipeTo()`** method of the `ReadableStream` interface pipes the current `ReadableStream` to a given `WritableStream` and returns a `Promise` that fulfills when the piping process completes successfully, or rejects if any errors were encountered.

Piping a stream will generally lock it for the duration of the pipe, preventing other readers from locking it.

## Syntax

```js
pipeTo(destination)
pipeTo(destination, options)
```

### Parameters

- `destination`
    A `WritableStream` that acts as the final destination for the `ReadableStream`.

- `options` (optional)
    The options that should be used when piping to the `writable` stream.
    Available options are:
    - `preventClose`
        If this is set to `true`, the source `ReadableStream` closing will no longer cause the destination `WritableStream` to be closed.
        The method will return a fulfilled promise once this process completes, unless an error is encountered while closing the destination in which case it will be rejected with that error.
    - `preventAbort`
        If this is set to `true`, errors in the source `ReadableStream` will no longer abort the destination `WritableStream`.
        The method will return a promise rejected with the source's error, or with any error that occurs during aborting the destination.
    - `preventCancel`
        If this is set to `true`, errors in the destination `WritableStream` will no longer cancel the source `ReadableStream`.
        In this case the method will return a promise rejected with the source's error, or with any error that occurs during canceling the source.
        In addition, if the destination writable stream starts out closed or closing, the source readable stream will no longer be canceled.
        In this case the method will return a promise rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source.
    - `signal`
        If set to an `AbortSignal` object, ongoing pipe operations can then be aborted via the corresponding `AbortController`.

### Return value

A `Promise` that resolves when the piping process has completed.

### Exceptions

- `TypeError`
    The `writableStream` and/or `readableStream` objects are not a writable stream/readable stream, or one or both of the streams are locked.

## Examples

```js
// Fetch the original image
fetch("png-logo.png")
  // Retrieve its body as ReadableStream
  .then((response) => response.body)
  .then((body) => body.pipeThrough(new PNGTransformStream()))
  .then((rs) => rs.pipeTo(new FinalDestinationStream()));
```

The same example, but using `await`:

```js
(async () => {
  // Fetch the original image
  const response = await fetch("png-logo.png");
  // Retrieve its body as ReadableStream
  await response.body
    .pipeThrough(new PNGTransformStream())
    .pipeTo(new FinalDestinationStream());
})();
```

## See also

- `ReadableStream()` constructor
- Pipe chains
