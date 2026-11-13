---
title: "HTMLSlotElement: assignedElements() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlslotelement/assignedelements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSlotElement: assignedElements() method

The **`assignedElements()`** method of the `HTMLSlotElement`
interface returns a sequence of the elements assigned to this slot (and no
other nodes).

If the `flatten` option is set to `true`, it returns a sequence of both the elements assigned to this slot and the elements assigned to any other slots that are descendants of this slot. If no assigned elements are found, it returns the slot's fallback content.

## Syntax

```js
assignedElements()
assignedElements(options)
```

### Parameters

- `options` (optional)
    An object that sets options for the nodes to be returned. The available options are:
    - `flatten`
        A boolean value indicating whether to return the
        assigned elements of any available child `<slot>` elements
        (`true`) or not (`false`). Defaults to `false`.

### Return value

An array of elements.

## Examples

```js
let slots = this.shadowRoot.querySelector("slot");
let elements = slots.assignedElements({ flatten: true });
```
