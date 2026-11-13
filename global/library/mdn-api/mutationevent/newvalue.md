---
title: "MutationEvent: newValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationevent/newvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationEvent: newValue property

The **`newValue`** read-only property of the `MutationEvent` interface returns a string. In `DOMAttrModified` events, it represents the new value of the `Attr` node. In `DOMCharacterDataModified` events, it contains the new value of the `CharacterData` node. In all other cases, returns the empty string (`""`).

## Value

A string.

## Examples

```js
element.addEventListener("DOMAttrModified", (event) => {
  console.log(event.newValue);
});
```
