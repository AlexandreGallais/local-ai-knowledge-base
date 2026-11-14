---
title: "AbortController"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortcontroller/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortController

The **`AbortController`** interface represents a controller object that allows you to abort one or more Web requests as and when desired.

You can create a new `AbortController` object using the `AbortController()` constructor. Communicating with an asynchronous operation is done using an `AbortSignal` object.

## Constructor

- `AbortController()`
    Creates a new `AbortController` object instance.

## Instance properties

- `AbortController.signal` (read-only)
    Returns an `AbortSignal` object instance, which can be used to communicate with, or to abort, an asynchronous operation.

## Instance methods

- `AbortController.abort()`
    Aborts an asynchronous operation before it has completed. This is able to abort fetch requests, consumption of any response bodies, and streams.

## Examples

See the `AbortSignal` page for usage examples.

You can find a full working example on GitHub; you can also see it running live.

## See also

- Fetch API
- Abortable Fetch by Jake Archibald
