---
title: "TransformStreamDefaultController: error() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/transformstreamdefaultcontroller/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TransformStreamDefaultController: error() method

The **`error()`** method of the `TransformStreamDefaultController` interface errors both sides of the stream. Any further interactions with it will fail with the given error message, and any chunks in the queue will be discarded.

## Syntax

```js
error(reason)
```

### Parameters

- `reason`
    A string containing the error message to be returned on any further interaction with the stream.

### Return value

None (`undefined`).

## Examples

In this example the `error()` method is used when a chunk could not be transformed.

```js
const transformContent = {
  start() {
    /* … */
  },
  async transform(chunk, controller) {
    try {
      chunk = await applyMyTransformation(chunk);
    } catch (err) {
      controller.error(`Unable to transform chunk: ${err}`);
    }
    // …
  },
  // …
};
```
