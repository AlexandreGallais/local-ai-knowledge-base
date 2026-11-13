---
title: "CSSFontFeatureValuesMap: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: get() method

The **`get()`** method of the `CSSFontFeatureValuesMap` interface returns value corresponding to the key in this `CSSFontFeatureValuesMap`, or `undefined` if there is none.

## Syntax

```js
get(property)
```

### Parameters

- `key`
    The key of the value to return from the `CSSFontFeatureValuesMap` object.

### Return value

Returns `true` if an entry with the specified key <example-value> in the `CSSFontFeatureValuesMap` object; otherwise `false`.

## Examples

### Basic usage

The following example gets the values that match the `key`s in the `@swash` rule. This example is using `@swash` but also works with other feature value blocks.

#### CSS

```css
@font-feature-values "MonteCarlo" {
  @swash {
    swishy: 1;
    swashy: 2;
  }
}
```

#### JavaScript

```js
// get the rules
const myRule = document.styleSheets[0].cssRules[0];
console.log(myRule.swash.get("swishy")); // logs [1]
console.log(myRule.swash.get("swashy")); // logs [2]
```

## See also

- Map.prototype.get()
