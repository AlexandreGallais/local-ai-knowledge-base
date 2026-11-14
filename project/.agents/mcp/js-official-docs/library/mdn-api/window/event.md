---
title: "Window: event property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: event property

The read-only `Window` property **`event`** returns the `Event` which is currently being handled by the site's code. Outside the context of an event handler, the value is always `undefined`.

You _should_ avoid using this property in new code, and should instead use the `Event` passed into the event handler function. This property is not universally supported and even when supported introduces potential fragility to your code.

> **Note:**
> This property can be fragile, in that there may be situations in which the returned `Event` is not the expected value. In addition, `Window.event` is not accurate for events dispatched within shadow trees.

## See also

- `Event.srcElement`
