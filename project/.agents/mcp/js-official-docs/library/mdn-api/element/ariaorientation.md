---
title: "Element: ariaOrientation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariaorientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaOrientation property

The **`ariaOrientation`** property of the `Element` interface reflects the value of the `aria-orientation` attribute, which indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

## Value

A string with one of the following values:

- `"horizontal"`
    The element is horizontal.
- `"vertical"`
    The element is vertical.
- `"undefined"`
    The element's orientation is unknown.

## Examples

In this example the `aria-orientation` attribute on the element with an ID of `handle_zoomSlider` is set to `"vertical"`. Using `ariaOrientation` we update the value to `"horizontal"`.

```html
<div
  id="handle_zoomSlider"
  role="slider"
  aria-orientation="vertical"
  aria-valuemin="0"
  aria-valuemax="17"
  aria-valuenow="14"
  tabindex="0">
  <span>11</span>
</div>
```

```js
let el = document.getElementById("handle_zoomSlider");
console.log(el.ariaOrientation); // "vertical"
el.ariaOrientation = "horizontal";
console.log(el.ariaOrientation); // "horizontal"
```
