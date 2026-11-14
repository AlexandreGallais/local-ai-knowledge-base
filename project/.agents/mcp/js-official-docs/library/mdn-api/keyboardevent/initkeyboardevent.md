---
title: "KeyboardEvent: initKeyboardEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/initkeyboardevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: initKeyboardEvent() method

The **`KeyboardEvent.initKeyboardEvent()`** method initializes
the attributes of a keyboard event object. This method was introduced in draft of DOM
Level 3 Events, but deprecated in newer draft. Gecko won't support this feature since
implementing this method as experimental broke existing web apps (see Firefox bug 999645).
Web applications should use constructor instead of this if it's available.

## Syntax

```js
initKeyboardEvent(type, canBubble, cancelable,
                  view, key, location, ctrlKey,
                  altKey, shiftKey, metaKey)
```

### Parameters

- `type`
    The type of keyboard event; browsers always set it to one of `keydown`,
    `keypress`, or `keyup`.
- `canBubble` (optional)
    Indicates whether or not the event can bubble. Defaults to `false`.
- `cancelable` (optional)
    Indicates whether or not the event can be canceled. Defaults to `false`.
- `view` (optional)
    The WindowProxy it is associated to. Defaults to `null`.
- `key` (optional)
    The value of the key attribute. Defaults to `""`.
- `location` (optional)
    The value of the location attribute. Defaults to `0`.
- `ctrlKey` (optional)
    Indicates whether the control key <example-value> is active. Defaults to `false`.
- `altKey` (optional)
    Indicates whether the alt key <example-value> is active. Defaults to `false`.
- `shiftKey` (optional)
    Indicates whether the shift key <example-value> is active. Defaults to `false`.
- `metaKey` (optional)
    Indicates whether the meta key <example-value> is active. Defaults to `false`.

### Return value

None (`undefined`).

## Specifications

The `KeyboardEvent` interface specification went through numerous draft versions, first under DOM Events Level 2 where it was dropped as no consensus arose, then under DOM Events Level 3. This led to the implementation of non-standard initialization methods, the early DOM Events Level 2 version, `KeyboardEvent.initKeyEvent()` by Gecko browsers and the early DOM Events Level 3 version, `KeyboardEvent.initKeyboardEvent()` by others. Both have been superseded by the modern usage of a constructor: `KeyboardEvent()`.
