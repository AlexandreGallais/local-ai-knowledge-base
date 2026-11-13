---
title: "VisualViewport: scroll event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/visualviewport/scroll_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VisualViewport: scroll event

The **`scroll`** event of the `VisualViewport` interface is fired when the visual viewport is scrolled. This allows you to position elements relative to the visual viewport as it is scrolled, which would normally be anchored to the layout viewport.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("scroll", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onscroll = (event) => { }
```

## Event type

A generic `Event`.

## Examples

See the `VisualViewport` landing page for a usage demo.
