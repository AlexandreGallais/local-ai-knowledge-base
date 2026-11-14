---
title: "Element: gesturestart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/gesturestart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: gesturestart event

The **`gesturestart`** event is fired when multiple fingers contact the touch surface, thus starting a new gesture. During the gesture, `gesturechange` events will be fired. When the gesture has ended, a `gestureend` event will be fired.

It is a proprietary event specific to WebKit.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("gesturestart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ongesturestart = (event) => { }
```

## Event type

A `GestureEvent`. Inherits from `Event`.

## Specifications

Not part of any specification.

## See also

- GestureEventClassReference at the Safari Developer Library
