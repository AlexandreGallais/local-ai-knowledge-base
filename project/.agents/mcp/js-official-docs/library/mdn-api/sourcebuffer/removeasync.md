---
title: "SourceBuffer: removeAsync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/removeasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: removeAsync() method

The **`removeAsync()`** method of the
`SourceBuffer` interface starts the process of asynchronously removing
from the `SourceBuffer` media segments found within a specific time
range. A `Promise` is returned, which is fulfilled when the buffers
in the specified time range have been removed.

This method can only be called when `updating` is
`false`. If that's not the case, call `abort()` instead.

## Syntax

```js
removeAsync(start, end)
```

### Parameters

- `start`
    A double representing the start of the time range, in seconds.
- `end`
    A double representing the end of the time range, in seconds.

### Return value

A `Promise` whose fulfillment handler is executed once the buffers in the
specified time range have been removed from the `SourceBuffer`.

## Examples

This example establishes an asynchronous function, `emptySourceBuffer()`,
which clears the contents of the specified `SourceBuffer`.

```js
async function emptySourceBuffer(msBuffer) {
  await msBuffer.removeAsync(0, Infinity).catch((e) => {
    handleException(e);
  });
}
```

## Specifications

This feature is not part of any specification. It is not on track to become a standard.

## See also

- Media Source Extensions API
- `SourceBuffer.remove()`
- `MediaSource`
- `SourceBufferList`
