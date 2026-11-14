---
title: "KeyboardEvent: KeyboardEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/keyboardevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: KeyboardEvent() constructor

The **`KeyboardEvent()`** constructor creates a new
`KeyboardEvent` object.

## Syntax

```js
new KeyboardEvent(type)
new KeyboardEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `keydown`, `keyup`, or `keypress`.
- `options` (optional)
    An object that, _in addition of the properties defined in `UIEvent()`_, can have the following properties:
    - `key` (optional)
        A string, defaulting to `""`, that sets the value of `KeyboardEvent.key`.
    - `code` (optional)
        A string, defaulting to `""`, that sets the value of `KeyboardEvent.code`.
    - `location` (optional)
        A number, defaulting to `0`, that sets the value of `KeyboardEvent.location`.
    - `repeat` (optional)
        A boolean value, defaulting to `false`, that sets the value of `KeyboardEvent.repeat`.
    - `isComposing` (optional)
        A boolean value, defaulting to `false`, that sets the value of `KeyboardEvent.isComposing`.
    - `charCode` (optional) (deprecated)
        A number, defaulting to `0`, that sets the value of the deprecated `KeyboardEvent.charCode`.
    - `keyCode` (optional) (deprecated)
        A number, defaulting to `0`, that sets the value of the deprecated `KeyboardEvent.keyCode`.
    - `which` (optional) (deprecated)
        A number, defaulting to `0`, that sets the value of the deprecated `UIEvent.which`.
    - `ctrlKey` (optional)
        A boolean value, defaulting to `false`, that sets the value of `KeyboardEvent.ctrlKey`.
    - `shiftKey` (optional)
        A boolean value, defaulting to `false`, that sets the value of `KeyboardEvent.shiftKey`.
    - `altKey` (optional)
        A boolean value, defaulting to `false`, that sets the value of `KeyboardEvent.altKey`.
    - `metaKey` (optional)
        A boolean value, defaulting to `false`, that sets the value of `KeyboardEvent.metaKey`.

### Return value

A new `KeyboardEvent` object.

## See also

- `KeyboardEvent`, the interface of the objects it constructs.
