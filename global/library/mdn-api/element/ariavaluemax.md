---
title: "Element: ariaValueMax property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariavaluemax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaValueMax property

The **`ariaValueMax`** property of the `Element` interface reflects the value of the `aria-valuemax` attribute, which defines the maximum allowed value for a range widget.

## Value

A string which contains a number.

## Examples

In this example the `aria-valuemax` attribute on the element with an ID of `slider` is set to "7". Using `ariaValueMax` we update the value to "6".

```html
<div
  role="slider"
  aria-valuenow="1"
  aria-valuemin="1"
  aria-valuemax="7"
  aria-valuetext="Sunday"></div>
```

```js
let el = document.getElementById("slider");
console.log(el.ariaValueMax); // 7
el.ariaValueMax = "6";
console.log(el.ariaValueMax); // 6
```
