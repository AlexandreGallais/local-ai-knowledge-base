---
title: "CSSFontFeatureValuesMap: [Symbol.iterator]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfeaturevaluesmap/symbol.iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFeatureValuesMap: [Symbol.iterator]() method

The **`Symbol.iterator`** method of `CSSFontFeatureValuesMap` interface implements the iterable protocol and allows built-in iterators to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns the value of `this`, which is the iterator object itself.

## Syntax

```js
iterator[Symbol.iterator]()
```

### Parameters

None.

### Return value

The value of `this`, which is the iterator object itself.

## Examples

### Basic usage

The following example uses the built-in iterator of `CSSFontFeatureValuesMap` to log the values using a `for...of` loop. This example is using `@swash` but also works with other feature value blocks.

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
for (const value of myRule.swash.keys()) {
  console.log(value);
}
// Logs: "swishy", "swashy"
```

## See also

- `Iterator.prototype[Symbol.iterator]()`
- `Iterator`
