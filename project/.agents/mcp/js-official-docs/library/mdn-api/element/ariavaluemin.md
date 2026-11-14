---
title: "Element: ariaValueMin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariavaluemin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaValueMin property

The **`ariaValueMin`** property of the `Element` interface reflects the value of the `aria-valuemin` attribute, which defines the minimum allowed value for a range widget.

## Value

A string which contains a number.

## Examples

In this example the `aria-valuemin` attribute on the element with an ID of `slider` is set to "1". Using `ariaValueMin` we update the value to "2".

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
console.log(el.ariaValueMin); // 1
el.ariaValueMin = "2";
console.log(el.ariaValueMin); // 2
```
