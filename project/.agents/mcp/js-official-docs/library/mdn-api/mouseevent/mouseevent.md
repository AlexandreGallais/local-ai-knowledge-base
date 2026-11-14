---
title: "MouseEvent: MouseEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/mouseevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: MouseEvent() constructor

The **`MouseEvent()`** constructor creates a new `MouseEvent` object.

## Syntax

```js
new MouseEvent(type)
new MouseEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `click`, `dblclick`, `mousedown`, `mouseenter`, `mouseleave`, `mousemove`, `mouseout`, `mouseover`, or `mouseup`.
- `options` (optional)
    An object that, _in addition of the properties defined in `UIEvent()`_, can have the following properties:
    - `screenX` (optional)
        A number, defaulting to `0`, that is the horizontal position of the mouse event on the user's screen;
        setting this value doesn't move the mouse pointer.
    - `screenY` (optional)
        A number, defaulting to `0`, that is the vertical position of the mouse event on the user's screen;
        setting this value doesn't move the mouse pointer.
    - `clientX` (optional)
        A number, defaulting to `0`, that is the horizontal position of the mouse event on the client window of user's screen;
        setting this value doesn't move the mouse pointer.
    - `clientY` (optional)
        A number, defaulting to `0`, that is the vertical position of the mouse event on the client window of the user's screen;
        setting this value doesn't move the mouse pointer.
    - `ctrlKey` (optional)
        A boolean value indicating if the `ctrl` key was simultaneously pressed. It defaults to `false`.
    - `shiftKey` (optional)
        A boolean value indicating if the `shift` key was simultaneously pressed. It defaults to `false`.
    - `altKey` (optional)
        A boolean value indicating if the `alt` key was simultaneously pressed. It defaults to `false`.
    - `metaKey` (optional)
        A boolean value indicating if the `meta` key was simultaneously pressed. It defaults to `false`.
    - `button` (optional)
        A number, defaulting to `0`, that describes which button is pressed during events related to the press or release of a button:

        | Value | Meaning                                                         |
        | ----- | --------------------------------------------------------------- |
        | `0`   | Main button pressed (usually the left button) or un-initialized |
        | `1`   | Auxiliary button pressed (usually the middle button)            |
        | `2`   | Secondary button pressed (usually the right button)             |

    - `buttons` (optional)
        A number, defaulting to `0`, that describes which buttons are pressed when the event is launched:

        | Bit-field value | Meaning                                              |
        | --------------- | ---------------------------------------------------- |
        | `0`             | No button pressed                                    |
        | `1`             | Main button pressed (usually the left button)        |
        | `2`             | Secondary button pressed (usually the right button)  |
        | `4`             | Auxiliary button pressed (usually the middle button) |

    - `relatedTarget` (optional)
        An `EventTarget`, defaulting to `null` that is the element just left
        (in case of a `mouseenter` or `mouseover`)
        or is entering (in case of a `mouseout` or `mouseleave`).
    - `region` (non-standard) (optional)
        A string, defaulting to `null`, that is the ID of the hit region affected by the event.
        The absence of any affected hit region is represented with the `null` value.

    In some implementations, passing anything other than a number for the screen and
    client fields will throw a `TypeError`.

## See also

- `MouseEvent`, the interface of the objects it constructs.
