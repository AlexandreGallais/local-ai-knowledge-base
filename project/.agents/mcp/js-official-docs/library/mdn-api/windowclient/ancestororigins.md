---
title: "WindowClient: ancestorOrigins property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowclient/ancestororigins/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowClient: ancestorOrigins property

The **`ancestorOrigins`** read-only property of the `WindowClient` interface is an array of strings listing the origins of all ancestors of the browsing context represented by this `WindowClient` in reverse order.

The first element in the array is the origin of this window's parent, and the last element is the origin of the top-level browsing context. If this window is itself a top-level browsing context, then `ancestorOrigins` is an empty array.

> **Note:**
> The `referrerpolicy` attribute of an embedding `` affects this list. Setting `referrerpolicy` to `no-referrer`, or to `same-origin` when the framed document is cross-origin, redacts the origin of the document containing the `` from the `ancestorOrigins` list of the framed document. The origin is replaced with an opaque origin, which serializes as `"null"`.

## Value

An array of strings.
