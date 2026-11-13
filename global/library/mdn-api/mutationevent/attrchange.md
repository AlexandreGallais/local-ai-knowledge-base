---
title: "MutationEvent: attrChange property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationevent/attrchange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationEvent: attrChange property

The **`attrChange`** read-only property of the `MutationEvent` interface returns a number indicating what kind of change triggered the `DOMAttrModified` event. The three possible values are `MODIFICATION` (`1`), `ADDITION` (`2`) or `REMOVAL` (`3`). It has no meaning for other events and is then set to `0`.

## Value

An integer: `0`, `1` (`MODIFICATION`), `2` (`ADDITION`), or `3` (`REMOVAL`).

## Examples

```js
element.addEventListener("DOMAttrModified", (event) => {
  console.log(event.attrChange);
});
```
