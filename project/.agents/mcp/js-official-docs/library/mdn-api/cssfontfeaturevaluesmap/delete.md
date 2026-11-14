---
title: "CSSFontFeatureValuesMap: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: delete() method

The **`delete()`** method of the `CSSFontFeatureValuesMap` interface removes the CSS declaration with the given property in the `CSSFontFeatureValuesMap`.

## Syntax

```js
delete(property)
```

### Parameters

- `property`
    An identifier indicating the declaration to remove.

### Return value

None (`undefined`).

## Examples

### Basic usage

The following example deletes the first declaration within the `@swash` feature block. This example is using `@swash` but also works with other feature value blocks.

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
myRule.swash.delete("swishy");
console.log(myRule.swash.has("swishy")); // logs false
```

## See also

- Map.prototype.delete()
