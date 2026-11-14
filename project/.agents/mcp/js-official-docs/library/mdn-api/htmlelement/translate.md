---
title: "HTMLElement: translate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/translate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: translate property

The **`translate`** property of the `HTMLElement` interface indicates whether an element's attribute values and the values of its `Text` node children are to be translated when the page is localized, or whether to leave them unchanged.

It reflects the value of the `translate` HTML global attribute.

## Value

A boolean value that is `true` if an element's attribute values and the values of its `Text` node children are to be translated when the page is localized, `false` otherwise.

## Examples

The following example shows how to enable or disable translation via script:

```html
<div>
  <span>The content may always be translated: </span>
  <span translate="yes">El contenido será traducido</span>
</div>
<div>
  <span id="translate-label">The content may be translated:</span>
  <span id="translate-element" translate="no">
    El contenido puede ser traducido.
  </span>
</div>
<input id="translate-controller" type="checkbox" /> Enable translation
```

```js
const label = document.getElementById("translate-label");
const element = document.getElementById("translate-element");
const controller = document.getElementById("translate-controller");

controller.addEventListener("change", (e) => {
  if (controller.checked) {
    element.translate = true;
    label.innerText = "The content may be translated:";
  } else {
    element.translate = false;
    label.innerText = "The content may not be translated:";
  }
});
```

## See also

- `translate` HTML global attribute
