---
title: "VisualViewport: resize event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/visualviewport/resize_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VisualViewport: resize event

The **`resize`** event of the `VisualViewport` interface is fired when the visual viewport is resized. This allows you to position elements relative to the visual viewport as it is zoomed, which would normally be anchored to the layout viewport.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("resize", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onresize = (event) => { }
```

## Event type

A generic `Event`.

## Examples

See the `VisualViewport` landing page for a usage demo.
