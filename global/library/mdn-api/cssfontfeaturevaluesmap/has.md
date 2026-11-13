---
title: "CSSFontFeatureValuesMap: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: has() method

The **`has()`** method of the `CSSFontFeatureValuesMap` interface returns a boolean indicating whether an entry with the specified key <example-value> in this `CSSFontFeatureValuesMap` or not.

## Syntax

```js
has(property)
```

### Parameters

- `key`
    The key of the value to return from the `CSSFontFeatureValuesMap` object.

### Return value

The value associated with the specified key in the `CSSFontFeatureValuesMap` object. If the key can't be found, undefined is returned.

## Examples

### Basic usage

The following example returns `true` or `false` if the `@swash` rule contains the `key`. This example is using `@swash` but also works with other feature value blocks.

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
console.log(myRule.swash.has("swishy")); // logs true
console.log(myRule.swash.has("swooshy")); // logs false
```

## See also

- Map.prototype.has()
