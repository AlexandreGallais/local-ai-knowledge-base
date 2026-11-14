---
title: "ReadableStreamDefaultController: error() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreamdefaultcontroller/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamDefaultController: error() method

The **`error()`** method of the
`ReadableStreamDefaultController` interface causes any future interactions
with the associated stream to error.

> **Note:**
> The `error()` method can be called
> more than once, and can be called when the stream is not readable.

## Syntax

```js
error(e)
```

### Parameters

- `e`
    The error you want future interactions to fail with.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the source object is not a `ReadableStreamDefaultController`.

## Examples

The A readable stream with an underlying push source and backpressure support example in the spec
provides a good example of using
`ReadableStreamDefaultController.desiredSize` to manually detect when the
stream is full and apply backpressure, and also of using `error()` to
manually trigger a stream error if another part of the system it relies on fails.

## See also

- Using readable streams
- `ReadableStreamDefaultController`
