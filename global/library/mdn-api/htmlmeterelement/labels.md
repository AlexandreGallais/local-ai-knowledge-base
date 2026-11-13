---
title: "HTMLMeterElement: labels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmeterelement/labels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMeterElement: labels property

The **`HTMLMeterElement.labels`** read-only property returns a
`NodeList` of the `` elements associated with the
`<meter>` element.

## Value

A `NodeList` containing the `` elements associated
with the `<meter>` element.

## Examples

### HTML

```html
<label id="label1" for="test">Label 1</label>
<meter id="test" min="0" max="100" value="70">70</meter>
<label id="label2" for="test">Label 2</label>
```

### JavaScript

```js
const meter = document.getElementById("test");
for (const label of meter.labels) {
  console.log(label.textContent); // "Label 1" and "Label 2"
}
```
