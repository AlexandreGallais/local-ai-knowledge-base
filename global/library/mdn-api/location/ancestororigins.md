---
title: "Location: ancestorOrigins property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/ancestororigins/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: ancestorOrigins property

The **`ancestorOrigins`** read-only
property of the `Location` interface is a static
`DOMStringList` containing, in reverse order, the origins of all ancestor
browsing contexts of the document associated with the given `Location`
object.

You can use `location.ancestorOrigins` in the script for a document to
determine, for example, whenever the document is being framed by a site which you don't
expect it to be framed by. You can also use it to vary the behavior of the document
based on what site or list of sites is framing it.

> **Note:**
> The `referrerpolicy` attribute of an embedding `` affects this list. Setting `referrerpolicy` to `no-referrer`, or to `same-origin` when the framed document is cross-origin, redacts the origin of the document containing the `` from the `ancestorOrigins` list of the framed document. The origin is replaced with an opaque origin, which serializes as `"null"`.

## Value

A `DOMStringList`.
