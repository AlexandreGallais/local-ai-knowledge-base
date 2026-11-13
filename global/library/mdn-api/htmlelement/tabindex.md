---
title: "HTMLElement: tabIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/tabindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: tabIndex property

The **`tabIndex`** property of the
`HTMLElement` interface represents the tab order of the current element.

Tab order is as follows:

1. Elements with a positive `tabIndex`. Elements that have identical
   `tabIndex` values should be navigated in the order they appear. Navigation
   proceeds from the lowest `tabIndex` to the highest `tabIndex`.
2. Elements that do not support the `tabIndex` attribute or support it and
   assign `tabIndex` to `0`, in the order they appear.

Elements that are disabled do not participate in the tabbing order.

Values don't need to be sequential, nor must they begin with any particular value. They
may even be negative, though each browser trims very large values.

## Value

An integer.

## Examples

```js
const b1 = document.getElementById("button1");

b1.tabIndex = 1;
```

## See also

- Accessibility of keyboard-navigable JavaScript widgets
- The HTML
  `tabindex`
  global attribute.
