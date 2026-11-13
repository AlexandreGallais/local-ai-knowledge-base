---
title: "HTMLElement: spellcheck property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/spellcheck/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: spellcheck property

The **`spellcheck`** property of the `HTMLElement` interface represents a boolean value that controls the spell-checking hint. It is available on all HTML elements, though it doesn't affect all of them.

It reflects the value of the `spellcheck` HTML global attribute.

## Value

A boolean value that is `true` if the spelling and grammar of the text content in the element may be checked, `false` otherwise.

## Examples

The following example shows how to control the spell-checking hint via script:

```html
<div>
  <span id="sc-label">The spelling and grammar may be checked: </span>
  <span id="sc-element" contenteditable="true" spellcheck="true">test</span>
</div>
<input id="sc-controller" type="checkbox" checked />Enable spelling and grammar
check
```

```js
const label = document.getElementById("sc-label");
const element = document.getElementById("sc-element");
const controller = document.getElementById("sc-controller");

controller.addEventListener("change", (e) => {
  if (controller.checked) {
    element.spellcheck = true;
    label.innerText = "The spelling and grammar may be checked: ";
  } else {
    element.spellcheck = false;
    label.innerText = "The spelling and grammar may not be checked: ";
  }
});
```

Note that you must enable the browser setting to check spelling and grammar.

## See also

- `spellcheck` HTML global attribute
