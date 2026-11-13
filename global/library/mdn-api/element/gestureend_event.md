---
title: "Element: gestureend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/gestureend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: gestureend event

The **`gestureend`** event is fired when there are no longer multiple fingers contacting the touch surface, thus ending the gesture.

It is a proprietary event specific to WebKit.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("gestureend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ongestureend = (event) => { }
```

## Event type

A `GestureEvent`. Inherits from `Event`.

## Specifications

Not part of any specification.

## See also

- GestureEventClassReference at the Safari Developer Library
