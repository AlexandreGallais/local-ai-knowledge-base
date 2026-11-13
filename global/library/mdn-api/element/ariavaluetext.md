---
title: "Element: ariaValueText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariavaluetext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaValueText property

The **`ariaValueText`** property of the `Element` interface reflects the value of the `aria-valuetext` attribute, which defines the human-readable text alternative of aria-valuenow for a range widget.

## Value

A string.

## Examples

In this example the `aria-valuetext` attribute on the element with an ID of `slider` is set to "Sunday" to give a human-readable value for the range. Using `ariaValueText` we update the value to "Monday".

```html
<div
  id="slider"
  role="slider"
  aria-valuenow="1"
  aria-valuemin="1"
  aria-valuemax="7"
  aria-valuetext="Sunday"></div>
```

```js
let el = document.getElementById("slider");
console.log(el.ariaValueText); // Sunday
el.ariaValueText = "Monday";
console.log(el.ariaValueText); // Monday
```
