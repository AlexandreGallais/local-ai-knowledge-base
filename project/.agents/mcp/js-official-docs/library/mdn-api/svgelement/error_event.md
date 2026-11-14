---
title: "SVGElement: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgelement/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGElement: error event

The `error` event is fired when an SVG element does not load properly or when an error occurs during script execution.

This basically implements the standard `error` DOM event.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
svgElem.addEventListener("error", () => {
  console.log("SVG not loaded properly.");
});
```
