---
title: "CSSFontFeatureValuesMap: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: keys() method

The **`keys()`** method of `CSSFontFeatureValuesMap` instances returns a new map iterator object that contains the `[key, value]` pairs for each declaration in this `CSSFontFeatureValuesMap` in insertion order.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Basic usage

The following example assigns the keys to the `swashKeys` variable and then logs the first two values. This example is using `@swash` but also works with other feature value blocks.

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
// get the keys of swash
const swashKeys = myRule.swash.keys();
console.log(swashKeys.next().value); // logs "swishy"
console.log(swashKeys.next().value); // logs "swashy"
```

## See also

- Map.prototype.keys()
