---
title: "DedicatedWorkerGlobalScope: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dedicatedworkerglobalscope/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DedicatedWorkerGlobalScope: close() method

The **`close()`** method of the `DedicatedWorkerGlobalScope` interface discards any tasks queued in the `DedicatedWorkerGlobalScope`'s event loop, effectively closing this particular scope.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

If you want to close your worker instance from inside the worker itself, you can call the following:

```js
close();
```

`close()` and `self.close()` are effectively equivalent — both represent `close()` being called from inside the worker's inner scope.

> **Note:**
> There is also a way to stop the worker from the main thread: the `Worker.terminate` method.

## See also

- `DedicatedWorkerGlobalScope`
