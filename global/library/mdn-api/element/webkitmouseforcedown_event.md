---
title: "Element: webkitmouseforcedown event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/webkitmouseforcedown_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: webkitmouseforcedown event

After a `mousedown` event has been fired at the element, if and when sufficient pressure has been applied to the mouse or trackpad button to qualify as a "force click," Safari begins sending **`webkitmouseforcedown`** events to the element.

**`webkitmouseforcedown`** is a proprietary, WebKit-specific event. It is part of the Force Touch events feature.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("webkitmouseforcedown", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwebkitmouseforcedown = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Specifications

_Not part of any specification._ Apple has a description at the Mac Developer Library.

## See also

- Learn: Introduction to events
- `webkitmouseforcewillbegin`
- `webkitmouseforceup`
- `webkitmouseforcechanged`
