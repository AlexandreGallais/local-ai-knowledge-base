---
title: "Window: fence property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/fence/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: fence property

The `fence` read-only property of the `Window` interface returns a `Fence` object instance for the current document context.

`Fence` objects are only available to documents embedded inside `<fencedframe>`s (loaded via `FencedFrameConfig`s) or ``s (loaded via opaque URNs).

> **Note:**
> See How do `<fencedframe>`s work? for some description around `FencedFrameConfig`s and opaque URNs.

## Value

A `Fence` object instance, or `null` if the document context does not have access to a `Fence` object.

## Examples

```js
window.fence.reportEvent({
  eventType: "click",
  eventData: JSON.stringify({ clickX: "123", clickY: "456" }),
  destination: ["buyer", "seller"],
});
```

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
