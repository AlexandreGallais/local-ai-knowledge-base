---
title: "CSSFontFeatureValuesRule: stylistic property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesrule/stylistic/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesRule: stylistic property

The read-only **stylistic** property of the `CSSFontFeatureValuesRule` interface contains a `CSSFontFeatureValuesMap` object representing the user-defined-ident and feature index for a variable font which supports `stylistic()`.

## Value

A `CSSFontFeatureValuesMap` object.

Although the `stylistic` property itself is read-only in the sense that you can't replace the `CSSFontFeatureValuesMap` object, you can still assign to the `stylistic` property directly. You can also modify the values of the `stylistic` using the `CSSFontFeatureValuesMap` instance methods.

## Example

### Basic usage

#### CSS

```css
@font-feature-values "MonteCarlo" {
  @stylistic {
    my-stylistics: 1;
  }
}
```

#### JavaScript

```js
// look for the first stylesheet and the first cssRule in that sheet
const myRule = document.styleSheets[0].cssRules[0];
// check
if (myRule instanceof CSSFontFeatureValuesRule && myRule.stylistic.size) {
  // do something with the stylistic
}
```

## See also

- `@stylistic`
- `stylistic()` functional notation
- `CSSFontFeatureValuesMap`
