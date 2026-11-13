---
title: "CSSFontFeatureValuesMap: set() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: set() method

The **`set()`** method of `CSSFontFeatureValuesMap` instances adds a new entry with a specified key and value to this `CSSFontFeatureValuesMap`, or updates an existing entry if the key <example-value> exists.

## Syntax

```js
set(key, value)
```

### Parameters

- `key`
    The key of the entry to add to or modify within the `CSSFontFeatureValuesMap` object. Can be any value.
- `value`
    The value of the entry to add to or modify within the `CSSFontFeatureValuesMap` object. Must be an integer that matches the `index` of the alternative font feature.

### Return value

The `CSSFontFeatureValuesMap` object.

## Examples

### Basic usage

The following example updates the value for `swashy` and adds a third declaration. This example is using `@swash` but also works with other feature value blocks.

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
function logSwashes(value, key) {
  console.log(`('${key}') = ${value}`);
}
// get the rules
const myRule = document.styleSheets[0].cssRules[0];
// log current swashes
myRule.swash.forEach(logSwashes); // logs "('swishy') = 1", "('swashy') = 2"

// update swash with the key <example-value>
myRule.swash.set("swashy", 3);
myRule.swash.forEach(logSwashes); // logs "('swishy') = 1", "('swashy') = 3"

// add new swash with the key <example-value>
myRule.swash.set("swooshy", 2);
myRule.swash.forEach(logSwashes); // logs "('swishy') = 1", "('swooshy') = 2", "('swashy') = 3"
```

## See also

- Map.prototype.keys()
