---
title: "CSSFontFeatureValuesMap: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: clear() method

The **`clear()`** method of the `CSSFontFeatureValuesMap` interface removes all declarations in the `CSSFontFeatureValuesMap`.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Basic usage

The following example removes all the declarations within the `@swash` feature block. This example is using `@swash` but also works with other feature value blocks.

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
myRule.swash.clear();
console.log(myRule.swash.size); // logs 0
```

## See also

- Map.prototype.clear()
