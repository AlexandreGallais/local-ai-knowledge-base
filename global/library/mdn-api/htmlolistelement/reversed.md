---
title: "HTMLOListElement: reversed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlolistelement/reversed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOListElement: reversed property

The **`reversed`** property of the `HTMLOListElement` interface indicates order of a list.

It reflects the `reversed` attribute of the `` element.

## Value

A `boolean` value. If `true`, it indicates that the list is a descending list (..., 3, 2, 1).

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
console.log(olElement.reversed); // Output: "false"
olElement.reversed = "true";
console.log(olElement.reversed); // Output: "true"
```
