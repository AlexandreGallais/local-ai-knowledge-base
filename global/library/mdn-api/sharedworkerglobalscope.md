---
title: "SharedWorkerGlobalScope"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedworkerglobalscope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedWorkerGlobalScope

The **`SharedWorkerGlobalScope`** object (the `SharedWorker` global scope) is accessible through the `self` keyword. Some additional global functions, namespaces objects, and constructors, not typically associated with the worker global scope, but available on it, are listed in the JavaScript Reference. See the complete list of functions available to workers.

## Instance properties

_This interface inherits properties from the `WorkerGlobalScope` interface, and its parent `EventTarget`._

- `SharedWorkerGlobalScope.name` (read-only)
    The name that the `SharedWorker` was (optionally) given when it was created using the `SharedWorker()` constructor. This is mainly useful for debugging purposes.

## Instance methods

_This interface inherits methods from the `WorkerGlobalScope` interface, and its parent `EventTarget`._

- `SharedWorkerGlobalScope.close()`
    Discards any tasks queued in the `SharedWorkerGlobalScope`'s event loop, effectively closing this particular scope.

## Events

Listen to this event using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `connect`
    Fired on shared workers when a new client connects.

## See also

- `SharedWorker`
- `WorkerGlobalScope`
- Using Web workers
- Functions available to workers
