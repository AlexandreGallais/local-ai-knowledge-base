---
title: "StyleSheetList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheetlist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheetList: length property

The **`length`** read-only property of the `StyleSheetList` interface returns the number of `CSSStyleSheet` objects in the collection.

## Value

An integer indicating the number of items in the collection.

## Examples

In the following example, `length` is printed to the console, and also used in a for loop to print each individual `CSSStyleSheet` object to the console.

```js
let length = document.styleSheets.length;
console.log(length);

for (let i = 0; i < length; i++) {
  console.log(document.styleSheets[i]);
}
```
