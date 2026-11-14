---
title: "Element: ariaSelected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariaselected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaSelected property

The **`ariaSelected`** property of the `Element` interface reflects the value of the `aria-selected` attribute, which indicates the current "selected" state of elements that have a selected state.

## Value

A string with one of the following values:

- `"true"`
    The item is selected.
- `"false"`
    The item is not selected.
- `"undefined"`
    The item is not selectable.

## Examples

In this example the `aria-selected` attribute on the element with an ID of `tab-id` is set to "true". Using `ariaSelected` we update the value to "false".

```html
<button role="tab" aria-selected="true" aria-controls="tabpanel-id" id="tab-id">
  Tab label
</button>
```

```js
let el = document.getElementById("tab-id");
console.log(el.ariaSelected); // true
el.ariaSelected = "false";
console.log(el.ariaSelected); // false
```

## See also

- ARIA: tab role
