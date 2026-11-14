---
title: "CSSFontFeatureValuesRule: styleset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesrule/styleset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesRule: styleset property

The read-only **styleset** property of the `CSSFontFeatureValuesRule` interface contains a `CSSFontFeatureValuesMap` object representing the user-defined-ident and feature index for a variable font which supports `styleset()`.

## Value

A `CSSFontFeatureValuesMap` object.

Although the `styleset` property itself is read-only in the sense that you can't replace the `CSSFontFeatureValuesMap` object, you can still assign to the `styleset` property directly. You can also modify the values of the `styleset` using the `CSSFontFeatureValuesMap` instance methods.

## Example

### Basic usage

#### CSS

```css
@font-feature-values "MonteCarlo" {
  @styleset {
    my-styleset: 1;
  }
}
```

#### JavaScript

```js
// look for the first stylesheet and the first cssRule in that sheet
const myRule = document.styleSheets[0].cssRules[0];
// check
if (myRule instanceof CSSFontFeatureValuesRule && myRule.styleset.size) {
  // do something with the styleset
}
```

## See also

- `@styleset`
- `styleset()` functional notation
- `CSSFontFeatureValuesMap`
