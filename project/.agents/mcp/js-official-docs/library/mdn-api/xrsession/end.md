---
title: "XRSession: end() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: end() method

The **`end()`** method shuts down the
`XRSession` on which it's called, returning a promise which resolves once
the session has fully shut down.

## Syntax

```js
end()
```

### Parameters

None.

### Return value

A `Promise` that resolves without a value after any platform-specific steps
related to shutting down the session have completed. You can use the promise to do
things like update UI elements to reflect the shut down connection, trigger application
shut down, or whatever else you might need to do.
