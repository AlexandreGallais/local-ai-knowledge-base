---
title: "CSSFontFeatureValuesMap: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: size property

The **`size`** read-only property of the `CSSFontFeatureValuesMap` interface returns a positive integer containing the size of the `CSSFontFeatureValuesMap` object.

## Value

A positive integer.

## Examples

### Basic usage

The following example outputs an integer of the number of the declarations within the `@swash` feature block. This example is using `@swash` but also works with other feature value blocks.

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
console.log(myRule.swash.size); // logs 2
```
