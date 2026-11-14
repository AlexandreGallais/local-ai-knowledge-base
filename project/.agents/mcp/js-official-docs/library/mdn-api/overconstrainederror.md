---
title: "OverconstrainedError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/overconstrainederror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OverconstrainedError

The **`OverconstrainedError`** interface of the Media Capture and Streams API indicates that the set of desired capabilities for the current `MediaStreamTrack` cannot currently be met. When this event is thrown on a MediaStreamTrack, it is muted until either the current constraints can be established or until satisfiable constraints are applied.

## Constructor

- `OverconstrainedError()`
    Creates a new `OverconstrainedError` object.

## Instance properties

_Also inherits properties from its parent interface, `DOMException`._

- `OverconstrainedError.constraint` (read-only)
    Returns the constraint that was supplied in the constructor, meaning the constraint that was not satisfied.

## Instance methods

_Also inherits methods from its parent interface, `DOMException`._
