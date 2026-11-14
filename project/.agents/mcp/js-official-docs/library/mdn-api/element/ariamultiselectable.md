---
title: "Element: ariaMultiSelectable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariamultiselectable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaMultiSelectable property

The **`ariaMultiSelectable`** property of the `Element` interface reflects the value of the `aria-multiselectable` attribute, which indicates that the user may select more than one item from the current selectable descendants.

> **Note:**
> Where possible use an HTML `<select>` element as this has built-in semantics and does not require ARIA attributes.

## Value

A string with one of the following values:

- `"true"`
    More than one item may be selected at a time.
- `"false"`
    Only one item may be selected.

## Examples

In this example the `aria-multiselectable` attribute on the element with an ID of `listbox1` is set to "true" indicating that this input accepts multiple selected items. Using `ariaMultiSelectable` we update the value to "false".

```html
<div
  role="listbox"
  tabindex="0"
  id="listbox1"
  aria-multiselectable="true"
  aria-labelledby="listbox1label"
  aria-activedescendant="listbox1-1">
  <div role="option" id="listbox1-1" class="selected" aria-selected="true">
    Green
  </div>
  <div role="option" id="listbox1-2">Orange</div>
  <div role="option" id="listbox1-3">Red</div>
</div>
```

```js
let el = document.getElementById("listbox1");
console.log(el.ariaMultiSelectable); // "true"
el.ariaMultiSelectable = "false";
console.log(el.ariaMultiSelectable); // "false"
```

## See also

- ARIA: listbox role
