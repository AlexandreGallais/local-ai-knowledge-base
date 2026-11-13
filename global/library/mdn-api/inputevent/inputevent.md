---
title: "InputEvent: InputEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputevent/inputevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputEvent: InputEvent() constructor

The **`InputEvent()`** constructor creates a new `InputEvent` object.

## Syntax

```js
new InputEvent(type)
new InputEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `beforeinput`, or `input`.
- `options` (optional)
    An object that, _in addition of the properties defined in `UIEvent()`_, can have the following properties:
    - `inputType` (optional)
        A string specifying the type of change for editable content
        such as, for example, inserting, deleting, or formatting text.
    - `data` (optional)
        A string containing characters to insert.
        This may be an empty string if the change doesn't insert text
        (such as when deleting characters, for example).
    - `isComposing` (optional)
        A boolean indicating that the event is part of a composition session,
        meaning it is after a `compositionstart` event but before a `compositionend` event. The default is `false`.

### Return value

A new `InputEvent` object.

## See also

- `InputEvent`, the interface of the objects it constructs.
