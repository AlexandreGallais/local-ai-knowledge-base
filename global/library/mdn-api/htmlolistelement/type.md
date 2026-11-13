---
title: "HTMLOListElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlolistelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOListElement: type property

The **`type`** property of the `HTMLOListElement` interface indicates the kind of marker to be used to display ordered list.

It reflects the `type` attribute of the `` element.

> **Note:**
> The `type` can be defined in CSS with the `list-style-type` property. The `list-style-type` property provides many more values.

## Value

A string representing the type.

Its possible values are listed in the attribute marker types section.

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
// if type is not specified then return empty string
console.log(olElement.type); // Output: ""
olElement.type = "i"; // Using roman numeral type
console.log(olElement.type); // Output: "i"
```
