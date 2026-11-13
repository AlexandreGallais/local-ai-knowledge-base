---
title: "TransformStreamDefaultController: terminate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/transformstreamdefaultcontroller/terminate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TransformStreamDefaultController: terminate() method

The **`terminate()`** method of the `TransformStreamDefaultController` interface closes the readable side and errors the writable side of the stream.

## Syntax

```js
terminate()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

In the below example the `terminate()` method is called on a `TransformStreamDefaultController`.

```js
controller.terminate();
```
