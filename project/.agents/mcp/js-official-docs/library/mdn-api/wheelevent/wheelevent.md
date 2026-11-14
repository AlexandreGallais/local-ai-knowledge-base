---
title: "WheelEvent: WheelEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wheelevent/wheelevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WheelEvent: WheelEvent() constructor

The **`WheelEvent()`** constructor returns a new `WheelEvent` object.

> **Note:**
> If you construct a synthetic event using this constructor, that event will not be _trusted_, for security reasons.
> Only browser-generated `WheelEvent` objects are trusted and only trusted events trigger default actions.

## Syntax

```js
new WheelEvent(type)
new WheelEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `wheel`.
- `options` (optional)
    An object that, _in addition of the properties defined in `MouseEvent()`_, can have the following properties:
    - `deltaX` (optional)
        A floating number representing the horizontal scroll amount in the `deltaMode` unit.
        It defaults to `0.0`.
    - `deltaY` (optional)
        A floating number representing the vertical scroll amount in the `deltaMode` unit.
        It defaults to `0.0`.
    - `deltaZ` (optional)
        A floating number representing the scroll amount for the z-axis scroll amount in the `deltaMode` unit.
        It defaults to `0.0`.
    - `deltaMode` (optional)
        An integer representing the unit of the delta values scroll amount. It defaults to `0x00`. Permitted values are:

        | Constant          | Value  | Description                               |
        | ----------------- | ------ | ----------------------------------------- |
        | `DOM_DELTA_PIXEL` | `0x00` | The delta values are specified in pixels. |
        | `DOM_DELTA_LINE`  | `0x01` | The delta values are specified in lines.  |
        | `DOM_DELTA_PAGE`  | `0x02` | The delta values are specified in pages.  |

### Return value

A new `WheelEvent` object.

## See also

- The `WheelEvent` interface it belongs to.
