---
title: "VisualViewport: scrollend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/visualviewport/scrollend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VisualViewport: scrollend event

The **`scrollend`** event of the `VisualViewport` interface is fired when a scrolling operation on the visual viewport ends. This allows you to update an element when a scrolling action is completed. For example, you could use the `resize` and `scroll` events to keep an element fixed to the visual viewport as it is pinch-zoomed and scrolled, and update it with new content when scrolling ends using `scrollend`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("scrollend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onscrollend = (event) => { }
```

## Event type

A generic `Event`.

## Examples

See the `VisualViewport` landing page for a usage demo.
