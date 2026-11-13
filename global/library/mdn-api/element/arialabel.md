---
title: "Element: ariaLabel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/arialabel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaLabel property

The **`ariaLabel`** property of the `Element` interface reflects the value of the `aria-label` attribute, which defines a string value that labels the current element.

## Value

A string or `null`.

## Examples

In this example the `aria-label` attribute on the element with an ID of `close-button` is set to "Close". Using `ariaLabel` we update the value to "Close dialog".

```html
<button aria-label="Close" id="close-button">X</button>
```

```js
let el = document.getElementById("close-button");
console.log(el.ariaLabel); // "Close"
el.ariaLabel = "Close dialog";
console.log(el.ariaLabel); // "Close dialog"
```
