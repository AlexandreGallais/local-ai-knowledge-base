---
title: "HTMLSlotElement: slotchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlslotelement/slotchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSlotElement: slotchange event

The **`slotchange`** event is fired on an `HTMLSlotElement` instance (`<slot>` element) when the node(s) contained in that slot change.

> **Note:**
> The `slotchange` event doesn't fire if the children of a slotted node change — only if you change (e.g., add or delete) the actual nodes themselves.

In order to trigger a **slotchange** event, one has to set or remove the `slot` attribute.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("slotchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onslotchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
element.setAttribute("slot", slotName);
// element.assignedSlot = $slot
element.removeAttribute("slot");
// element.assignedSlot = null
```

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

Here we grab references to all the `<slot>`s, then add a `slotchange` event listener to the template's second slot — which is the one which has its contents changed in the example.

Every time the element inserted in the slot changes, we log a report to the console saying which slot has changed, and what the new node inside the slot is.

## See also

- `HTMLSlotElement`
