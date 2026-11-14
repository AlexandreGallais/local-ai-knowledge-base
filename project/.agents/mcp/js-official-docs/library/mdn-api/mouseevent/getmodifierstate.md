---
title: "MouseEvent: getModifierState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/getmodifierstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: getModifierState() method

The **`MouseEvent.getModifierState()`** method returns the current state of the specified modifier key: `true` if the modifier is active (i.e., the modifier key is pressed or locked), otherwise, `false`.

See `KeyboardEvent.getModifierState()` for details.

## Syntax

```js
getModifierState(key)
```

### Parameters

- `key`
    A modifier key value.
    The value must be one of the `KeyboardEvent.key` values which represent modifier keys or `"Accel"` (deprecated).
    This is case-sensitive.

### Return value

A boolean value.

## See also

- The `MouseEvent` this method belongs to.
- `KeyboardEvent.getModifierState`
