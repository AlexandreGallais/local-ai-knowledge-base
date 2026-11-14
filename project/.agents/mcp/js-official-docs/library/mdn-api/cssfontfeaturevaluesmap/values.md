---
title: "CSSFontFeatureValuesMap: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: values() method

The **`values()`** method of `CSSFontFeatureValuesMap` instances returns a new map iterator object that contains the `[key, value]` pairs for each declaration in this `CSSFontFeatureValuesMap` in insertion order.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Basic usage

The following example assigns the values to the `swashValues` variable and then logs the first two values. This example is using `@swash` but also works with other feature value blocks.

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
// get the values of swash
const swashValues = myRule.swash.values();
console.log(swashValues.next().value); // logs [1]
console.log(swashValues.next().value); // logs [2]
```

## See also

- Map.prototype.values()
