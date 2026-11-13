---
title: "MathMLElement: dataset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlelement/dataset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLElement: dataset property

The **`dataset`** read-only property of the `MathMLElement` interface provides read/write access to custom data attributes (`data-*`) on elements. It exposes a map of strings (`DOMStringMap`) with an entry for each `data-*` attribute.

The `dataset` property itself can be read, but not directly written. Instead, all writes must be to the individual properties within the `dataset`, which in turn represent the data attributes.

## Value

A `DOMStringMap`.

## Examples

```html
<div>
  <math>
    <msup id="equation" data-value="-1" data-equation="euler">
      <mi>e</mi>
      <mrow><mi>i</mi> <mi>π</mi></mrow>
    </msup>
    <mo>+</mo>
    <mn>1</mn>
    <mo>=</mo>
    <mn>0</mn>
  </math>
</div>
```

```js
const el = document.querySelector("#equation");

console.log(el.dataset.value); // "-1"
console.log(el.dataset.equation); // "euler"
```

## See also

- `HTMLElement.dataset`
- `data-*`
- Using data attributes
