---
title: "KeyboardEvent: isComposing property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/iscomposing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: isComposing property

The **`KeyboardEvent.isComposing`** read-only property returns
a boolean value indicating if the event is fired within a composition
session, i.e., after `compositionstart`
and before `compositionend`.

## Value

A boolean.

## Examples

```js
const kbdEvent = new KeyboardEvent("syntheticKey", false);
console.log(kbdEvent.isComposing); // return false
```

## See also

- `compositionstart` and `compositionend`
- `KeyboardEvent`
