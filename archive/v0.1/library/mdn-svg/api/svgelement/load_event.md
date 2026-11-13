---
title: "SVGElement: load event"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgelement/load_event/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGElement: load event

The `load` event fires on an `SVGElement` when it is loaded in the browser, e.g., in the DOM in the case of an embedded ``. It is basically the same as the standard `load` DOM event.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("load", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onload = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
svgElem.addEventListener("load", () => {
  console.log("SVG loaded.");
});
```
