---
title: "ShadowRoot: slotAssignment property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/slotassignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: slotAssignment property

The read-only **`slotAssignment`** property of the `ShadowRoot` interface returns the _slot assignment mode_ for the shadow DOM tree. Nodes are either automatically assigned based on name matching (`named`) or manually assigned (`manual`).

The value of this property is defined using the `slotAssignment` option when calling `Element.attachShadow()`, or using the `shadowrootslotassignment` attribute on a `<template>` element when declaratively creating a shadow root.

## Value

A string that can be one of:

- `named`
    Elements are automatically assigned to `<slot>` elements within this shadow root.
    Any top-level children of the host with a `slot` attribute that matches the `name` attribute of a `<slot>` within this shadow root will be assigned to that slot.
    Any top-level children of the host with no `slot` attribute will be assigned to a `<slot>` with no `name` attribute (the "default slot"), if one is present.
- `manual`
    Elements are not automatically assigned to `<slot>` elements.
    Instead, they must be manually assigned with `HTMLSlotElement.assign()`.

## Examples

### Basic usage

In the example below, the `assign()` method is used to display the correct tab in a tabbed application.
The function is called and passed the panel to show, which is then assigned to the slot.
We test if the `slotAssignment` is `named` to prevent an exception from being raised when `HTMLSlotElement.assign()` is called.

```js
function UpdateDisplayTab(elem, tabIdx) {
  const shadow = elem.shadowRoot;

  // This test is usually not needed, but can be useful when debugging
  if (shadow.slotAssignment === "named") {
    console.error(
      "Trying to manually assign a slot on an automatically-assigned (named) slot",
    );
  }
  const slot = shadow.querySelector("slot");
  const panels = elem.querySelectorAll("tab-panel");
  if (panels.length && tabIdx && tabIdx <= panels.length) {
    slot.assign(panels[tabIdx - 1]);
  } else {
    slot.assign();
  }
}
```

## See also

- `Element.attachShadow()`
- `HTMLSlotElement.assign()`
- `shadowrootslotassignment` attribute of the `<template>` element
- `HTMLTemplateElement.shadowRootSlotAssignment`
