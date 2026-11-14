---
title: "Element: MozMousePixelScroll event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/mozmousepixelscroll_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: MozMousePixelScroll event

The Firefox-only, _non-standard_, and _obsolete_ **`MozMousePixelScroll`** event is fired at an `Element` asynchronously when a mouse wheel or similar device is operated. It's represented by the `MouseScrollEvent` interface.

> **Note:**
> Do not use this non-standard and obsolete event. Instead, you should always use the standard `wheel` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("MozMousePixelScroll", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onMozMousePixelScroll = (event) => { }
```

## Event type

A `WheelEvent`. Inherits from `MouseEvent`, `UIEvent` and `Event`.

## Getting the distance scrolled

The event's `detail` property indicates the scroll distance in terms of lines, with negative values indicating the scrolling movement is either toward the bottom or toward the right, and positive values indicating scrolling to the top or left.

If the platform's native mouse wheel events indicate the scroll distance in terms of lines or pages, the value of `detail` is computed using that value and the line height or page width/height of the nearest ancestor scrollable element that contains the target element.

> **Note:**
> On macOS, the scroll distance (and therefore the value of `detail`) is computed based on the accelerated scroll distance.

The value of `detail` is never 0 if the events are legitimate.

## See also

- `MouseScrollEvent`
- Gecko's legacy line or page scroll event: `DOMMouseScroll`
- Non-Gecko browsers' legacy mouse wheel event: `mousewheel`
- Standardized wheel event: `wheel`
