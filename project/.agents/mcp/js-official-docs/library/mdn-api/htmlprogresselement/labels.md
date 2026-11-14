---
title: "HTMLProgressElement: labels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlprogresselement/labels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLProgressElement: labels property

The **`HTMLProgressElement.labels`** read-only property returns
a `NodeList` of the `` elements associated with the
`<progress>` element.

## Value

A `NodeList` containing the `` elements associated
with the `<progress>` element.

## Examples

### HTML

```html
<label id="label1" for="test">Label 1</label>
<progress id="test" value="70" max="100">70%</progress>
<label id="label2" for="test">Label 2</label>
```

### JavaScript

```js
const progress = document.getElementById("test");
for (const label of progress.labels) {
  console.log(label.textContent); // "Label 1" and "Label 2"
}
```
