---
title: "StyleSheetList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheetlist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheetList: item() method

The **`item()`** method of the `StyleSheetList` interface returns a single `CSSStyleSheet` object.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    An integer which is the index of the item in the collection to be returned.

### Return value

A `CSSStyleSheet` object, or `null` if one does not exist for this index.

## Examples

In the following example, a for loop prints each individual `CSSStyleSheet` object to the console, by calling `item` with the value of `i`.

```js
let list = document.styleSheets;

for (let i = 0; i < list.length; i++) {
  console.log(list.item(i));
}
```
