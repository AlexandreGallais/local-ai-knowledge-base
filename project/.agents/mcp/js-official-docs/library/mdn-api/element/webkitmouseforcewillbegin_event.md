---
title: "Element: webkitmouseforcewillbegin event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/webkitmouseforcewillbegin_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: webkitmouseforcewillbegin event

Safari for macOS fires the non-standard **`webkitmouseforcewillbegin`** event at an `Element` before firing the initial `mousedown` event.

This offers the opportunity to tell the system not to trigger any default Force Touch actions if and when the click turns into a Force Touch events.

To instruct macOS not to engage any default Force Touch actions if the user apply enough pressure to activate a Force Touch event, call `preventDefault()` on the `webkitmouseforcewillbegin` event object.

**`webkitmouseforcewillbegin`** is a proprietary, WebKit-specific event. It is part of the Force Touch events feature.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("webkitmouseforcewillbegin", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwebkitmouseforcewillbegin = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Specifications

_Not part of any specification._ Apple has a description at the Mac Developer Library.

## See also

- Learn: Introduction to events
- `webkitmouseforcedown`
- `webkitmouseforceup`
- `webkitmouseforcechanged`
