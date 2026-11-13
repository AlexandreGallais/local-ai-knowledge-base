---
title: "Client"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/client/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Client

The `Client` interface represents an executable context such as a `Worker`, or a `SharedWorker`. `Window` clients are represented by the more-specific `WindowClient`. You can get `Client`/`WindowClient` objects from methods such as `Clients.matchAll()` and `Clients.get()`.

## Instance properties

- `Client.frameType` (read-only)
    The client's frame type as a string. It can be `"auxiliary"`, `"top-level"`, `"nested"`, or `"none"`.
- `Client.id` (read-only)
    The universally unique identifier of the client as a string.
- `Client.type` (read-only)
    The client's type as a string. It can be `"window"`, `"worker"`, or `"sharedworker"`.
- `Client.url` (read-only)
    The URL of the client as a string.

## Instance methods

- `Client.postMessage()`
    Sends a message to the client.

## See also

- Using Service Workers
