---
title: "ReadableStreamBYOBReader: cancel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreambyobreader/cancel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamBYOBReader: cancel() method

The **`cancel()`** method of the `ReadableStreamBYOBReader` interface returns a `Promise` that resolves when the stream is canceled.
Calling this method signals a loss of interest in the stream by a consumer.

> **Note:**
> If the reader is active, the `cancel()` method behaves the same as that for the associated stream (`ReadableStream.cancel()`).

## Syntax

```js
cancel()
cancel(reason)
```

### Parameters

- `reason` (optional)
    A human-readable reason for the cancellation. The underlying source may or may not use it.

### Return value

A `Promise`, which fulfills with the value given in the `reason` parameter.

### Exceptions

- `TypeError`
    The source object is not a `ReadableStreamBYOBReader`, or the stream has no owner.

## Examples

This example code calls the `cancel()` method when a button is pressed, passing the string "user choice" as a reason.
The promise resolves when cancellation completes.

```js
button.addEventListener("click", () => {
  reader.cancel("user choice").then(() => console.log(`cancel complete`));
});
```

Note that this code can be seen running in the Using readable byte streams example code (press the **Cancel stream** button).

## See also

- `ReadableStreamBYOBReader()` constructor
- Using readable byte stream
