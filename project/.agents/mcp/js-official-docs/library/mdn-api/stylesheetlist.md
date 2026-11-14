---
title: "StyleSheetList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheetlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheetList

The `StyleSheetList` interface represents a list of `CSSStyleSheet` objects. An instance of this object can be returned by `Document.styleSheets`.

It is an array-like object but can't be iterated over using `Array` methods. However it can be iterated over in a standard `for` loop over its indices, or converted to an `Array`.

> **Note:**
> Typically list interfaces like `StyleSheetList` wrap around `Array` types, so you can use `Array` methods on them.
> This is not the case here for historical reasons.
> However, you can convert `StyleSheetList` to an `Array` in order to use those methods (see the example below).

## Instance properties

- `StyleSheetList.length` (read-only)
    Returns the number of `CSSStyleSheet` objects in the collection.

## Instance methods

- `StyleSheetList.item()`
    Returns the `CSSStyleSheet` object at the index passed in, or `null` if no item exists for that index.

## Examples

### Get CSSStyleSheet objects with for loop

```js
for (const styleSheet of document.styleSheets) {
  console.log(styleSheet); // A CSSStyleSheet object
}
```

### Get all CSS rules for the document using Array methods

```js
const allCSS = [...document.styleSheets]
  .map((styleSheet) => {
    try {
      return [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
    } catch (e) {
      console.log(
        "Access to stylesheet %s is denied. Ignoring…",
        styleSheet.href,
      );
      return undefined;
    }
  })
  .filter(Boolean)
  .join("\n");
```
