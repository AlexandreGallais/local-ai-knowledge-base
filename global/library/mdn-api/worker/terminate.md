---
title: "Worker: terminate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/worker/terminate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Worker: terminate() method

The **`terminate()`** method of the `Worker` interface immediately terminates the `Worker`. This does not offer the worker an opportunity to finish its operations; it is stopped at once.

## Syntax

```js
terminate()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The following code snippet shows creation of a `Worker` object using the `Worker()` constructor, which is then immediately terminated.

```js
const myWorker = new Worker("worker.js");

myWorker.terminate();
```

> **Note:**
> DedicatedWorkers and SharedWorkers can also be stopped from the `Worker` instance using the `DedicatedWorkerGlobalScope.close()` or `SharedWorkerGlobalScope.close()` methods.

## See also

- `Worker` interface
- `DedicatedWorkerGlobalScope.close()`
- `SharedWorkerGlobalScope.close()`
