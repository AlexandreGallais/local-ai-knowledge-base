---
title: "InputEvent: isComposing property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputevent/iscomposing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputEvent: isComposing property

The **`InputEvent.isComposing`** read-only property returns a
boolean value indicating if the event is fired after
`compositionstart` and before `compositionend`.

## Value

A boolean.

## Examples

```js
const inputEvent = new InputEvent("syntheticInput", false);
console.log(inputEvent.isComposing); // return false
```

## See also

- `compositionstart` and `compositionend`
- `InputEvent`
