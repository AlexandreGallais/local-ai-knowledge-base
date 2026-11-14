---
title: "TouchEvent: TouchEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touchevent/touchevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TouchEvent: TouchEvent() constructor

The **`TouchEvent()`** constructor creates a new `TouchEvent` object.

> **Note:**
> If you construct a synthetic event using this constructor, that event will not be _trusted_, for security reasons.
> Only browser-generated `TouchEvent` objects are trusted and only trusted events trigger default actions.

## Syntax

```js
new TouchEvent(type)
new TouchEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `touchstart`, `touchend`, `touchmove`, `touchcancel`
- `options` (optional)
    An object that, _in addition of the properties defined in `UIEvent()`_, can have the following properties:
    - `touches` (optional)
        A `TouchList`, defaulting to an empty one, that is a list of objects for every point of contact currently touching the surface.
    - `targetTouches` (optional)
        A `TouchList`, defaulting to an empty one, that is a list of objects for every point of contact that is touching the surface
        _and_ started on the element that is the target of the current event.
    - `changedTouches` (optional)
        and defaulting to `[]`, of type `Touch[]`, that is a list of objects for every point of contact which contributed to the event.
    - `ctrlKey` (optional)
        A boolean value, defaulting to `false`, indicating if the `ctrl` key was simultaneously pressed.
    - `shiftKey` (optional)
        A boolean value, defaulting to `false`, indicating if the `shift` key was simultaneously pressed.
    - `altKey` (optional)
        A boolean value, defaulting to `false`, indicating if the `alt` key was simultaneously pressed.
    - `metaKey` (optional)
        A boolean value, defaulting to `false`, indicating if the `meta` key was simultaneously pressed.

### Return value

A new `TouchEvent` object.

## See also

- `TouchEvent`, the interface of the objects it constructs.
