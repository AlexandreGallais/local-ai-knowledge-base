---
title: "CSSFontFeatureValuesRule: swash property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesrule/swash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesRule: swash property

The read-only **swash** property of the `CSSFontFeatureValuesRule` interface contains a `CSSFontFeatureValuesMap` object representing the developer-provided name and feature index for a variable font which supports `swash()`.

## Value

A `CSSFontFeatureValuesMap` object.

Although the `swash` property itself is read-only in the sense that you can't replace the `CSSFontFeatureValuesMap` object, you can still assign to the `swash` property directly. You can also modify the values of the `swash` using the `CSSFontFeatureValuesMap` instance methods.

## Example

### Basic usage

#### CSS

```css
@font-feature-values "MonteCarlo" {
  @swash {
    my-swashes: 1; /* Custom name for a particular set of swash alternate glyphs */
  }
}
```

#### JavaScript

```js
// look for the first stylesheet and the first cssRule in that sheet
const myRule = document.styleSheets[0].cssRules[0];
// check
if (myRule instanceof CSSFontFeatureValuesRule && myRule.swash.size) {
  // do something with the swash
}
```

## See also

- `@swash`
- `swash()` functional notation
- `CSSFontFeatureValuesMap`
