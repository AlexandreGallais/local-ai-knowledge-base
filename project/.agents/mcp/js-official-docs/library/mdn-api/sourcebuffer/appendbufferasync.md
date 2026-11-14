---
title: "SourceBuffer: appendBufferAsync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/appendbufferasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: appendBufferAsync() method

The **`appendBufferAsync()`** method
of the `SourceBuffer` interface begins the process of asynchronously
appending media segment data from an `ArrayBuffer`,
a `TypedArray` or a `DataView` object to the `SourceBuffer` object.
It returns a `Promise` which is fulfilled once the buffer has been appended.

## Syntax

```js
appendBufferAsync(source)
```

### Parameters

- `source`
    Either an `ArrayBuffer`, a `TypedArray` or a `DataView` object that contains the media segment data you want to add to the `SourceBuffer`.

### Return value

A `Promise` which is fulfilled when the buffer has been added successfully to the `SourceBuffer` object,
or `null`, if the request could not be initiated.

## Examples

This simplified example async function, `fillSourceBuffer()`, takes as input
parameters `buffer`, an `ArrayBuffer`, a `TypedArray`, or a `DataView`, and a
`SourceBuffer` object to which to append the source media from the buffer.

```js
async function fillSourceBuffer(buffer, msBuffer) {
  try {
    while (true) {
      await msBuffer.appendBufferAsync(buffer);
    }
  } catch (e) {
    handleException(e);
  }
}
```

## Specifications

This feature is not part of any specification. It is not on track to become a standard.

## See also

- Media Source Extensions API
- `SourceBuffer.appendBuffer()`
- `MediaSource`
- `SourceBufferList`
