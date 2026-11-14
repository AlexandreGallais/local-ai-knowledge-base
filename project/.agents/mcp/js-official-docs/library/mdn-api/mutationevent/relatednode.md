---
title: "MutationEvent: relatedNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationevent/relatednode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationEvent: relatedNode property

The **`relatedNode`** read-only property of the `MutationEvent` interface returns a string indicating the node related to the event, like the changed node inside the subtree for `DOMSubtreeModified`.

## Value

A string.

## Examples

```js
element.addEventListener("DOMSubtreeModified", (event) => {
  console.log(event.relatedNode);
});
```
