---
title: "HTMLSlotElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlslotelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSlotElement

The **`HTMLSlotElement`** interface of the Shadow DOM API enables access to the name and assigned nodes of an HTML `<slot>` element.

## Instance properties

_Also inherits properties from its parent interface, `HTMLElement`._

- `HTMLSlotElement.name`
    A string used to get and set the slot's name.

## Instance methods

_Also inherits methods from its parent interface, `HTMLElement`._

- `HTMLSlotElement.assign()`
    Sets the manually assigned nodes for this slot to the given nodes.
- `HTMLSlotElement.assignedNodes()`
    Returns a sequence of the nodes assigned to this slot. If the `flatten` option is set to `true`, it returns a sequence of both the nodes assigned to this slot, and the nodes assigned to any other slots that are descendants of this slot. If no assigned nodes are found, it returns the slot's fallback content.
- `HTMLSlotElement.assignedElements()`
    Returns a sequence of the elements assigned to this slot (and no other nodes). If the `flatten` option is set to `true`, it returns a sequence of both the elements assigned to this slot, and the elements assigned to any other slots that are descendants of this slot. If no assigned elements are found, it returns the slot's fallback content.

## Events

_Also inherits events from its parent interface, `HTMLElement`._

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `slotchange`
    Fired on an `HTMLSlotElement` instance (`<slot>` element) when the node(s) contained in that slot change.

## Examples

The following snippet is taken from our slotchange example (see it live also).

```js
let slots = this.shadowRoot.querySelectorAll("slot");
slots[1].addEventListener("slotchange", (e) => {
  let nodes = slots[1].assignedNodes();
  console.log(
    `Element in Slot "${slots[1].name}" changed to "${nodes[0].outerHTML}".`,
  );
});
```

Here we grab references to all the slots, then add a slotchange event listener to the 2nd slot in the template — which is the one that keeps having its contents changed in the example.

Every time the element inserted in the slot changes, we log a report to the console saying which slot has changed, and what the new node inside the slot is.
