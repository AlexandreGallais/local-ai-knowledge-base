---
title: "CSSFontFeatureValuesMap: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: entries() method

The **`entries()`** method of `CSSFontFeatureValuesMap` instances returns a new map iterator object that contains the `[key, value]` pairs for each declaration in this `CSSFontFeatureValuesMap` in insertion order.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Basic usage

The following example assigns the entries to the `swashes` variable and then logs the first two values. This example is using `@swash` but also works with other feature value blocks.

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
// get the entries of swash
const swashes = myRule.swash.entries();
console.log(swashes.next().value); // logs ["swishy", [1]]
console.log(swashes.next().value); // logs ["swashy", [2]]
```

## See also

- Map.prototype.entries()
