---
title: "Element: ariaLevel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/arialevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaLevel property

The **`ariaLevel`** property of the `Element` interface reflects the value of the `aria-level` attribute, which defines the hierarchical level of an element within a structure.

> **Note:**
> Where possible use an HTML `<h1>` or other correct heading level as these have built-in semantics and do not require ARIA attributes.

## Value

A string containing an integer.

## Examples

In this example the `aria-level` attribute on the element with an ID of `main-heading` is set to "1". Using `ariaLevel` we update the value to "2".

```html
<div role="heading" id="main-heading" aria-level="1">
  This is a main page heading
</div>
```

```js
let el = document.getElementById("main-heading");
console.log(el.ariaLevel); // "1"
el.ariaLevel = "2";
console.log(el.ariaLevel); // "2"
```

## See also

- ARIA: heading role
