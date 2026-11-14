---
title: "Element: webkitmouseforcechanged event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/webkitmouseforcechanged_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: webkitmouseforcechanged event

The non-standard **`webkitmouseforcechanged`** event is fired by Safari each time the amount of pressure changes on the trackpad/touchscreen.

**`webkitmouseforcechanged`** is a proprietary, WebKit-specific event introduced by Apple to support their Force Touch events feature.

This event first fires after the `mousedown` event and stops firing before the `mouseup` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("webkitmouseforcechanged", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwebkitmouseforcechanged = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Specifications

_Not part of any specification._ Apple has a description at the Mac Developer Library.

## See also

- Learn: Introduction to events
- `webkitmouseforcewillbegin`
- `webkitmouseforcedown`
- `webkitmouseforceup`
