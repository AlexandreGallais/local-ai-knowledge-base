---
title: "ReadableStreamBYOBRequest: view property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreambyobrequest/view/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamBYOBRequest: view property

The **`view`** getter property of the `ReadableStreamBYOBRequest` interface returns the current view.

## Value

A `Uint8Array` typed array representing the destination region to which the controller can write generated data.

`null` if the request has already been responded to, by calling `ReadableStreamBYOBRequest.respond()` or `ReadableStreamBYOBRequest.respondWithNewView()`.

## Examples

See the examples in `ReadableStreamBYOBRequest`.

## See also

- Using readable byte stream
