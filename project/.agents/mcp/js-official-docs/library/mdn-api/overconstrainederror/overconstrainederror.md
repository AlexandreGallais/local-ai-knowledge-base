---
title: "OverconstrainedError: OverconstrainedError() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/overconstrainederror/overconstrainederror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OverconstrainedError: OverconstrainedError() constructor

The **`OverconstrainedError()`** constructor
creates a new `OverconstrainedError` object which indicates that the set of
desired capabilities for the current `MediaStreamTrack` cannot currently be
met. When this event is thrown on a `MediaStreamTrack`, it is muted until
either the current constraints can be established or until satisfiable constraints are
applied.

## Syntax

```js
new OverconstrainedError()
```

### Parameters

- `constraint`
    The constraint that was not satisfied.
- `message` (optional)
    Text for the error's `message` property. Defaults to an empty string.
