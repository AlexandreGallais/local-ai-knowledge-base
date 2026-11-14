---
title: "SVGElement: dataset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgelement/dataset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGElement: dataset property

The **`dataset`** read-only property of the `SVGElement` interface provides read/write access to custom data attributes (`data-*`) on elements. It exposes a map of strings (`DOMStringMap`) with an entry for each `data-*` attribute.

For more information on the behavior of `dataset`, see `HTMLElement.dataset`.

## Value

A `DOMStringMap`.

## Examples

```html
<div>
  <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="20" id="user" data-id="1234567890" data-user="carinaanand">
      Carina Anand
    </text>
  </svg>
</div>
```

```js
const el = document.querySelector("#user");

console.log(el.dataset.id); // "1234567890"
```

## See also

- `data-*` SVG attributes
- Using data attributes
