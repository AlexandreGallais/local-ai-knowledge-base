---
title: "WorkerLocation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerlocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerLocation

The **`WorkerLocation`** interface defines the absolute location of the script executed by the `Worker`. Such an object is initialized for each worker and is available via the `WorkerGlobalScope.location` property obtained by calling `self.location`.

This interface is only visible from inside a JavaScript script executed in the context of a Web worker.

## Instance properties

- `WorkerLocation.href` (read-only)
    Returns a string containing the serialized `URL` for the worker's location.
- `WorkerLocation.protocol` (read-only)
    Returns the `protocol` part of the worker's location.
- `WorkerLocation.host` (read-only)
    Returns the `host` part of the worker's location.
- `WorkerLocation.hostname` (read-only)
    Returns the `hostname` part of the worker's location.
- `WorkerLocation.origin` (read-only)
    Returns the worker's `origin`.
- `WorkerLocation.port` (read-only)
    Returns the `port` part of the worker's location.
- `WorkerLocation.pathname` (read-only)
    Returns the `pathname` part of the worker's location.
- `WorkerLocation.search` (read-only)
    Returns the `search` part of the worker's location.
- `WorkerLocation.hash` (read-only)
    Returns the `hash` part of the worker's location.

## Instance methods

- `WorkerLocation.toString()`
    Returns a string containing the serialized `URL` for the worker's location. It is a synonym for `WorkerLocation.href`.

## See also

- Other Worker-related interfaces: `Worker`, `WorkerNavigator`, and `WorkerGlobalScope`
- Using web workers
