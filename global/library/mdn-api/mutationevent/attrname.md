---
title: "MutationEvent: attrName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationevent/attrname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationEvent: attrName property

The **`attrName`** read-only property of the `MutationEvent` interface returns a string with the name of the node affected by the `DOMAttrModified` event. It has no meaning for other events and is then set to the empty string (`""`).

## Value

A string.

## Examples

```js
element.addEventListener("DOMAttrModified", (event) => {
  console.log(event.attrName);
});
```
