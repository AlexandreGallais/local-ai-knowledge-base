---
title: "Element: webkitmouseforceup event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/webkitmouseforceup_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: webkitmouseforceup event

The non-standard **`webkitmouseforceup`** event is fired by Safari at an `Element` some time after the `webkitmouseforcedown` event, when pressure on the button has been reduced sufficiently to end the "force click".

**`webkitmouseforceup`** is a proprietary, WebKit-specific event. It is part of the Force Touch events feature.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("webkitmouseforceup", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwebkitmouseforceup = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Specifications

_Not part of any specification._ Apple has a description at the Mac Developer Library.

## See also

- Learn: Introduction to events
- `webkitmouseforcewillbegin`
- `webkitmouseforcedown`
- `webkitmouseforcechanged`
