---
title: "Element: ariaDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariadescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaDescription property

The **`ariaDescription`** property of the `Element` interface reflects the value of the `aria-description` attribute, which defines a string value that describes or annotates the current element.

## Value

A string.

## Examples

In this example the `aria-description` attribute on the element with an ID of `close-button` is set to the string "A longer description of the function of this element". Using `ariaDescription` we can update the value.

```html
<button
  aria-label="Close"
  aria-description="A longer description of the function of this element"
  id="close-button">
  X
</button>
```

```js
let el = document.getElementById("close-button");
console.log(el.ariaDescription); // "A longer description of the function of this element"
el.ariaDescription = "A different description";
console.log(el.ariaDescription); // "A different description"
```
