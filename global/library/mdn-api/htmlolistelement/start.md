---
title: "HTMLOListElement: start property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlolistelement/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOListElement: start property

The **`start`** property of the `HTMLOListElement` interface indicates starting value of the ordered list, with default value of 1.

It reflects the `start` attribute of the `` element.

> **Note:**
> The `start` property value is independent of the `HTMLOListElement.type` property; it is always numeric, even when type is letters or Roman numerals.

## Value

A `long` value.

## Examples

### HTML

```html
<ol id="order-list">
  <li>Fee</li>
  <li>Fi</li>
  <li>Fo</li>
  <li>Fum</li>
</ol>
```

### JavaScript

```js
const olElement = document.querySelector("#order-list");
console.log(olElement.start); // Output: "1"
olElement.start = "11";
console.log(olElement.start); // Output: "11"
```
